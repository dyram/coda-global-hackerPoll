import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Comments({
  trackName,
  userId,
  sendData,
  likeData,
  sendComm,
}) {
  const [uid, setUid] = useState();
  const [addOpen, setAddOpen] = useState(false);
  const [comment, setComment] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userToken"));
    setUid(data.uid);
  }, []);

  const sendLike = () => {
    sendData({ trackName, userId, liked: true });
  };

  const sendUnlike = () => {
    sendData({ trackName, userId, liked: false });
  };

  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    clearFields();
    setAddOpen(false);
  };

  const clearFields = () => {
    setComment();
  };

  const addComment = () => {
    sendComm({ trackName, userId, comment });
    handleClose();
  };

  return (
    <div>
      <br />
      <br />
      {likeData.length === 0 ? (
        <Button onClick={sendLike} color="secondary">
          Like
        </Button>
      ) : (
        <span></span>
      )}
      {likeData.map((obj) =>
        obj.UserId === uid && obj.TrackId === trackName && obj.isLiked ? (
          <Button onClick={sendUnlike} color="primary">
            Unlike
          </Button>
        ) : (
          <Button onClick={sendLike} color="secondary">
            Like
          </Button>
        )
      )}
      <Button onClick={handleClickOpen} color="secondary">
        Comment
      </Button>
      <Dialog
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a Comment on {trackName}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addComment} color="secondary">
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
