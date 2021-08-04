const add_new_btn = document.getElementById("add-new-recipe");
const filter_recipe = document.getElementById("filter");

let all_recipe = getLocalStorage();

if (all_recipe.length > 0) {
  render_recipe(all_recipe);
} else {
    console.log("nothing")
}

add_new_btn.addEventListener("click", (event) => {
  // event.preventDefault()
  let new_recipe = {
    name: "",
    step: "",
    ingredient: [],
    id: unique_ID(),
  };

  all_recipe.push(new_recipe);
  saving_recipe(all_recipe);
  console.log(all_recipe);

  location.assign(`./add-recipe.html#${new_recipe.id}`);
});

filter_recipe.addEventListener("input",(event)=>{
  console.log(event.target.value);
  filtering(event.target.value)
})


console.log(all_recipe);
