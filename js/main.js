import {clearForms, getValidationStatus, initSignInForm, initSignUpForm, setFormValue, submitForm, validateEmail, validatePassword, validateRepeatedPassword} from "./utils.js"
//Отсрочка

////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize

//const password = document.getElementById('password');
//password.classList.add("valid")
//password.classList.remove("valid")

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
console.log("Document")
console.log(document)

// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
// }

////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания


// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_id = 'password'
const repeat_password_id= 'password-repeat'
const email_id = 'email'
const sign_in_email_id='sign_in_email'

const sign_in_link_id = 'sign_in_link'
const sign_up_form_id = 'sign_up_form'
// const sign_in_form_id = 'sign_in_form'  // Пригодится
const sign_up_btn_id = 'sign_up_btn'
const sign_in_btn_id= 'sign_in_btn'
const sign_in_form_id = 'sign_in_form'
const sign_up_link_id = 'sign_up_link'
const sign_in_password_id='sign_in_password'

let btn=document.getElementById(sign_up_btn_id);
initSignUpForm();

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

const first_name = document.getElementById(first_name_id);
const last_name=document.getElementById(last_name_id);
first_name.oninput = (e) => setFormValue(first_name_id, e.target.value)  // Установить значение без валидации
last_name.oninput = (e) => setFormValue(last_name_id, e.target.value) 

const email = document.getElementById(email_id);
email.oninput = (e) => {
  const status = setFormValue(email_id, e.target.value, validateEmail) // Установить значение с валидацией
  validation_indicator(email,status)
  const form_validity=getValidationStatus();
  button_validation(form_validity);
} 

const sign_in_email= document.getElementById(sign_in_email_id);
sign_in_email.oninput= (e) => {
  const status = setFormValue(sign_in_email_id, e.target.value, validateEmail) // Установить значение с валидацией
  validation_indicator(sign_in_email,status)
  const form_validity=getValidationStatus();
  button_validation(form_validity);
}

const validation_indicator = (field, field_status)=>{
  if(String(field.value).length==0){
    field.classList.remove("invalid")
    field.classList.remove("valid")
    return
  }
    
  if(field_status){
    field.classList.remove("invalid")
    field.classList.add("valid")
  }
  else{
    field.classList.remove("valid")
    field.classList.add("invalid")
  }
}


//const sign_up_btn=document.getElementById(sign_up_btn_id)
const button_validation= (state)=>{
  if(state){
    btn.disabled=false;
  }
  else{
    btn.disabled=true;
  }

}

const password = document.getElementById(password_id);
password.oninput = (e) => {
  const status=setFormValue(password_id, e.target.value, validatePassword)
  validation_indicator(password,status)
  validation_indicator(repeated_password,validateRepeatedPassword(repeated_password.value))
  const form_validity=getValidationStatus();
  button_validation(form_validity);
}

const repeated_password = document.getElementById(repeat_password_id);
repeated_password.oninput = (e) => {
  const status=setFormValue(repeat_password_id,e.target.value, validateRepeatedPassword)
  validation_indicator(repeated_password,status)
  const form_validity=getValidationStatus();
  button_validation(form_validity);
}

const sign_in_password = document.getElementById(sign_in_password_id);
sign_in_password.oninput = (e) => {
  const status=setFormValue(sign_in_password_id,e.target.value, validatePassword)
  validation_indicator(sign_in_password,status)
  const form_validity=getValidationStatus();
  button_validation(form_validity);
}

// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становистя невидимым




const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
  btn=document.getElementById(sign_in_btn_id);
  clearForms()
  initSignInForm()
  document.getElementById(sign_up_form_id).style.display = "none"
  document.getElementById(sign_in_form_id).style.display = ""
}

const switch_to_sign_up = document.getElementById(sign_up_link_id);
switch_to_sign_up.onclick = (e) => {
  btn=document.getElementById(sign_up_btn_id);
  clearForms()
  initSignUpForm()
  document.getElementById(sign_up_form_id).style.display = ""
  document.getElementById(sign_in_form_id).style.display = "none"
}


const sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события

  e.preventDefault()
  submitForm()
  alert("(-__-)")
}

const sign_in_btn = document.getElementById(sign_in_btn_id);
sign_in_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события

  e.preventDefault()
  submitForm()
  alert("(-__-)")
}

