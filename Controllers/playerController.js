const Players = require("../models/players");
const clubData = [
  {
    id: 1,
    name: "Barcelona",
  },
  {
    id: 2,
    name: "Real Madrid",
  },
  {
    id: 3,
    name: "Manchester United",
  },
  {
    id: 4,
    name: "Manchester City",
  },
  {
    id: 5,
    name: "PSG",
  },
  {
    id: 6,
    name: "Chelsea",
  },
  {
    id: 7,
    name: "Arsenal",
  },
  {
    id: 8,
    name: "Liverpool",
  },
];
const positions = [
  {
    id: 1,
    name: "Goalkeeper",
  },
  {
    id: 2,
    name: "Defender",
  },
  {
    id: 3,
    name: "Midfiedler",
  },
  {
    id: 4,
    name: "Foward",
  },
];
class playerController {
  index(req, res, next) {
    Players.find({})
      .then((players) => {
        res.render("players", {
          title: "The list of players",
          players: players,
          clubList: clubData,
          positionList: positions,
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    const player = new Players(req.body);
    player
      .save()
      .then(() => {
        res.redirect("/players");
      })
      .catch(next);
  }
  formEdit(req, res, next) {
    const playerId = req.params.playerId;
    Players.findById(playerId)
      .then((player) => {
        res.render("editPlayer", {
          title: "The detail of player",
          player: player,
          clubList: clubData,
          positionList: positions,
        });
      })
      .catch(next);
  }
  edit(req, res, next) {
    Players.updateOne({ _id: req.params.playerId }, req.body)
      .then(() => {
        res.redirect("/players");
      })
      .catch(next);
  }
  delete(req, res, next) {
    Players.deleteOne({ _id: req.params.playerId })
      .then(() => {
        res.redirect("/players");
      })
      .catch(next);
  }
  getProfile(req, res, next) {
    Players.findOne({ _id: req.params.playerId })
      .then((player) => {
        res.render("playerProfile", {
          player: player,
          title: "Profile Of " + player.name,
        });
      })
      .catch(next);
  }
}
module.exports = new playerController();
