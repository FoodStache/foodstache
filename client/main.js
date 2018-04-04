
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


let isValidElement = element => element.name && element.value;
let isValidValue = element => !['checkbox', 'radio'].includes(element.type) || element.checked;
let isCheckbox = element => element.type === 'checkbox';

let formToJSON = elements => [].reduce.call(elements, (data, element) => {
    
    if (isValidElement(element) && isValidValue(element)) {
        if (isCheckbox(element)) {
            data[element.name] = (data[element.name] || []).concat(element.value);
        } else {
            console.log(element.value);
            data[element.name] = element.value;
        }
    }
   
    return data;
}, {});

let handleFormSubmitReg = async event => {
    event.preventDefault();
    let data = formToJSON(regForm.elements);
    console.log(data);
    let res = await postData('/tokens/newUser', data);
    console.log(res);
};

let handleFormSubmitLog = async event => {
    event.preventDefault();
    let data = formToJSON(logForm.elements);
    console.log(data);
    let res = await postData('/tokens', data);
    let token = res.token;
    //save to local storage
    saveToLocal(res);
    let saveData = JSON.parse(localStorage.saveData || null) || {};
    console.log(`retrieved local storage`)
    console.log(saveData.obj.token);

};

// Retrieve your data from locaStorage
var saveData = JSON.parse(localStorage.saveData || null) || {};

// Store your data.
function saveToLocal(obj) {
    saveData.obj = obj;
    saveData.time = new Date().getTime();
    localStorage.saveData = JSON.stringify(saveData);
}

// Do something with your data.
function loadStuff() {
    return saveData.obj || "default";
}

logForm.addEventListener('submit', handleFormSubmitLog);
regForm.addEventListener('submit', handleFormSubmitReg);


let server = 'http://localhost:3000';

let postData = (api, data) => {
    return fetch(`${server}${api}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((res) => (res.json()))
    .catch((e) => {console.error(e)});
};

let search = document.querySelector('.container .search');

search.addEventListener("click", function () {
    console.log('search click');
    getData('/api/private');
});

let getData = (api) => {
    let saveData = JSON.parse(localStorage.saveData || null) || {};
    console.log(`retrieved local storage`)
    let bearer = saveData.obj.token;

    return fetch(`${server}${api}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'bearer'
        })
    })
    // .then((res) => (res.json()))
    //     .catch((e) => { console.error(e) });
};
