import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Interaction({ likes, comments, tName }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    likes.map((obj) => {
      console.log("LIKE OBJ", obj);
      if (tName === obj.TrackId) setLikeCount(likeCount + 1);
    });
  }, [likes]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen}>
        View Comments
      </Button>
      Likes : {likeCount}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{tName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The users who have commented on your track, {tName} are,
            <List className={classes.root}>
              {comments.map((obj, index) => (
                <ListItem key={index} alignItems="flex-start">
                  {obj.TrackId === tName ? (
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <h4>
                            {index + 1}.{obj.User.email}
                          </h4>
                          <br />
                          {obj.text}
                        </React.Fragment>
                      }
                      secondary={<Divider />}
                    />
                  ) : (
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <span></span>
                        </React.Fragment>
                      }
                      secondary={<span />}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
