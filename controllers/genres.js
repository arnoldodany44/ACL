const express=require("express");
const { findOneAndUpdate } = require("../models/genre");
const Genre=require('../models/genre');
function getGenres(req, res, next) {
    Genre.find().then(obj=>res.status(200).json({
        message: "Lista de generos",
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message: "Error al buscar lista de géneros",
        error: e
    }));
}
function getGenre(req, res, next) {
  const id=req.params.id;
  Genre.findOne({"_id":id}).then(obj=>res.status(200).json({
    message: "Género encontrado",
    obj: obj
  }))
  .catch(e=>res.status(500).json({
    message: "Error al buscar génerp",
    error: e
  }));
}
function create(req, res, next) {
  const description=req.body.description;
  const status=req.body.status;
  let genre=new Genre({
    description: description,
    status: status
  });
  genre.save().then(obj=>res.status(200).json({
    message: "Genero generado",
    obj: obj
  }))
  .catch(e => res.status(500).json({
    message: "No se genero el género",
    obj: e
  }));
}
function replace(req, res, next) {
    const id=req.params.id;
    let description=req.body.description ? req.body.description : "";
    let status=req.body.status ? req.body.status : false;
    let genre = new Object({
        _description: description,
        _status: status
    });
    Genre.findOneAndUpdate({"_id":id},genre,{new:true}).then(obj=>res.status(200).json({
        message: "Género modificado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar género",
        error: e
    }));
}
function edit(req, res, next) {
    const id=req.params.id;
    let description=req.body.description;
    let status=req.body.status;
    let genre = new Object();
    if(description){
        genre._description=description;
    }
    if(status){
        genre._status=status;
    }
    Genre.findOneAndUpdate({"_id":id},genre,{new:true}).then(obj=>res.status(200).json({
        message: "Género modificado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar género",
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    Genre.remove({"_id":id}).then(obj=>res.status(200).json({
        message: "Género eliminado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al eliminar género",
        error: e
    }))
}
module.exports={getGenres,getGenre,create,replace,edit,destroy};