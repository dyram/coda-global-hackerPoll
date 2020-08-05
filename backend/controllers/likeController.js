const model = require("../models");
const Like = model.Likes

Likes = () => { };

Likes.addLike = async (tName, uid, liked) => {

    let promise = await Like.create({
        TrackId: tName,
        isLiked: liked,
        UserId: uid,
    });

    return promise;
};

Likes.getLike = async () => {
    let promise = await Like.findAll();
    return promise;
};

Likes.deleteLike = async (tName, uid, liked) => {
    let promise = await Like.destroy({ where: { TrackId: tName, isLiked: !liked, UserId: uid } })
    return promise;
}


module.exports = Likes;
