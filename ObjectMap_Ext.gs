package acc.user_function

class ObjectMap_Ext {

  var _objectMap : HashMap<String, Object> as ObjectMap

  construct(){
    init()
  }

  construct(inMap : Map<String, Object>){
    init()
    _objectMap.putAll(inMap)
  }

  private function init(){
    var results = new ProcessResult_Ext()
    _objectMap = new HashMap<String, Object>()

    _objectMap.put("date", java.util.Date)
    _objectMap.put("dateutil", gw.api.util.DateUtil)
    _objectMap.put("today", gw.api.util.DateUtil.currentDate())

    _objectMap.put("afpresult", results)
    _objectMap.put("result", results)
  }

  public function updateObjectsResult(inValue : ProcessResult_Ext){
    _objectMap.replace("afpresult", inValue)
    _objectMap.replace("result", inValue)
  }

  public function fetchObject(inKey : String) : Object {
    if(inKey == null){
      return null
    }
    var keycheck = inKey.toLowerCase()
    if(_objectMap.containsKey(keycheck)){
      return _objectMap.get(keycheck)
    } else {
      return null
    }
  }

  /**
   * Identify if the parameter is a specal result parameter
   * @param inValue
   * @return boolean
   */
  public function isResult(inValue : String) : boolean {
    var result = {"afpresult", "result"}
    var checkValue = inValue.toLowerCase()
    if(result.contains(checkValue)) {
      return true
    }
    for(test in result){
      if(checkValue.startsWith(test)){
        return true
      }
    }
    return false
  }

}