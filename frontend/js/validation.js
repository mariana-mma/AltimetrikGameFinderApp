//client side validation for log in

const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');

const form = document.querySelector('#login');

const isRequired = value => value === '' ? false : true;


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"); // Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)
    return re.test(password);
};

//show error

const emailError = (input, message) => {
    emailEl.classList.remove('success');
    emailEl.classList.add('error');

    const errorOne = document.querySelector('.error-messageOne');
    errorOne.textContent = message;
};

const passwordError = (input, message) => {
    
    passwordEl.classList.remove('success');
    passwordEl.classList.add('error');

    const errorTwo = document.querySelector('.error-messageTwo');
    errorTwo.textContent = message;
};

//show success

const emailSuccess = (input) => {
    emailEl.classList.remove('error');
    emailEl.classList.add('success');

    const errorOne = document.querySelector('.error-messageOne');
    errorOne.textContent = '';
};

const passwordSuccess = (input) => {
    passwordEl.classList.remove('error');
    passwordEl.classList.add('success');

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
    e.preventDefault();

    let isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isEmailValid &&
        isPasswordValid;
    
    if (isFormValid) {
        const userData = {email: emailEl.value.trim(), password: passwordEl.value.trim()};
        apiCall(userData)
    }
});


// Call API with fetch

function apiCall(userData) {
    fetch("http://localhost:3000/login",
    {method:'POST',
    body:JSON.stringify(userData),
    headers:{'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}}) // what to use instead of '*'?
    .then((res) => {
        if (res.status == 200) {
            return res.json();
        } else {
            throw Error(res.statusText)
        }
    })
    .then(data => {
        localStorage.setItem("token", data.accessToken)
        snackbarAlert("Successful Login")
        window.location.replace("./homepage.html")
    })
    .catch(error => {
        snackbarAlert("Something went wrong")
    })
};

// alert

function snackbarAlert(content = "Unknown error") {
    var snackbarEl = document.getElementById("snackbar");

    snackbarEl.innerHTML = content;

    snackbarEl.className = "show";

    setTimeout(function(){ snackbarEl.className = snackbarEl.className.replace("show", ""); }, 3000);
};