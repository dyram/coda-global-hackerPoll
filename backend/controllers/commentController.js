const model = require("../models");
const Comment = model.Comments

Comments = () => { };

Comments.addComment = async (tName, uid, text) => {

    let promise = await Comment.create({
        TrackId: tName,
        text: text,
        UserId: uid,
    });

    return promise;
};

Comments.getComments = async () => {
    let promise = await Comment.findAll({
        include: [
            {
                model: model.Users,
                attributes: ["id", "email"]
            },
        ]
    });
    return promise;
};

module.exports = Comments;
