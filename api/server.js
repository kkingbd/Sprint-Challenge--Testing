const express = require('express');
const games = require('../data/gamesModel.js')
const server = express()
server.use(express.json())


server.get('/games', async (req,res) => {
    const rows = await games.totalList();
    res.status(200).json(rows);
})

server.post('/games', async (req,res) => {
    const gameDATA = req.body;

    if (gameDATA.title && gameDATA.genre) {
        const ids = await games.add(gameDATA);
        res.status(201).json(ids);
    }
    else {
        res.status(422).json({message: `missing info`});
    }
});


module.exports = server;