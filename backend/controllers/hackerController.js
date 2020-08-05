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

Hackers.deleteHacker = async (data) => {
    let prom = await Skill.destroy({ where: { HackerId: data } })
    let promise = await Hack.destroy({ where: { id: data } })
    return { promise, prom }
}

Hackers.modifyHacker = async (modId, hName, challenge, exp, tags, vote) => {
    let promise = await Skill.destroy({ where: { HackerId: modId } })

    let prom = await Hack.update({
        name: hName,
        challenge: parseInt(challenge),
        expert: parseInt(exp),
        votes: vote
    }, { where: { id: modId } })

    tags.map(async obj => {
        await Skill.create({
            skill: obj.label,
            rating: parseInt(obj.rating),
            HackerId: promise.id,
        })
    })

    return { promise, prom }
}

module.exports = Hackers;
