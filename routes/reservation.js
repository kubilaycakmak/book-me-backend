import express from "express";
import Reservation from "../models/reservation.js";

const router = express.Router();

router.post("/book", (req, res, next) => {
  const { name, slot, avatar, code } = req.body;

  const newReservation = new Reservation({
    name: name,
    slot: slot,
    avatar: avatar,
    code: code,
  });
  Reservation.findOne({ slot: slot, code: code }).then((reservation) => {
    if (reservation) {
      return res.status(400).json({
        message: "This slot already taken.",
      });
    } else {
      newReservation
        .save()
        .then((result) => {
          if (result) {
            return res.status(201).json({
              message: "This spot is yours!",
            });
          } else {
            return res.status(500).json({
              message: "Something happend :(",
            });
          }
        })
        .catch((err) => {
          return res.status(400).json({
            message: err.message,
          });
        });
    }
  });
});

router.get("/book", async (req, res, next) => {
  const code = req.query.code;

  await Reservation.find({ code: code })
    .then((reservation) => {
      if (reservation && reservation.length != 0) {
        return res.status(200).json({
          message: "success",
          reservation: reservation,
        });
      } else {
        return res.status(200).json({
          message: "There is no reservation on this class!",
          reservation: reservation,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong.",
      });
    });
});

router.delete("/book", async (req, res, next) => {
  await Reservation.remove().then((reservation) => {
    return res.status(200).json({
      message: "success",
      reservation,
    });
  });
});

export default router;
