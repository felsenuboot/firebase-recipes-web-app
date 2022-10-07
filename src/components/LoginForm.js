import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { HeadingMedium } from "baseui/typography";
import { Card, StyledBody, StyledAction } from "baseui/card";

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
    <div>
      {existingUser ? (
        <Card title={"Welcome, " + existingUser.email}>
          <StyledAction>
            <Button
              overrides={{
                BaseButton: { style: { width: "100%" } },
              }}
              type="button"
              className="primary-button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </StyledAction>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
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
          <ButtonGroup>
            <Button type="submit"> Login </Button>
            <Button
              type="button"
              onClick={handleSendResetPasswordEmail}
              className="primary-button"
            >
              Reset Password
            </Button>
          </ButtonGroup>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
