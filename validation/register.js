const Validator = require('validator');
const isEmpty = require('is-empty');
module.exports = function validateRegisterInput(data){
    let errors = [];

    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    
    //Проверка поля Name
    if(Validator.isEmpty(data.username)){
        errors.push({ msg: "Введите Имя" })
    }

    //Проверка поля Email
    if(Validator.isEmpty(data.email)) {
        errors.push({ msg: "Пожалуйста, введите свой Email" })
    } else if(!Validator.isEmail(data.email)){
        errors.push({ msg: "Пожалуйста, введите корректный Email", email: data.email })

    }

    //Проверка поля пароля
    if(Validator.isEmpty(data.password)){
        errors.push({ msg: "Введите пароль" })
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.push({ msg: "Пароли не совпадают" })
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}