const recipe_name = document.getElementById("recipe-name");
const recipe_step = document.getElementById("recipe-step");
const input_ingredient = document.getElementById("input-ingredient");
const add_ingredient = document.getElementById("add-ingredient");
const delete_recipe = document.querySelector(".delete-recipe");

let all_recipe = getLocalStorage();

console.log(all_recipe);

let getId = parseInt(location.hash.substr(1));

// let target_recipe = all_recipe.filter((target)=>target.id === getId)
let the_recipe = all_recipe.find((target) => target.id === getId);

recipe_name.value = the_recipe.name;
recipe_step.value = the_recipe.step;
render_ingredient(the_recipe);

recipe_name.addEventListener("input", (event) => {
  let input = event.target.value;
  the_recipe.name = input;
  saving_recipe(all_recipe);
  console.log(input, the_recipe, all_recipe);
});

recipe_step.addEventListener("input", (event) => {
  let input = event.target.value;
  the_recipe.step = input;
  saving_recipe(all_recipe);
});

add_ingredient.addEventListener("click", () => {
  event.preventDefault();
  let ingredient = { name: input_ingredient.value, check: false };
  the_recipe.ingredient.push(ingredient);
  saving_recipe(all_recipe);
  render_ingredient(the_recipe);
  input_ingredient.value = "";
  console.log(ingredient, the_recipe, all_recipe);
});


delete_recipe.addEventListener("click",(event)=>{
  event.preventDefault();
  deleting_recipe(getId)
})

// console.log(getId, the_recipe, all_recipe);
