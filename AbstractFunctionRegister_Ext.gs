package acc.user_function

uses acc.user_function.functions.AgeFunction_Ext
uses gw.lang.reflect.ReflectUtil

abstract class AbstractFunctionRegister_Ext {

  var _functions : List<ProcessDefinition_Ext> as Functions

  construct(){
    _functions = new ArrayList<ProcessDefinition_Ext>()
    init()
  }

  private function init(){
    _functions.add(AgeFunction_Ext.registerCalcAge())
  }
}