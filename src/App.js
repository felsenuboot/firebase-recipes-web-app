import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";
//import "./App.css";
import { Heading, HeadingLevel } from "baseui/heading";

function App() {
  const [user, setUser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  return (
    <div className="App">
      <HeadingLevel>
        <Heading>Firebase Recipes</Heading>
      </HeadingLevel>
      <LoginForm existingUser={user}></LoginForm>
    </div>
  );
}

export default App;
