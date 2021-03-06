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

import Comments from "./Comments";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function ViewerPage({
  hackers,
  uid,
  login,
  emitData,
  likeData,
}) {
  const classes = useStyles();

  const addData = (data) => {
    emitData(data);
  };

  useEffect(() => {
    console.log("VIEWER PAGE LIKE DATA", likeData);
  }, [likeData]);

  return (
    <div>
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
                    {obj.Votes.length}
                  </Typography>
                  <br />
                  <br />
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              }
            />
            {login ? (
              <Comments
                sendData={(data) => {
                  addData(data);
                }}
                hackName={obj.name}
                hackId={obj.id}
                userId={uid}
                likeData={likeData}
                hackers={obj}
              />
            ) : (
              <span></span>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
