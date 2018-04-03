
let regForm = document.querySelector('.register-form');
let logForm = document.querySelector('.login-form');

let regBtn = logForm.querySelector('.message .reg');
let logBtn = regForm.querySelector('.message .log');

regBtn.addEventListener("click", function () {
    console.log('sup you clicked me');
    logForm.classList.toggle('hide');
    regForm.classList.toggle('hide');
});
logBtn.addEventListener("click", function () {
    console.log('sup you clicked me');
    regForm.classList.toggle('hide');
    logForm.classList.toggle('hide');
});

