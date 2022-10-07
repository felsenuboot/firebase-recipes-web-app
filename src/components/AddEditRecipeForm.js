import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select } from "baseui/select";
import { Textarea } from "baseui/textarea";
import { DatePicker } from "baseui/datepicker";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";
import { Banner, HIERARCHY } from "baseui/banner";
import { useState } from "react";
import { HeadingSmall } from "baseui/typography";
import { Button, KIND as BUTTON_KIND } from "baseui/button";
import { Plus } from "baseui/icon";

//import "./../App.css";

function AddEditRecipeForm({ handleAddRecipe }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");

  function handleRecipeFormSubmit(e) {
    e.preventDefault();
    if (ingredients.length === 0) {
      alert("ingredients cannot be empty. Please add at least 1 ingredient");
      return;
    }

    const isPublished = new Date(publishDate) <= new Date() ? true : false;

    const newRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      isPublished,
      ingredients,
    };

    handleAddRecipe(newRecipe);
  }

  function handleAddIngredient(e) {
    if (e.key && e.key !== "Enter") {
      return;
    }
    e.preventDefault();

    if (!ingredientName) {
      alert("Missing ingredient field. Please double check.");
      return;
    }

    setIngredients([...ingredients, ingredientName]);
    setIngredientName("");
  }

  return (
    <form
      onSubmit={handleRecipeFormSubmit}
      className="add-edit-recipe-form-container"
    >
      <FormControl label={() => "Recipe Name"}>
        <Input
          id="recipe-name-label"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl label={() => "Category"}>
        <Select
          id="recipe-category-label"
          value={category}
          onChange={(category) => setCategory(category.value)}
          options={[
            {
              label: "Breads, Sandwiches, and Pizza",
              id: "breadsSandwischesAndPizza",
            },
            {
              label: "Eggs & Breakfast",
              id: "eggsAndBreakfast",
            },
            {
              label: "Desserts & Baked Goods",
              id: "dessertsAndBakedGoods",
            },
            {
              label: "Fish & Seafood",
              id: "fishAndSeafood",
            },
            {
              label: "Vegetables",
              id: "vegetables",
            },
          ]}
          required
        />
      </FormControl>
      <FormControl label="Directions">
        <Textarea
          id="recipe-directions-label"
          required
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
          placeholder="Directions"
        />
      </FormControl>
      <FormControl label="Pick a publishing Date">
        <DatePicker
          id="recipe-publish-date"
          value={publishDate}
          required
          onChange={({ date }) =>
            setPublishDate(Array.isArray(date) ? date : [date])
          }
        />
      </FormControl>
      <HeadingSmall>Ingredients</HeadingSmall>
      {ingredients && ingredients.length > 0 ? (
        <List
          items={ingredients}
          removable
          onChange={({ oldIndex, newIndex }) =>
            setIngredients(
              newIndex === -1
                ? arrayRemove(ingredients, oldIndex)
                : arrayMove(ingredients, oldIndex, newIndex)
            )
          }
        />
      ) : null}
      {ingredients && ingredients.length === 0 ? (
        <Banner hierarchy={HIERARCHY.high}>No Ingredients Added Yet!</Banner>
      ) : null}
      <FormControl>
        <Input
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          onKeyPress={handleAddIngredient}
          placeholder="e.g. 1 cup of sugar"
        />
      </FormControl>
      <FormControl>
        <Button kind={BUTTON_KIND.secondary} onClick={handleAddIngredient}>
          <Plus /> Add Ingredient
        </Button>
      </FormControl>
      <FormControl>
        <Button type="submit">Create Recipe</Button>
      </FormControl>
    </form>
  );
}

export default AddEditRecipeForm;
