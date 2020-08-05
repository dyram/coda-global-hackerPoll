import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  sides: {
    width: "25ch",
  },
}));

const AddTrack = ({ setData }) => {
  const classes = useStyles();

  const [addOpen, setAddOpen] = useState(false);

  const [hName, setHname] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [tagRate, setTagRate] = useState();
  const [noChallenge, setNoChallenge] = useState();
  const [expLevel, setExpLevel] = useState();

  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    clearFields();
    setAddOpen(false);
  };

  const clearFields = () => {
    setHname(undefined);
    setTags([]);
    setTag(undefined);
    setTagRate(undefined);
    setNoChallenge(undefined);
    setExpLevel(undefined);
  };

  const sendTrack = () => {
    const data = {
      hName,
      noChallenge,
      expLevel,
      tags,
      // available,
      // path,
    };

    setData(data);
    handleClose();
  };

  const detectSpace = (e) => {
    if (e === 32) {
      tags.push({ key: tag, label: tag, rating: tagRate });
      setTag("");
      setTagRate("");
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setTags((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <div>
      <br />
      <Button color="primary" onClick={handleClickOpen}>
        Add new hacker
      </Button>
      <Dialog
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Hacker</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new hacker to contest in our HackerPoll election
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={hName}
            onChange={(e) => setHname(e.target.value)}
          />
          <TextField
            // autoFocus
            margin="dense"
            id="noChall"
            label="No. of challenges completed"
            fullWidth
            value={noChallenge}
            onChange={(e) => setNoChallenge(e.target.value)}
          />
          <TextField
            // autoFocus
            margin="dense"
            id="exp"
            label="Candidate Expertise Level (on a scale of 1-5)"
            fullWidth
            type="number"
            value={expLevel}
            onChange={(e) => setExpLevel(e.target.value)}
          />
          <TextField
            className={classes.sides}
            margin="dense"
            id="desc"
            label="Skills"
            fullWidth
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            // onKeyDown={(e) => detectSpace(e.keyCode)}
          />
          &nbsp;&nbsp;
          <TextField
            className={classes.sides}
            margin="dense"
            type="number"
            id="desc"
            label="Skill Rating (on a scale of 1-5)"
            fullWidth
            value={tagRate}
            onChange={(e) => setTagRate(e.target.value)}
            onKeyDown={(e) => detectSpace(e.keyCode)}
          />
          <br />
          <br />
          <Paper component="ul" className={classes.root}>
            {tags.map((data) => {
              return (
                <li key={data.key}>
                  <Chip
                    label={
                      <React.Fragment>
                        {data.label} : {data.rating}/5
                      </React.Fragment>
                    }
                    onDelete={handleDelete(data)}
                    className={classes.chip}
                  />
                </li>
              );
            })}
          </Paper>
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sendTrack} color="secondary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTrack;
