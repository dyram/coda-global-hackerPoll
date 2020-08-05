import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

export default function Comments({ hackId, userId, sendData, likeData }) {
  const [uid, setUid] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userToken"));
    setUid(data.uid);
  }, [likeData]);

  const sendLike = () => {
    sendData({ hackId, userId, liked: true });
  };

  const sendUnlike = () => {
    sendData({ hackId, userId, liked: false });
  };

  return (
    <div>
      {likeData.length === 0 ? (
        <Button onClick={sendLike} color="secondary">
          Vote
        </Button>
      ) : (
        <span></span>
      )}
      {likeData.map((obj) =>
        obj.UserId === uid && obj.HackerId === hackId && obj.isLiked ? (
          <Button onClick={sendUnlike} color="primary">
            Unvote
          </Button>
        ) : (
          <Button onClick={sendLike} color="secondary">
            Vote
          </Button>
        )
      )}

      {/* {likes.map((obj) =>
        obj.UserId === uid && obj.HackerId === hackId && obj.isLiked ? (
          <Button onClick={sendUnlike} color="primary">
            Unvote
          </Button>
        ) : (
          <Button onClick={sendLike} color="secondary">
            Vote
          </Button>
        )
      )} */}

      {/* {likeData.map((obj) => (
        <div>
          {obj.HackerId},{obj.UserId}
        </div>
      ))} */}

    </div>
  );
}
