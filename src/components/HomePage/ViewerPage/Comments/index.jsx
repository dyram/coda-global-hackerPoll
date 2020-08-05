import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

export default function Comments({
  hackId,
  userId,
  sendData,
  likeData,
  hackers,
}) {
  const [uid, setUid] = useState();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userToken"));
    setUid(data.uid);

    console.log("HACKERS FORM LIKES PAGE", hackers, data.uid);

    filterHackers(data.uid);
  }, [hackers]);

  const filterHackers = (uid) => {
    console.log(
      "FILTER",
      hackers.Votes.filter((obj) => obj.UserId === uid)
    );
    let filt = hackers.Votes.filter((obj) => obj.UserId === uid);
    setFiltered([...filt]);
  };

  const sendLike = () => {
    sendData({ hackId, userId, liked: true });
  };

  const sendUnlike = () => {
    sendData({ hackId, userId, liked: false });
  };

  return (
    <div>
      {filtered.length === 1 ? (
        <Button onClick={sendUnlike} color="primary">
          Unvote
        </Button>
      ) : (
        <Button onClick={sendLike} color="secondary">
          Vote
        </Button>
      )}
    </div>
  );
}
