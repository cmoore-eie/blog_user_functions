package acc.user_function

uses gw.pl.logging.LoggerCategory

class FunctionProcess_Ext {

  var _mapping : ProcessDefinition_Ext    as Mapping
  var _params  : HashMap<Integer, Object> as Params
  var _logger = LoggerCategory.CONFIG

  construct(inMapping : ProcessDefinition_Ext, inParams : HashMap<Integer, Object>){
    _mapping = inMapping
    _params  = inParams
  }

  public function process() : ProcessResult_Ext {
    var result : ProcessResult_Ext
    try {
      var classpath = _mapping.ClassPath
      var methodName = _mapping.MethodName
      var processClass = Class.forName(classpath)
      var constructor = processClass.DeclaredConstructors.firstWhere(\elt -> elt.ParameterCount == 2)
      constructor.Accessible = true
      var instance = constructor.newInstance({_mapping, _params})
      var method = instance.Class.Methods.firstWhere(\elt -> elt.Name == methodName)
      method.Accessible = true
      result = method.invoke(instance, {}) as ProcessResult_Ext
    } catch (e : Exception) {
      _logger.error(e.Message)
    }
    return result
  }
}