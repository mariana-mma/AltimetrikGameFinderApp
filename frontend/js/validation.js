//client side validation for log in

const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');

const form = document.querySelector('#login');

const isRequired = value => value === '' ? false : true;

/*form.addEventListener('submit', submitUser);

function submitUser(e){
    e.preventDefault();  // prevent the form from submitting
    const inputEmail = emailEl.value;
    //console.log(inputEmail);
    const responseFunction = isEmailValid(inputEmail);
    //console.log(responseFunction);
};*/


// to check if email is valid, use regular expression
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// to check if password is strong, also use regex
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"); // Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)
    return re.test(password);
};

//show error
/*const showError = (input, message) => {
    
    // add the error class email input
    emailEl.classList.remove('success');
    emailEl.classList.add('error');

    // add the error class password input
    passwordEl.classList.remove('success');
    passwordEl.classList.add('error');

    // show the error message
    const error = document.querySelector('.error-message');
    error.textContent = message;
}; */

const emailError = (input, message) => {
    // add the error class email input
    emailEl.classList.remove('success');
    emailEl.classList.add('error');

    // show the error message
    const errorOne = document.querySelector('.error-messageOne');
    errorOne.textContent = message;
};

const passwordError = (input, message) => {
    
    // add the error class
    passwordEl.classList.remove('success');
    passwordEl.classList.add('error');

    // show the error message
    const errorTwo = document.querySelector('.error-messageTwo');
    errorTwo.textContent = message;
};

//show success

/*const showSuccess = (input) => {
    // remove the error class email input
    emailEl.classList.remove('error');
    emailEl.classList.add('success');

    // remove the error class password input
    passwordEl.classList.remove('error');
    passwordEl.classList.add('success');

    // hide the error message
    const error = document.querySelector('small');
    error.textContent = '';
};*/

const emailSuccess = (input) => {
    // remove the error class email input
    emailEl.classList.remove('error');
    emailEl.classList.add('success');

    // hide the error message
    const errorOne = document.querySelector('.error-messageOne');
    errorOne.textContent = '';
};

const passwordSuccess = (input) => {
    // remove the error class password input
    passwordEl.classList.remove('error');
    passwordEl.classList.add('success');

    // hide the error message
    const errorTwo = document.querySelector('.error-messageTwo');
    errorTwo.textContent = '';
};

//to validate email field
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        emailError(emailEl, 'Wrong email.');
    } else if (!isEmailValid(email)) {
        emailError(emailEl, 'Wrong email.');
    } else {
        emailSuccess(emailEl);
        valid = true;
    }
    return valid;
};


//to validate password field
const checkPassword = () => {

    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        passwordError(passwordEl, 'Wrong password.');
    } else if (!isPasswordSecure(password)) {
        passwordError(passwordEl, 'Wrong password.');
    } else {
        passwordSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isEmailValid &&
        isPasswordValid;

    // submit to the server if the form is valid
    /*if (isFormValid) {

    }*/
});


/*form.addEventListener('submit', submitUser);

function submitUser(e){
    e.preventDefault();  // prevent the form from submitting
    const inputEmail = emailEl.value;
    //console.log(inputEmail);
    const responseFunction = isEmailValid(inputEmail);
    //console.log(responseFunction);
};*/