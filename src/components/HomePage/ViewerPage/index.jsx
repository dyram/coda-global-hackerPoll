import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
  approvedTrack,
  uid,
  login,
  emitData,
  likeData,
  emitComm,
}) {
  const classes = useStyles();

  const addComm = (data) => {
    emitComm(data);
  };

  const addData = (data) => {
    emitData(data);
  };

  return (
    <div>
      Viewer
      {/* <List className={classes.root}>
        {approvedTrack.map((obj, index) => (
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={obj.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Approval Status :{" "}
                    {obj.approved
                      ? "Verified Track"
                      : "Awaiting approval from Admin"}
                  </Typography>
                  <br />
                  <audio controls>
                    <source
                      src={`./${obj.data.substring(9, obj.data.length)}`}
                      type="audio/mpeg"
                    />
                  </audio>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              }
            />
            <br />
            {login ? (
              <Comments
                sendData={(data) => {
                  addData(data);
                }}
                sendComm={(data) => {
                  addComm(data);
                }}
                trackName={obj.name}
                userId={uid}
                likeData={likeData}
              />
            ) : (
              <span></span>
            )}
          </ListItem>
        ))}
      </List> */}
    </div>
  );
}
