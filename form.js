let form = document.querySelector("form");

let isValidElement = element => element.name && element.value;
let isValidValue = element => !['checkbox', 'radio'].includes(element.type) || element.checked;
let isCheckbox = element => element.type === 'checkbox';

let formToJSON = elements => [].reduce.call(elements, (data, element) => {
  if (isValidElement(element) && isValidValue(element)) {
    if (isCheckbox(element)) {
      data[element.name] = (data[element.name] || []).concat(element.value);
    } else {
      data[element.name] = element.value;
    }
  }
  return data;
}, {});

let handleFormSubmit = event => {
  console.log('thing!');
  event.preventDefault();
  let data = formToJSON(form.elements);
  //doSomething(data).then(doSomethingElse);
  //fetch with post and send to 'API/recipes'
  console.log(data);
  fetch('/api/recipes', {method: 'POST', body: JSON.stringify(data), headers: { "Content-Type": "application/json"}});
  };
  form.reset();

form.querySelector(".button_text").addEventListener('click', handleFormSubmit);