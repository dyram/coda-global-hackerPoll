const model = require("../models");
const Vote = model.Votes

Votes = () => { };

Votes.addVote = async (hackId, uid, liked) => {
    let promise = await Vote.create({
        HackerId: hackId,
        isVoted: liked,
        UserId: uid,
    });

    return promise;
};

Votes.getVote = async () => {
    let promise = await Vote.findAll();
    return promise;
};

Votes.deleteVote = async (tName, uid, liked) => {
    let promise = await Vote.destroy({ where: { TrackId: tName, isLiked: !liked, UserId: uid } })
    return promise;
}


module.exports = Votes;
