import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

function LoginForm({ existingUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  }

  function handleLogout() {
    FirebaseAuthService.logoutUser();
  }

  async function handleSendResetPasswordEmail() {
    if (!username) {
      alert("Missing username");
      return;
    }

    try {
      await FirebaseAuthService.sendPasswordResetEmail(username);
      alert("sent the passwrod reset email");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome, {existingUser.email}</h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <FormControl label="Username (Email)">
            <Input
              id="input-id0"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl label="Password">
            <Input
              id="input-id1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </FormControl>
          <Button type="submit">Login</Button>

          <Button
            type="button"
            onClick={handleSendResetPasswordEmail}
            className="primary-button"
          >
            Reset Password
          </Button>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
