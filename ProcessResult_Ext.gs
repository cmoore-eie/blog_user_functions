package acc.user_function

uses java.math.BigDecimal

class ProcessResult_Ext<T> {

  var _valueBigDecimal : BigDecimal as ValueBigDecimal
  var _valueBoolean    : Boolean                as ValueBoolean
  var _valueString     : String                 as ValueString
  var _valueInteger    : Integer                as ValueInteger
  var _valueObject     : Object                 as ValueObject
  var _valueLong       : Long                   as ValueLong
  var _valueDate       : Date                   as ValueDate
  var _valueList       : List<T>                as ValueList
  var _resultType      : ProcessResultType_Ext  as ResultType

  construct(){
    _valueList = new ArrayList<T>()
  }

  public property get asString() : String {
    if(_valueBigDecimal != null){
      return _valueBigDecimal.toString()
    }
    if(_valueBoolean != null){
      return _valueBoolean.toString()
    }
    if(_valueDate != null){
      return _valueDate.toString()
    }
    if(_valueString != null){
      return _valueString
    }
    if(_valueInteger != null){
      return _valueInteger.toString()
    }
    if(_valueLong != null){
      return _valueLong.toString()
    }
    return null
  }

}