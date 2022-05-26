const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = '5002';

const users = {};
const games = {};
const statistics = {};

app.get('/users', function (req, res) {
    res.json(users);
})

app.post("/user/delete", function (req, res) {
    const {login} = req.body;
    delete users[login];
    res.json({
        ok: true,
    })
})

app.post('/user/current', function (req, res) {
    const {login} = req.body;
    res.json(users[login]);
})

app.post('/user/change', function (req, res) {
    const {login, firstName, lastName} = req.body;
    users[login] = {
        ...users[login],
        firstName,
        lastName
    }
    res.json({
        ok: true,
    })
})

app.post('/register', function (req, res) {
    const {login, password, lastName, firstName} = req.body;
    const alreadyAdded = !!users[login];
    let message = "";
    if (alreadyAdded) {
        message = "Пользователь с таким именем уже существует!";
    } else {
        message = 'Вы успешно зарегистрированы!';
        users[login] = {
            lastName,
            firstName,
            password,
        };
    }
    res.json({message, ok: !alreadyAdded});
})

app.post('/auth', function (req, res) {
    const {login, password} = req.body;
    const ok = users[login] && users[login].password === password;
    const message = ok ? "" : "Пользователя с такими данными не существует!";
    res.json({message, ok});
})

app.post('/game/delete', function (req, res) {
    const {id} = req.body;
    delete games[id];
    res.json({
        ok: true,
    })
})

app.post('/game/save', function (req, res) {
    const {
        id,
        name,
        description,
        complexity,
        questions
    } = req.body;
    games[id] = {
        id,
        name,
        description,
        complexity,
        questions
    }
    res.json({ok: true});
})

app.get('/games', function (req, res) {
    res.json(games);
})

app.post('/game/get', function (req, res) {
    const {id} = req.body;
    res.json(games[id]);
})

app.get('/statistics', function (req, res) {
    res.json(statistics);
})

app.post('/statistic/add', function (req, res) {
    const {gameId, meta, login} = req.body;
    if (!statistics[gameId]) {
        statistics[gameId] = {};
    }
    statistics[gameId] = {
        ...statistics[gameId],
        [login]: meta,
    }
    res.json({
        ok: true,
    })
})

app.post('/statistic/get', function (req, res) {
    const {id} = req.body;
    return res.json(statistics[id]);
})

app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server is running in port ${PORT}`);
});
