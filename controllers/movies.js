const express=require("express");
const { findOneAndUpdate } = require("../models/movie");
const Movie=require('../models/movie');
const Genre=require('../models/genre');
const Director=require('../models/director');
const Actor = require("../models/actor");

function getMovies(req, res, next) {
    Movie.find().then(obj=>res.status(200).json({
        message: "Lista de Moviees",
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message: "Error al buscar lista de Moviees",
        error: e
    }));
}
function getMovie(req, res, next) {
  const id=req.params.id;
  Movie.findOne({"_id":id}).then(obj=>res.status(200).json({
    message: "Movie encontrado",
    obj: obj
  }))
  .catch(e=>res.status(500).json({
    message: "Error al buscar movie",
    error: e
  }));
}
async function create(req, res, next) {
  let actors=[];
  const title=req.body.title;
  const genreId=req.body.genreId;
  const directorId=req.body.directorId;
  const actorsIds=[req.body.actorsIds];
  let genre=await Genre.findOne({"_id":genreId});
  let director=await Director.findOne({"_id":directorId});
  if(actorsIds.length>1){
  for(const actorId of actorsIds){
    actors.push(await Actor.findOne({"_id:":actorId}));
  };}else{
    actors.push(await Actor.findOne({"_id:":actorsIds}));
  }
  let movie=new Movie({
    title:title,
    genre: genre,
    director: director,
    actors: actors
  });
  movie.save().then(obj=>res.status(200).json({
    message: "movie generada",
    obj: obj
  }))
  .catch(e => res.status(500).json({
    message: "No se genero la movie",
    obj: e
  }));
}
async function replace(req, res, next) {
    let actors=[];
    const id=req.params.id;
    const title=req.body.title ? req.body.title : "";
    const genreId=req.body.genreId ? req.body.genreId : 0;
    const directorId=req.body.directorId ? req.body.directorId : 0;
    const actorsIds=req.body.actors ? [req.body.actorsIds] : [];
    let genre=await Genre.findOne({"_id":genreId});
    let director=await Director.findOne({"_id":directorId});
    if(actorsIds.length>1){
        for(const actorId of actorsIds){
          actors.push(await Actor.findOne({"_id:":actorId}));
        };}else{
          actors.push(await Actor.findOne({"_id:":actorsIds}));
        }
    let movie = new Object({
        _title:title,
        _genre: genre,
        _director: director,
        _actors: actors
    });
    Movie.findOneAndUpdate({"_id":id},movie,{new:true}).then(obj=>res.status(200).json({
        message: "Movie modificada",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Movie",
        error: e
    }));
}
async function edit(req, res, next) {
    let actors=[];
    const id=req.params.id;
    const title=req.body.title;
    const genreId=req.body.genreId;
    const directorId=req.body.directorId;
    const actorsIds=[req.body.actorsIds];
    if(actorsIds.length>1){
        for(const actorId of actorsIds){
          actors.push(await Actor.findOne({"_id:":actorId}));
        };}else{
          actors.push(await Actor.findOne({"_id:":actorsIds}));
    }
    let genre=await Genre.findOne({"_id":genreId});
    let director=await Director.findOne({"_id":directorId});
    let movie = new Object();
    if(title){
        movie._title=title;
    }
    if(genre){
        movie._genre=genre;
    }
    if(director){
        movie._director=director;
    }
    if(actors){
        movie._actors=actors;
    }
    Movie.findOneAndUpdate({"_id":id},movie,{new:true}).then(obj=>res.status(200).json({
        message: "Movie modificado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Movie",
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    Movie.remove({"_id":id}).then(obj=>res.status(200).json({
        message: "Movie eliminada",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al eliminar movie",
        error: e
    }))
}
module.exports={getMovies,getMovie,create,replace,edit,destroy};