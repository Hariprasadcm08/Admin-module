
          //===================validation for name field================================//
let regexvalidName = /^[a-zA-Z]+([\s][a-zA-Z,]+)*$/;


     //============================validation for phone number==============================//
let regexValidNumber = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

 //==================================validation for email=========================================//
const regexValidgmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,3})*$/ 


//====================================validation for password=========================================//
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;


module.exports={regexvalidName,regexValidNumber,regexValidgmail,passwordRegex}