import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import "./index.css";
import Axios from "axios";
// import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [open, setOpen] = useState(false);
  // const [available, setAvailable] = useState("true");

  // const handleAvail = (event) => {
  //   setAvailable(event.target.value);
  // };

  const registerUser = () => {
    if (password != rePass) setOpen(true);
    else {
      Axios.post("http://localhost:4000/signup", {
        email,
        password,
        // available,
      }).then((res) => {
        if (res.status === 200) window.location.href = "/login";
      });
    }
  };

  return (
    <div className="login-form-div">
      <h1>SIGN-UP</h1>
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
      <TextField
        type="password"
        required
        id="outlined-required-password"
        label="Re-confirm Password"
        // defaultValue="Password"
        variant="outlined"
        value={rePass}
        onChange={(e) => setRePass(e.target.value)}
      />
      <br />
      {/* <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose your role...</FormLabel>
        <RadioGroup
          row
          aria-label="availability"
          name="availability1"
          value={available}
          onChange={handleAvail}
        >
          <FormControlLabel value="true" control={<Radio />} label="Artist" />
          <FormControlLabel value="false" control={<Radio />} label="Viewer" />
        </RadioGroup>
      </FormControl>
      <br /> */}
      <Button onClick={registerUser} variant="contained" color="primary">
        Register
      </Button>
      <br />
      <span>
        <p className="italic-text">
          Already have an account? <Link href="/login">Login</Link> now
        </p>
      </span>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={(e) => setOpen(false)}
      >
        <Alert variant="filled" severity="error">
          Passwords don't match — <strong>check it out!</strong>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
