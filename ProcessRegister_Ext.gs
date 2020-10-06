package acc.user_function

uses java.util.concurrent.locks.ReentrantLock

class ProcessRegister_Ext extends AbstractFunctionRegister_Ext{

  private static var _instance : ProcessRegister_Ext
  private static var _lock     = new ReentrantLock()

  private construct(){

  }

  /**
   * To ensure that there is only one instance at any one time
   */
  public static function instance() : ProcessRegister_Ext {
    using(_lock){
      if(_instance == null){
        _instance = new ProcessRegister_Ext()
      }
      return _instance
    }
  }

}