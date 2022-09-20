import mongoose from "mongoose";

const reservationSchema = mongoose.Schema({
  name: String,
  slot: Number,
  avatar: String,
  code: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
