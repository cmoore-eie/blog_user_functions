package acc.user_function.functions

uses acc.user_function.ProcessDefinition_Ext
uses acc.user_function.ProcessResult_Ext
uses acc.user_function.util.ConversionUtil_Ext
uses java.math.BigDecimal

abstract class AbstractFunction_Ext {

  var _params : HashMap<Integer, Object> as Params
  var _result : ProcessResult_Ext as Result
  var _mapping : ProcessDefinition_Ext as Mapping

  construct() {
  }

  construct(inFunction : ProcessDefinition_Ext, inParams : HashMap<Integer, Object>) {
    _mapping = inFunction
    _result = new ProcessResult_Ext()
    _params = inParams
  }

  public function StringValue(inParamPosition : Integer) : String {
    return ConversionUtil_Ext.stringValue(_params.get(inParamPosition))
  }

  public function IntegerValue(inParamPosition : Integer) : Integer {
    return ConversionUtil_Ext.integerValue(_params.get(inParamPosition))
  }

  public function DecimalValue(inParamPosition : Integer) : BigDecimal {
    return ConversionUtil_Ext.decimalValue(_params.get(inParamPosition))
  }

  public function ObjectValue(inParamPosition : Integer) : Object {
    return _params.get(inParamPosition)
  }

  public function KeyabeBeanValue(inParamPosition : Integer) : KeyableBean {
    return ConversionUtil_Ext.keyableBean(_params.get(inParamPosition))
  }
}