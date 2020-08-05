import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import "./index.css";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [redirect, setRedirect] = useState(false);

  const loginUser = () => {
    Axios.post("http://localhost:4000/login", { email, password }).then(
      (res) => {
        if (res.data.validity) {
          localStorage.setItem("userToken", JSON.stringify(res.data));
          window.location.href = "/";
        }
      }
    );
  };

  return (
    <div className="login-form-div">
      <h1>LOGIN</h1>
      <TextField
        type="email"
        required
        id="outlined-required-email"
        label="Email"
        // defaultValue="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <TextField
        type="password"
        required
        id="outlined-required-password"
        label="Password"
        // defaultValue="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <br />
      <Button onClick={loginUser} variant="contained" color="primary">
        Login
      </Button>
      <br />
      <span>
        <p className="italic-text">
          Don't have an account? <Link href="/signup">Sign-up</Link> now
        </p>
      </span>
    </div>
  );
};

export default LoginPage;
