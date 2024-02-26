let timeSubheading = document.querySelector("#time");
timeSubheading.textContent = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});
let todoForm = document.querySelector("#todo-form");
let todoList = document.querySelector("#todo-list");
let idCounter = todoList.childNodes.length;

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (todoForm.elements.inputText.value !== "") {
    let liChild = document.createElement("li");
    liChild.classList = "list-group-item p-3";
    liChild.id = `todo-${idCounter}`;

    // console.log(todoForm.elements.inputText.value);
    liChild.innerHTML = `
    <input class="form-check-input me-1" id="todo-${idCounter}" type="checkbox" />
    <label class="form-check-label" for="todo-${idCounter}">
        ${todoForm.elements.inputText.value}
    </label>`;

    todoList.appendChild(liChild);

    todoForm.elements.inputText.value = "";
    todoForm.elements.inputText.focus();
    idCounter++;

    let savedItems = JSON.parse(localStorage.getItem("savedItems")) || {};
    let arrayOfTodoItems = [];
    Array.from(todoList.children).forEach((element) => {
      arrayOfTodoItems.push(Array.from(element.children));
    });
    // console.log(arrayOfTodoItems);
    arrayOfTodoItems.forEach((element) => {
      let id = {
        isChecked: `${element[0].outerHTML}`,
        labelHTML: `${element[1].innerHTML}`,
      };
      // console.log(element[0]);
      savedItems[element[0].id] = JSON.stringify(id);
      // console.log(savedItems[element[0].id]);
    });
    console.log(savedItems);
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }
});

function clearAllFunction() {
  idCounter = 0;
  todoList.innerHTML = "";
  localStorage.setItem("savedItems", JSON.stringify({}));
}

//on tick cross or uncross the item
todoList.addEventListener("change", (event) => {
  // console.log(event.target.id);

  let label = document.querySelector(`label[for="${event.target.id}"]`);
  let checkBox = document.querySelector(`input[id="${event.target.id}"]`);
  if (checkBox.checked) {
    console.log(label);
    let labelText = label.textContent;
    label.innerHTML = `<label class="form-check-label" for="${event.target.id}">
         <strike>${labelText}</strike>
     </label>`;
  } else {
    let labelText = label.textContent;
    label.innerHTML = `<label class="form-check-label" for="${event.target.id}">
         ${labelText}
     </label>`;
  }

  let savedItems = JSON.parse(localStorage.getItem("savedItems")) || {};
  let arrayOfTodoItems = [];
  Array.from(todoList.children).forEach((element) => {
    arrayOfTodoItems.push(Array.from(element.children));
  });
  // console.log(arrayOfTodoItems);
  arrayOfTodoItems.forEach((element) => {
    let id = {
      isChecked: `${element[0].outerHTML}`,
      labelHTML: `${element[1].innerHTML}`,
    };
    // console.log(element[0]);
    savedItems[element[0].id] = JSON.stringify(id);
    // console.log(savedItems[element[0].id]);
  });
  console.log(savedItems);

  localStorage.setItem("savedItems", JSON.stringify(savedItems));
});

//Making the data persist using localStorage

// console.log(todoList.children);

let savedItems = JSON.parse(localStorage.getItem("savedItems")) || {};
let arrayOfTodoItems = [];
Array.from(todoList.children).forEach((element) => {
  arrayOfTodoItems.push(Array.from(element.children));
});
// console.log(arrayOfTodoItems);
arrayOfTodoItems.forEach((element) => {
  let id = {
    isChecked: `${element[0].outerHTML}`,
    labelHTML: `${element[1].innerHTML}`,
  };
  // console.log(element[0]);
  savedItems[element[0].id] = JSON.stringify(id);
  // console.log(savedItems[element[0].id]);
});

// console.log(savedItems);
// console.log(todoList);
// console.log(savedItems);

localStorage.setItem("savedItems", JSON.stringify(savedItems));

document.addEventListener("DOMContentLoaded", (e) => {
  const savedItems = JSON.parse(localStorage.getItem("savedItems"));

  if (savedItems) {
    Object.entries(savedItems).forEach((element) => {
      let el = JSON.parse(element[1]);
      let liChild = document.createElement("li");
      liChild.classList = "list-group-item p-3";
      liChild.id = `${element[0]}`;

      // let inputElement = document.createElement("input");
      // inputElement.classList = "form-check-input me-1";
      // inputElement.id = `${element[0]}`;
      // inputElement.type = "checkbox";
      // inputElement.checked = el.isChecked;

      const wrapper = document.createElement("div"); // Creating a wrapper element
      wrapper.innerHTML = el.isChecked; // Setting its innerHTML to the provided string
      let inputElement = wrapper.firstChild;
      // inputElement.checked = el.isChecked.checked;

      // console.log(inputElement.checked);

      let labelElement = document.createElement("label");
      labelElement.classList = "form-check-label";
      labelElement.setAttribute("for", element[0]);
      labelElement.innerHTML = `${el.labelHTML}`;

      if (labelElement.innerHTML.includes("<strike>")) {
        inputElement.checked = true;
      } else {
        inputElement.checked = false;
      }

      liChild.appendChild(inputElement);
      liChild.appendChild(labelElement);

      todoList.appendChild(liChild);
    });
  }
});
