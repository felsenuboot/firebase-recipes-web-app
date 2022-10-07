import { useEffect, useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";
//import "./App.css";
import { HeadingXLarge } from "baseui/typography";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";
import * as React from "react";
import { Accordion, Panel } from "baseui/accordion";
import { Card, StyledBody } from "baseui/card";

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes()
      .then((fetchedRecipes) => {
        setRecipes(fetchedRecipes);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  }, [user]);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  async function fetchRecipes() {
    let fetchedRecipes = [];

    try {
      const response = await FirebaseFirestoreService.readDocuments("recipes");

      const newRecipes = response.docs.map((recipeDoc) => {
        const id = recipeDoc.id;
        const data = recipeDoc.data();
        data.publishDate = new Date(data.publishDate.seconds * 1000);
        return { ...data, id };
      });

      fetchedRecipes = [...newRecipes];
    } catch (error) {
      console.error(error.message);
      throw error;
    }

    return fetchedRecipes;
  }

  async function handleFetchRecipes() {
    try {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async function handleAddRecipe(newRecipe) {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );

      handleFetchRecipes();

      alert(`succesfully created a recipe with an ID = ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <HeadingXLarge> Firebase Recipes </HeadingXLarge>
      <LoginForm existingUser={user}> </LoginForm>
      <Accordion onChange={({ expanded }) => console.log(expanded)} accordion>
        {recipes && recipes.length > 0 ? (
          <Panel title="Recipes">
            {recipes.map((recipe) => {
              return (
                <Card key={recipe.id} title={recipe.name}>
                  <StyledBody>
                    <div className="recipe-field">
                      Category : {recipe.category[0].label}
                    </div>
                    <div className="recipe-field">
                      Publish Date: {recipe.publishDate.toString()}
                    </div>
                  </StyledBody>
                </Card>
              );
            })}
          </Panel>
        ) : null}

        {user ? (
          <Panel title="Add a Recipe">
            <AddEditRecipeForm
              handleAddRecipe={handleAddRecipe}
            ></AddEditRecipeForm>
          </Panel>
        ) : null}
      </Accordion>
    </div>
  );
}

export default App;
