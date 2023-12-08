import mongoose from "mongoose";
const { Schema, model } = mongoose;

const videogameSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  developer: {
    type: String,
    required: true,
    trim: true,
  },
  platform: {
    type: [String],
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  gameMode: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true
  }
});

export const Videogame = model("Videogame", videogameSchema);
