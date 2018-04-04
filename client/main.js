


var blogPost = {
    author: 'James',
    title: 'cool stuff',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
};

function BlogPost(postData) {
    return `<div class="post">
            <h1>${postData.title}</h1>
            <h3>By ${postData.author}</h3>
            <p>${postData.body}</p>
          </div>`;
}

function PostPage(postData) {
    return `<div class="page">
            ${Header()}
            ${BlogPost(postData)}
          </div>`;
}

function Header() {
    return `<header class="container">
            <a class="toggle open" href="#nav">
                <img class="hamburger" src="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/menu-512.png" />
            </a>
            <img class="logo" src="https://upload.wikimedia.org/wikipedia/en/c/ca/MoustacheGraphic.png" />
            <img class='search' src="https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/67-512.png">
        </header>`;
}

function loginForms() {
    return `<div class="login-page">
    <div class="form">
        <form class="register-form hide">
            <input name="fname" type="text" placeholder="first name" />
            <input name="lname" type="text" placeholder="last name" />
            <input name="username" type="text" placeholder="username" />
            <input name="password" type="password" placeholder="password" />
            <input name="email" type="text" placeholder="email" />
            <button type="submit">create</button>
            <p class="message">Already registered?
                    <a class="log" href="#">Sign In</a>
            </p>
        </form>
        <form class="login-form">
            <input name="email" type="text" placeholder="email" />
            <input name="password" type="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">Not registered?
                    <a class="reg" href="#">Create an account</a>
            </p>
        </form>
    </div>
</div>`;
}

function recipeCard() {
    return `<div class=card>
            <div class="card-top">
          <span>Spaghetti</span>
          <img class="add-item" src="https://cdn3.iconfinder.com/data/icons/navigation-icons-1/32/add-512.png" />
        </div>
        <img class = "item-hero" src="https://spicetrekkers.com//upload/recettes/spaghetti-berbere.jpg" />
        <div class="card-bottom">
        ${stars()}  
          <div class="prep-time"> <img  src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/10-512.png"/> <span > 30m </span></div>
        </div>
        </div>`;
}

function recipeGrid() {
    return `<section class = "items">
            <div class="item-grid"> 
            ${recipeCard()}
            ${recipeCard()}
            ${recipeCard()}
            ${recipeCard()}
            </div>
            </section>`;
}

function stars() {
    return `<div class="stars" data-stars="1">
            <svg height="25" width="23" class="star rating" data-rating="1">
              <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
            </svg>
            <svg height="25" width="23" class="star rating" data-rating="2">
              <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
            </svg>
            <svg height="25" width="23" class="star rating" data-rating="3">
              <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
            </svg>
            <svg height="25" width="23" class="star rating" data-rating="4">
              <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
            </svg>
            <svg height="25" width="23" class="star rating" data-rating="5">
              <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
            </svg>
          </div>`;
}
function formSelect() {
    return `<form>
      <div class="">
        <label class="" for="compare">Compare</label>
        <select class="" id="compare" name="compare">
          <option value=""></option>
          <option value="option1">v1</option>
          <option value="option2">v2</option>
          <option value="option3">v3</option>
          <option value="option4">v4</option>
          <option value="option5">v5</option>
        </select>
      </div>
    </form>`;
}

function recipeElements() {
    return `<section class="recipe">
    <h2>Spaghetti</h2>
    <p>James McDowell</p>
    <img class = "item-hero" src="https://spicetrekkers.com//upload/recettes/spaghetti-berbere.jpg" />
    <div class="button-container">
    ${formSelect()} 
    ${formSelect()} 
    </div>
    <div class="recipe-content">
      <h3>Ingredients</h3>
      <ul>
        <li>noodles</li>
        <li>ground beef</li>
        <li>tomatoes </li>
        <li>parmesan cheese</li>
      </ul>
      <ol>
        <li>boil the pasta</li>
        <li>cook the beef</li>
        <li>make the sauce</li>
        <li>combine the sauce with the cooked beef</li>
      </ol>
    </div>  
    </section>`;
}

function recipesPage() {
    return `${Header()}
            ${recipeGrid()}`;
}

function loginPage() {
    return `${Header()}
            ${loginForms()}`;
}

function loginPage() {
    return `${Header()}
            ${loginForms()}`;
}

function viewRecipe() {
    return `${Header()}
            ${recipeElements()}`;
}


let saveData = JSON.parse(localStorage.saveData || null) || {};
console.log(`retrieved local storage`)
console.log(saveData.obj.token);
let wrapper = document.querySelector('.wrapper');

if (saveData.obj.token === null) {
    
    wrapper.innerHTML = loginPage();

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
            .catch((e) => { console.error(e) });
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


}
else {
    wrapper.innerHTML = recipesPage();
}


