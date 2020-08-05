import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Axios from "axios";

import AdminPage from "./AdminPage";
import ViewerPage from "./ViewerPage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const [uid, setUid] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [artistLogin, setArtistLogin] = useState(false);

  // const [allTracks, setAllTracks] = useState([]);
  // const [approveTracks, setApproveTracks] = useState([]);
  // const [likes, setLikes] = useState([]);
  // const [comments, setComments] = useState([]);

  const [hackers, setHackers] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userToken"));
    getHackers();
    if (data != null) {
      setUid(data.id);
      setShowLogin(data.validity);
      setAdminLogin(data.role);
    } else {
      setShowLogin(false);
      setAdminLogin(false);
      setArtistLogin(false);
    }
  }, []);

  const getHackers = () => {
    Axios.get("http://localhost:4000/hacker").then((res) => {
      console.log("GET HACKER", res);
      if (res.status === 200) {
        setHackers([...res.data]);
      }
    });
    Axios.get("http://localhost:4000/skill").then((res) => {
      console.log("GET SKILL", res);
      if (res.status === 200) {
        setSkills([...res.data]);
      }
    });
  };

  const logOutUser = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  const logIn = () => {
    window.location.href = "/login";
  };

  const signUp = () => {
    window.location.href = "/signup";
  };

  const addHacker = (data) => {
    Axios.post("http://localhost:4000/hacker", data, {}).then((res) => {
      console.log("POST HACKER", res);
      getHackers();
    });
  };

  const deleteHacker = (data) => {
    Axios.post("http://localhost:4000/hacker/del", data, {}).then((res) => {
      console.log("DEL HACKER", res);
      getHackers();
    });
  };

  const modHacker = (data) => {
    Axios.post("http://localhost:4000/hacker/mod", data, {}).then((res) => {
      console.log("MOD HACKER", res);
      getHackers();
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            AudioMate
          </Typography>
          {showLogin ? (
            <Button onClick={logOutUser} color="inherit">
              Logout
            </Button>
          ) : (
            <span>
              <Button onClick={logIn} color="inherit">
                Login
              </Button>{" "}
              /
              <Button onClick={signUp} color="inherit">
                Sign-Up
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
      {adminLogin ? (
        <span>
          <AdminPage
            emitData={(data) => {
              addHacker(data);
            }}
            delHacker={(data) => {
              deleteHacker(data);
            }}
            modData={(data) => {
              modHacker(data);
            }}
            hackers={hackers}
          />
        </span>
      ) : (
        <span>
          <ViewerPage
          // likeData={likes}
          // emitComm={(data) => {
          //   addComment(data);
          // }}
          // emitData={(data) => {
          //   addLike(data);
          // }}
          // login={showLogin}
          // uid={uid}
          // approvedTrack={approveTracks}
          />
        </span>
      )}
    </div>
  );
}
