module.exports = app => {
    const passwordHash = require("password-hash")
    const jwt = require("jsonwebtoken");

    const key = require("../config/key.json");

    const users = require("../models").Users;

    // const Tracks = require("../controllers/trackController");
    // const Likes = require("../controllers/likeController")
    // const Comments = require("../controllers/commentController")
    const Hackers = require("../controllers/hackerController")

    app.get("/", (req, res) => {
        res.send("Working Fine!!");
    });


    app.post("/signup", (req, res) => {
        let data = req.body.password;
        let hash = passwordHash.generate(data);
        users.create({
            email: req.body.email,
            password: hash,
            role: false,
            // artist: req.body.available
        });
        res.send("create Success")
    })

    app.post("/login", (req, res) => {
        let data = req.body;
        users
            .findAll({
                attributes: ["id", "email", "password", "role"],
                where: { email: data.email }
            })
            .then(prom => {
                let val = passwordHash.verify(data.password, prom[0].password);
                let token;
                if (val) {
                    token = {
                        id: jwt.sign(
                            {
                                exp: Date.now() / 1000 + 60 * 60,
                                id: prom[0].id
                            },
                            key.tokenKey
                        ),
                        validity: true,
                        role: prom[0].role,
                        // artist: prom[0].artist,
                        uid: prom[0].id
                    };
                } else {
                    token = {
                        id: jwt.sign({ id: prom[0].id }, key.tokenKey),
                        validity: false,
                    };
                }
                res.send(token);
            });
    })

    app.post("/hacker", async (req, res) => {
        let resp = await Hackers.addHacker(req.body.hName, req.body.noChallenge, req.body.expLevel, req.body.tags)
        res.send(resp)
    })

    app.get("/hacker", async (req, res) => {
        let resp = await Hackers.getHackers()
        res.send(resp)
    })

    app.get("/skill", async (req, res) => {
        let resp = await Hackers.getSkills()
        res.send(resp)
    })

    app.post("/hacker/del", async (req, res) => {
        let resp = await Hackers.deleteHacker(req.body.id)
        res.send(resp)
    })

    app.post("/hacker/mod", async (req, res) => {
        let resp = await Hackers.modifyHacker(req.body.modId, req.body.hName, req.body.noChallenge, req.body.expLevel, req.body.tags, req.body.votes)
        res.send(resp)
    })

}