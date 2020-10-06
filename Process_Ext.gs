package acc.user_function

uses acc.user_function.util.ConversionUtil_Ext
uses gw.api.system.PCLoggerCategory
uses gw.lang.reflect.ReflectUtil
uses org.apache.commons.lang3.math.NumberUtils

class Process_Ext {

  var _objectMap : ObjectMap_Ext
  var _result    : ProcessResult_Ext
  var _logger = PCLoggerCategory.CONFIG

  construct(inObjectMap : ObjectMap_Ext) {
    _objectMap = inObjectMap
  }

  construct(inMap : Map<String, Object>) {
    _objectMap = new ObjectMap_Ext(inMap)
  }

  construct() {

  }

  public function evaluate(inLogicCode : String) : ProcessResult_Ext {
    try {
      if (inLogicCode != null) {
        var process = new Process_Ext(_objectMap)
        process.processCall(inLogicCode)
        _result = process.Result
      }
    } catch (e : Exception) {
      _logger.warn(e.Message)
    }
    return _result
  }

  private function processCall(inLogicCode : String) {
    var functionName : String
    var mapping      : ProcessDefinition_Ext
    var process      : FunctionProcess_Ext
    var params       : HashMap<Integer, Object>

    for (line in inLogicCode.split("\n")) {
      line = line.replaceAll("\\s+", "")
      params = new HashMap<Integer, Object>()
      functionName = extractFunctionName(line)
      var paramLine = line.substring(line.indexOf(functionName) + functionName.length)
      var param = paramLine.substring(1, paramLine.length() - 1)
      mapping = ProcessRegister_Ext.instance().Functions.firstWhere(\elt -> elt.Code == functionName)
      var offset = 1
      if (!param.Empty) {
        for (p in param.split(",")index i) {
          params.put((i + offset), paramValue(p))
        }
      }
      process = new FunctionProcess_Ext(mapping, params)
      _result = process.process()
      if (_result != null) {
        _objectMap.updateObjectsResult(_result)
        _result.ResultType = mapping.ResultType
      }
    }
  }

  private function paramValue(inParam : String) : Object {
    var paramSplit : String[]
    paramSplit = inParam.split("\\.")
    var functionObject = _objectMap.fetchObject(paramSplit[0])
    if (functionObject != null) {
      if (paramSplit.Count > 1) {
        for (paramPart in paramSplit index i) {
          if (i > 0) {
            if (paramPart.endsWith(")")) {
              var method = paramPart.split("\\(")[0]
              functionObject = ReflectUtil.invokeMethod(functionObject, method, new Object[0])
            } else {
              functionObject = ReflectUtil.getProperty(functionObject, paramPart)
            }
          }
        }
      }
      return functionObject
    }
    try {
      var NumVal = numberValue(inParam)
      if (NumVal != null) {
        return NumVal
      }
    } catch (e) {

    }
    return eval(inParam)
  }

  private function numberValue(inValue : Object) : Object {
    if ((inValue typeis String) and NumberUtils.isParsable(inValue)) {
      if (ConversionUtil_Ext.integerValue(inValue) != null) {
        return ConversionUtil_Ext.integerValue(inValue)
      }
      if (ConversionUtil_Ext.decimalValue(inValue) != null) {
        return ConversionUtil_Ext.decimalValue(inValue)
      }
      if (ConversionUtil_Ext.longValue(inValue) != null) {
        return ConversionUtil_Ext.longValue(inValue)
      }
    } else {
      if (ConversionUtil_Ext.integerValue(inValue) != null) {
        return ConversionUtil_Ext.integerValue(inValue)
      }
      if (ConversionUtil_Ext.decimalValue(inValue) != null) {
        return ConversionUtil_Ext.decimalValue(inValue)
      }
      if (ConversionUtil_Ext.longValue(inValue) != null) {
        return ConversionUtil_Ext.longValue(inValue)
      }
    }
    return null
  }

  private function isBoolean(inValue : Object) : boolean {
    if (ConversionUtil_Ext.booleanValue(inValue as String) != null) {
      return true
    }
    return false
  }

  public property get Result() : ProcessResult_Ext {
    return _result
  }

  private static function extractFunctionName(inValue : String) : String {
    var functionName : String
    var testValue = inValue.toLowerCase()
    if(testValue.contains("call")){
      functionName = inValue.substring(testValue.indexOf("call") + 4, inValue.indexOf("("))
    } else {
      functionName = inValue.substring(0, inValue.indexOf("("))
    }
    return functionName
  }
}