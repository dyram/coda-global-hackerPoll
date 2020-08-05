import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

import AddHacker from "./AddHacker";
// import Interaction from "./Interaction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  sides: {
    width: "25ch",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
}));

const AdminPage = ({ emitData, hackers, delHacker, modData }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [hName, setHname] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [tagRate, setTagRate] = useState();
  const [noChallenge, setNoChallenge] = useState();
  const [expLevel, setExpLevel] = useState();
  const [modId, setModId] = useState();
  const [votes, setVotes] = useState();

  const handleClickOpen = (id, vote) => {
    console.log("MOD ID", id);
    setModId(id);
    setVotes(vote);
    setOpen(true);
  };

  const handleClose = () => {
    clearFields();
    setOpen(false);
  };

  const addData = (data) => {
    if (data != null) {
      emitData(data);
    }
  };

  const deleteHacker = (data) => {
    delHacker(data);
  };

  const clearFields = () => {
    setHname(undefined);
    setTags([]);
    setTag(undefined);
    setTagRate(undefined);
    setNoChallenge(undefined);
    setExpLevel(undefined);
    setModId(undefined);
  };

  const sendTrack = () => {
    const data = {
      modId,
      hName,
      noChallenge,
      expLevel,
      tags,
      votes,
    };

    modData(data);
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
      <AddHacker setData={(data) => addData(data)} />
      <hr />
      <Typography variant="button">&nbsp;&nbsp;Hackers</Typography>
      <hr />
      <List className={classes.root}>
        {hackers.map((obj, ind) => (
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <React.Fragment>
                  {ind + 1} . {obj.name}
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    <em>No. of challenges completed : </em>
                    {obj.challenge}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    <em>Candidate Expertise Rating : </em>
                    {obj.expert} / 5
                  </Typography>
                  <br />
                  <br />
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Skills
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {obj.Skills.map((objs, inds) => (
                          <ListItemText
                            primary={
                              <React.Fragment>
                                {inds + 1} . {objs.skill}
                              </React.Fragment>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  <em>Skill Expertise Level : </em>
                                  {objs.rating} / 5
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  <br />
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    <em>No. of votes : </em>
                    {obj.votes}
                    <Button
                      // style={{ marginLeft: "80vw" }}
                      onClick={(e) => handleClickOpen(obj.id, obj.votes)}
                      color="secondary"
                    >
                      Modify
                    </Button>
                    <Button
                      onClick={(e) => deleteHacker({ id: obj.id })}
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </Typography>
                  <br />
                  <br />
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Modify Hacker</DialogTitle>
        <DialogContent>
          <DialogContentText>Modify Hacker Details</DialogContentText>
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
          <Paper component="ul" className={classes.paper}>
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
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPage;
