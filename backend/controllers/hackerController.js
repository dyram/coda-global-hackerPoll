const model = require("../models");
const Hack = model.Hackers;
const Skill = model.Skills

Hackers = () => { };

Hackers.addHacker = async (hName, challenge, exp, tags) => {

    let promise = await Hack.create({
        name: hName,
        challenge: parseInt(challenge),
        expert: parseInt(exp),
        votes: 0
    });

    tags.map(async obj => {
        await Skill.create({
            skill: obj.label,
            rating: parseInt(obj.rating),
            HackerId: promise.id,
        })
    })

    return promise;
};

Hackers.getHackers = async () => {
    let promise = await Hack.findAll({
        include: [
            {
                model: Skill,
                attributes: ["id", "skill", "rating", "HackerId"]
            },
        ]
    });
    return promise;
};

Hackers.getSkills = async () => {
    let promise = await Skill.findAll();
    return promise;
}


module.exports = Hackers;
