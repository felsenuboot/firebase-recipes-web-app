import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";
//import "./App.css";
import { Heading, HeadingLevel } from "baseui/heading";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

function App() {
  const [user, setUser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  async function handleAddRecipe(newRecipe) {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );

      // TODO: fetch new recipes from firestore

      alert(`succesfully created a recipe with an ID = ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="App">
      <div>
        <HeadingLevel>
          <Heading> Firebase Recipes </Heading>{" "}
        </HeadingLevel>{" "}
        <HeadingLevel>
          <LoginForm existingUser={user}> </LoginForm>{" "}
          <AddEditRecipeForm handleAddRecipe={handleAddRecipe}>
            {" "}
          </AddEditRecipeForm>{" "}
        </HeadingLevel>{" "}
      </div>{" "}
      <div className="main"> </div>
    </div>
  );
}

export default App;
