const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {}  // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false


export const clearForms = () => {
  console.log(formValues)
  Object.keys(formValues).forEach(key => (delete formValues[key]));
  Object.keys(formValidation).forEach(key => (delete formValidation[key]));
  console.log("clearing forms")
  console.log(formValues)
}

export const initSignInForm = () =>{

  formValidation['sign_in_password']=undefined;
  formValidation['sign_in_email']=undefined;
}

export const initSignUpForm= () =>{
  formValidation['first_name']=undefined;
  formValidation['last_name']=undefined;
  formValidation['password']=undefined;
  formValidation['password-repeat']=undefined;
  formValidation['email']=undefined;
}

// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (e) => {
  //formValidation.password = e.target.value
  console.log("Password validation...")
  console.log(e)
  // Напишите код валидации здесь и присвойте true/false в объект(словарь) formValidation
  // formValidation.password = ...  // formValidation['password'] = ... - то же самое, но другой синтаксис
  //return formValidation.password !== undefined   // Это заглушка, return вероятно надо переписать
  return ((String(e).length>=6)&&(String(e).length<13))

}

export const validateRepeatedPassword = (e) => {
  const password = formValues['password']
  if(String(e)==String(password))
    return true
  else
    return false;
}


export const validateEmail = (email) => {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return String(email)
    .toLowerCase()
    .match(regExp);
}


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
  if(Object.keys(formValidation).length==0)
    return false;
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  return Object.values(formValidation).every((validationStatus) => !!validationStatus)
}


// Функция возвращающая которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
  formValues[valueKey] = newValue
  if (validator !== undefined) {
    formValidation[valueKey] = validator(newValue)
    return !!formValidation[valueKey]
  }
  if (String(newValue).length==0){
    formValidation[valueKey]=false;
  }
  else{
    formValidation[valueKey]=true;
  }
  return !!formValidation[valueKey]
}


// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitForm = () => {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT")
    return false
  }
  console.log("FORM IS FINE")
  console.log(formValues)
  
  return true
}
