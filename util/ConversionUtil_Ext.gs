package acc.user_function.util

uses gw.api.util.CurrencyUtil
uses gw.entity.TypeKey
uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal
uses java.text.SimpleDateFormat

class ConversionUtil_Ext {

  /**
   * Extracts a date value from the given string, if this fails there is a possibility that it could have come from
   * a GX then the alternate format is used for a second attempt
   * @param inValue
   * @return
   */
  public static function dateValue(inValue : String) : Date {
    var retVal : Date
    var formater = new SimpleDateFormat(gw.api.util.LocaleUtil.CurrentLocale.DateFormat.Short)
    var formaterAlt = new SimpleDateFormat("yyyy-MM-dd")
    try{
      retVal = formater.parse(inValue)
    } catch (e : Exception){
      retVal = null
    }
    if(retVal == null){
      try{
        retVal = formaterAlt.parse(inValue)
      } catch (e : Exception){
        retVal = null
      }
    }
    return retVal
  }

  public static function dateValue(inValue : Object) : Date {
    var retVal : Date
    if(inValue typeis String){
      retVal = dateValue(inValue)
    }
    return retVal
  }

  /**
   * Extracts an Integer value from the given string
   * @param inValue
   * @return
   */
  public static function integerValue(inValue : String) : Integer {
    var retVal : Integer
    if(inValue == null){
      return retVal
    }
    try{
      if(inValue != null and inValue.contains(".")){
        retVal = ConversionUtil_Ext.decimalValue(inValue).intValue()
      } else {
        retVal = Integer.parseInt(inValue)
      }
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  /**
   * Extracts an Integer value from the given Double value
   * @param inValue
   * @return
   */
  public static function integerValue(inValue : Double) : Integer {
    var retVal : Integer
    try{
      retVal = inValue.intValue()
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function integerValue(inValue : Object) : Integer {
    var retVal : Integer
    var stringVal = stringValue(inValue)
    if(stringVal != null) {
      retVal = integerValue(stringVal)
    }
    return retVal
  }


  public static function booleanValue(inValue : String) : Boolean {
    var retVal : Boolean
    try{
      retVal = Boolean.parseBoolean(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function booleanValue(inValue : Object) : Boolean {
    var retVal : Boolean
    var stringVal = stringValue(inValue)
    if(stringVal != null) {
      retVal = booleanValue(stringVal)
    }
    return retVal
  }

  public static function decimalValue(inValue : String) : BigDecimal {
    var retVal : BigDecimal
    if(inValue == null){
      return retVal
    }
    try{
      retVal = new BigDecimal(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function decimalValue(inValue : Double) : BigDecimal {
    var retVal : BigDecimal
    try{
      retVal = new BigDecimal(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function decimalValue(inValue : Integer) : BigDecimal {
    var retVal : BigDecimal
    try{
      retVal = new BigDecimal(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function decimalValue(inValue : Long) : BigDecimal {
    var retVal : BigDecimal
    try{
      retVal = new BigDecimal(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function decimalValue(inValue : Object) : BigDecimal {
    var retVal : BigDecimal
    var stringVal = stringValue(inValue)
    if(stringVal != null) {
      retVal = decimalValue(stringVal)
    }
    return retVal
  }

  public static function longValue(inValue : String) : Long {
    var retVal : Long
    try{
      retVal = Long.parseLong(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function longValue(inValue : Object) : Long {
    var retVal : Long
    var stringVal = stringValue(inValue)
    if(stringVal != null) {
      retVal = longValue(stringVal)
    }
    return retVal
  }

  public static function longValue(inValue : Double) : Long {
    var retVal : Long
    try{
      retVal = inValue.longValue()
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneyValue(inValue : String) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = new BigDecimal(inValue).ofDefaultCurrency()
      retVal = retVal.convertAndScale(CurrencyUtil.getDefaultCurrency())
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneyValue(inValue : Object) : MonetaryAmount {
    var retVal : MonetaryAmount
    var stringVal = stringValue(inValue)
    if(stringVal != null) {
      retVal = moneyValue(stringVal)
    }
    return retVal
  }

  public static function moneyValue(inValue : Double) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = new BigDecimal(inValue).ofDefaultCurrency()
      retVal = retVal.convertAndScale(CurrencyUtil.getDefaultCurrency())
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneyValue(inValue : BigDecimal) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = inValue.ofDefaultCurrency()
      retVal = retVal.convertAndScale(CurrencyUtil.getDefaultCurrency())
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneyeurValue(inValue : String) : MonetaryAmount {
    var retVal : MonetaryAmount
    if(inValue != null) {
      try {
        retVal = new BigDecimal(inValue).ofCurrency(Currency.TC_EUR)
        retVal = retVal.convertAndScale(Currency.TC_EUR)
      } catch (e : Exception) {
        retVal = null
      }
    }
    return retVal
  }

  public static function moneyeurValue(inValue : Double) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = new BigDecimal(inValue).ofCurrency(Currency.TC_EUR)
      retVal = retVal.convertAndScale(Currency.TC_EUR)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneyeurValue(inValue : BigDecimal) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = inValue.ofCurrency(Currency.TC_EUR)
      retVal = retVal.convertAndScale(Currency.TC_EUR)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneygbpValue(inValue : String) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = new BigDecimal(inValue).ofCurrency(Currency.TC_GBP)
      retVal = retVal.convertAndScale(Currency.TC_GBP)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneygbpValue(inValue : Double) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = new BigDecimal(inValue).ofCurrency(Currency.TC_GBP)
      retVal = retVal.convertAndScale(Currency.TC_GBP)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneygbpValue(inValue : BigDecimal) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = inValue.ofCurrency(Currency.TC_GBP)
      retVal = retVal.convertAndScale(Currency.TC_GBP)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneyusdValue(inValue : String) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = new BigDecimal(inValue).ofCurrency(Currency.TC_USD)
      retVal = retVal.convertAndScale(Currency.TC_USD)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneyusdValue(inValue : Double) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = new BigDecimal(inValue).ofCurrency(Currency.TC_USD)
      retVal = retVal.convertAndScale(Currency.TC_USD)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function moneyusdValue(inValue : BigDecimal) : MonetaryAmount {
    var retVal : MonetaryAmount
    try{
      retVal = inValue.ofCurrency(Currency.TC_USD)
      retVal = retVal.convertAndScale(Currency.TC_USD)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function percentValue(inValue : String) : Integer {
    var retVal : Integer
    try{
      retVal = Integer.parseInt(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function percentdecValue(inValue : String) : BigDecimal {
    var retVal : BigDecimal
    try{
      retVal = new BigDecimal(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function percentdecValue(inValue : Double) : BigDecimal {
    var retVal : BigDecimal
    try{
      retVal = new BigDecimal(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function yearValue(inValue : String) : Integer {
    var retVal : Integer
    try{
      retVal = Integer.parseInt(inValue)
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function yearValue(inValue : Double) : Integer {
    var retVal : Integer
    try{
      retVal = inValue.intValue()
    } catch (e : Exception){
      retVal = null
    }
    return retVal
  }

  public static function stringValue(inValue : Integer) : String {
    var retVal : String
    retVal = inValue.toString()
    return retVal
  }

  public static function stringValue(inValue : Boolean) : String {
    var retVal : String
    retVal = inValue.toString()
    return retVal
  }

  public static function stringValue(inValue : Date) : String {
    var retVal : String
    retVal = inValue.toString()
    return retVal
  }

  public static function stringValue(inValue : BigDecimal) : String {
    var retVal : String
    if(inValue == null){
      return retVal
    }
    if(inValue == 0){
      retVal = "0"
    } else {
      retVal = inValue.asString()
    }
    return retVal
  }

  public static function stringValue(inValue : Long) : String {
    var retVal : String
    retVal = inValue.toString()
    return retVal
  }

  public static function stringValue(inObject : Object) : String {
    var retVal : String
    if(inObject == null){
      return retVal
    }
    if(inObject typeis String){
      return inObject
    }
    if(inObject typeis Integer){
      return stringValue(inObject)
    }
    if(inObject typeis BigDecimal){
      return stringValue(inObject)
    }
    if(inObject typeis Boolean){
      return stringValue(inObject)
    }
    if(inObject typeis Date){
      return stringValue(inObject)
    }
    if(inObject typeis Long){
      return stringValue(inObject)
    }
    return inObject.toString()
  }

  public static function object(inObject : Object) : Object {
    return inObject
  }

  public static function keyableBean(inObject : Object) : KeyableBean {
    if(inObject typeis KeyableBean){
      return inObject as KeyableBean
    } else {
      return null
    }
  }
}
