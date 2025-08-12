const Joi = require('joi');

const currentYear = new Date().getFullYear();

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().max(50).required(),
  year: Joi.number().integer().min(1900).max(currentYear).required(),
});

const SongPayloadSchema = Joi.object({
  title: Joi.string().max(100).required(),
  year: Joi.number().integer().min(1900).max(currentYear).required(),
  genre: Joi.string().max(50).required(),
  performer: Joi.string().max(100).required(),
  duration: Joi.number().integer().min(1),
  albumId: Joi.string(),
});

module.exports = { AlbumPayloadSchema, SongPayloadSchema };