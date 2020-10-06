package acc.user_function

class ProcessDefinition_Ext {

    var _code       : String as Code
    var _name       : String as Name
    var _methodName : String as MethodName
    var _retultType : ProcessResultType_Ext as ResultType
    var _parameters : List<ProcessDefinitionParam_Ext> as Parameters
    var _classPath  : String as ClassPath

    construct(){
      _parameters = new ArrayList<ProcessDefinitionParam_Ext>()
    }

}