package acc.user_function.functions

uses acc.user_function.ProcessDefinitionParam_Ext
uses acc.user_function.ProcessDefinition_Ext
uses acc.user_function.ProcessResultType_Ext
uses acc.user_function.ProcessResult_Ext
uses acc.user_function.util.ConversionUtil_Ext
uses org.joda.time.LocalDate
uses org.joda.time.Years

class AgeFunction_Ext extends AbstractFunction_Ext {

  construct(inFunction : ProcessDefinition_Ext, inParams : HashMap<Integer, Object>) {
    super(inFunction, inParams)
  }

  public function calcAge() : ProcessResult_Ext {
    var dateOfBirth = ConversionUtil_Ext.dateValue(this.Params.get(1))
    if(dateOfBirth != null){
      Result.ValueInteger = Years.yearsBetween(LocalDate.fromDateFields(dateOfBirth), LocalDate.fromDateFields(Date.CurrentDate)).Years
    }
    if(Result.ValueInteger == null){
      Result.ValueInteger = 0
    }
    return Result
  }

  public static function registerCalcAge() : ProcessDefinition_Ext{
    var definition = new ProcessDefinition_Ext()
    definition.Code = "CalcAge"
    definition.Name = "Calculate Age from given date"
    definition.ClassPath = AgeFunction_Ext.Name
    definition.MethodName = "calcAge"
    definition.ResultType = ProcessResultType_Ext.INTEGER

    definition.Parameters.add(new ProcessDefinitionParam_Ext(){
      :Name = "Date",
      :Type = ProcessResultType_Ext.DATE,
      :Position = 1
    })

    return definition
  }

}