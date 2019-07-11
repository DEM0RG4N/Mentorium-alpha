const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data){
    let errors = [];

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if(Validator.isEmpty(data.email)){
        errors.push({ msg: "Пожалуйста, введите Email" })
    } else if(!Validator.isEmail(data.email)){
        errors.push({ msg: "Email не корректен" });
    }

    if(Validator.isEmpty(data.password)){
        errors.push({ msg: "Поле Пароль не должно пустовать" })
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}