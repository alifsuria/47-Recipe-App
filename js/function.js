const ingredient_list = document.getElementById("ingredient-list");
const recipe_list = document.getElementById("recipe-list");
console.log(JSON.parse(localStorage.getItem("recipe")));
function getLocalStorage() {
  let storage = localStorage.getItem("recipe");

  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
}

function saving_recipe(data) {
  return localStorage.setItem("recipe", JSON.stringify(data));
}

function unique_ID() {
  // debugger;
  let id = Math.floor(Math.random() * 1000);
  let storage = JSON.parse(localStorage.getItem("recipe"));
  console.log(id, storage);
  if (storage === null) {
    return id;
  } else {
    for (let i = 0; i < storage.length; i++) {
      if (id === storage[i].id) {
        return unique_ID();
      }
    }
  }
  return id;
}

function render_recipe(storage) {
  // let storage = JSON.parse(localStorage.getItem("recipe"));
  recipe_list.innerHTML = "";
  storage.forEach((item) => {
    console.log(item);
    let recipe_div = document.createElement("div");
    recipe_div.classList.add("recipe", "my-3");
    recipe_list.appendChild(recipe_div);
    let item_link = document.createElement("a");
    item_link.classList.add("item");
    item_link.setAttribute("href", `./edit-recipe.html#${item.id}`);
    recipe_div.appendChild(item_link);
    let span = document.createElement("span");
    span.innerHTML = item.name;
    item_link.appendChild(span);
    let feedback = document.createElement("span");
    feedback.classList.add("feedback");
    recipe_div.appendChild(feedback);

    let count = 0;
    for (let i = 0; i < item.ingredient.length; i++) {
      if (item.ingredient[i].check === true) {
        count++;
      }
    }

    if (count === 0) {
      feedback.innerHTML = "You have <span class='feedback-text'>NONE</span> of the ingredient";
    } else if (count < item.ingredient.length) {
      feedback.innerHTML = "You have <span class='feedback-text'>SOME</span> of the ingredient";
    } else {
      feedback.innerHTML = "You have <span class='feedback-text'>ALL</span> of the ingredient";
    }
  });
}

function render_ingredient(target_recipe) {
  ingredient_list.innerHTML = "";
  target_recipe.ingredient.forEach((item) => {
    // console.log(item);
    let div = document.createElement("div");
    div.classList.add("ingredient", "form-check", "my-2");
    let checkbox = document.createElement("input");
    checkbox.classList.add("form-check-input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = item.check;
    checkbox.addEventListener("change", (event) => {
      item.check = event.target.checked;
      saving_recipe(all_recipe);
      console.log(event.target.checked, item, all_recipe);
    });

    let label = document.createElement("label");
    label.innerHTML = item.name;
    label.classList.add("form-check-label");
    let button = document.createElement("button");
    button.classList.add(
      "btn",
      "btn-danger",
      "remove-ingredient",
      "btn-sm",
      "ml-4"
    );
    button.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(target_recipe.ingredient);
      let culling = target_recipe.ingredient.filter(
        (target) => target.name !== item.name
      );
      target_recipe.ingredient = culling;
      saving_recipe(all_recipe);
      render_ingredient(the_recipe);
      console.log(target_recipe.ingredient, all_recipe);
    });

    ingredient_list.appendChild(div);
    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(button);
  });
}

function deleting_recipe(id) {
  let culling = all_recipe.filter((item) => {
    return item.id !== id;
  });
  saving_recipe(culling);
  location.assign("./index.html");
  console.log(culling, all_recipe);
}

function filtering(input) {
  let filtered_recipe = all_recipe.filter((item) => {
    let name = item.name.toLowerCase();
    let filter_input = input.toLowerCase();
    return name.includes(filter_input);
  });

  render_recipe(filtered_recipe);
  console.log(filtered_recipe);
}
