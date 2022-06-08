const User = require('./models/User');
const Game = require('./models/Game');
const Statistic = require('./models/Statistic');
const groupBy = require('lodash/groupBy');

module.exports = {
    routes: app => {
        app.get('/users', async function (req, res) {
            try {
                const response = await User.find();
                res.json(response);
            } catch (e) {
                res.json([]);
            }
        })

        app.post("/user/delete", async function (req, res) {
            try {
                await User.deleteOne({login: req.body.login});
                res.json({
                    ok: true,
                })
            } catch (e) {
                res.json({
                    ok: false,
                })
            }

        })

        app.post('/user/current', async function (req, res) {
            try {
                const response = await User.findOne({login: req.body.login});
                res.json(response);
            } catch (e) {
                res.json(null);
            }
        })

        app.post('/user/change', async function (req, res) {
            try {
                await User.findOneAndUpdate({login: req.body.login}, req.body);
                res.json({
                    ok: true,
                })
            } catch (e) {
                res.json({
                    ok: false,
                })
            }

        })

        app.post('/register', async function (req, res) {
            try {
                const user = await User.findOne({login: req.body.login});
                const alreadyAdded = !!user;
                let message = "";
                if (alreadyAdded) {
                    message = "Пользователь с таким именем уже существует!";
                } else {
                    message = 'Вы успешно зарегистрированы!';
                    const newUser = new User(req.body);
                    await newUser.save();
                }
                res.json({message, ok: !alreadyAdded});
            } catch (e) {
                res.json({message: "Что-то пошло не так", ok: false});
            }

        })

        app.post('/auth', async function (req, res) {
            try {
                const user = await User.findOne({login: req.body.login, password: req.body.password});
                const ok = !!user;
                const message = ok ? "" : "Пользователя с такими данными не существует!";
                res.json({message, ok});
            } catch (e) {
                res.json({message: "Что-то пошло не так", ok: false});
            }
        })

        app.post('/game/delete', async function (req, res) {
            try {
                await Game.deleteOne({id: req.body.id});
                res.json({
                    ok: true,
                })
            } catch (e) {
                res.json({
                    ok: false,
                })
            }
        })

        app.post('/game/save', async function (req, res) {
            try {
                const newGame = new Game(req.body);
                await newGame.save();
                res.json({ok: true});
            } catch (e) {
                res.json({ok: false});
            }

        })
        //
        app.get('/games', async function (req, res) {
            try {
                const response = await Game.find();
                res.json(response);
            } catch (e) {
                res.json([]);
            }
        })

        app.post('/game/get', async function (req, res) {
            try {
                const response = await Game.findOne({id: req.body.id});
                res.json(response);
            } catch (e) {
                res.json({});
            }
        })

        app.get('/statistics', async function (req, res) {
            try {
                const response = await Statistic.find();
                res.json(groupBy(response, 'gameId'));
            } catch (e) {
                res.json([]);
            }
        })

        app.post('/user-statistics', async function (req, res) {
            try {
                const response = await Statistic.find({login: req.body.login});
                res.json(response);
            } catch (e) {
                res.json([]);
            }
        })

        app.post('/statistic/add', async function (req, res) {
            try {
                const newStatistic = new Statistic(req.body);
                await newStatistic.save();
                res.json({
                    ok: true,
                })
            } catch (e) {
                res.json({
                    ok: false,
                })
            }
        })

        app.post('/statistic/get', async function (req, res) {
            try {
                const response = await Statistic.find({gameId: req.body.id});
                res.json(response);
            } catch (e) {
                res.json({})
            }
        })
    }
}
