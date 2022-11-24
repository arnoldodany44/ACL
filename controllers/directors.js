const express=require("express");
const { findOneAndUpdate } = require("../models/director");
const Director=require('../models/director');
function getDirectors(req, res, next) {
    Director.find().then(obj=>res.status(200).json({
        message: "Lista de directores",
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message: "Error al buscar lista de directores",
        error: e
    }));
}
function getDirector(req, res, next) {
  const id=req.params.id;
  Director.findOne({"_id":id}).then(obj=>res.status(200).json({
    message: "Director encontrado",
    obj: obj
  }))
  .catch(e=>res.status(500).json({
    message: "Error al buscar director",
    error: e
  }));
}
function create(req, res, next) {
  const name=req.body.name;
  const lastName=req.body.lastName;
  let director=new Director({
    name: name,
    lastName: lastName
  });
  director.save().then(obj=>res.status(200).json({
    message: "Director generado",
    obj: obj
  }))
  .catch(e => res.status(500).json({
    message: "No se genero el director",
    obj: e
  }));
}
function replace(req, res, next) {
    const id=req.params.id;
    let name=req.body.name ? req.body.name : "";
    let lastName=req.body.lastName ? req.body.lastName : "";
    let director = new Object({
        _name: name,
        _lastName: lastName
    });
    Director.findOneAndUpdate({"_id":id},director,{new:true}).then(obj=>res.status(200).json({
        message: "Director modificado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Director",
        error: e
    }));
}
function edit(req, res, next) {
    const id=req.params.id;
    let name=req.body.name;
    let lastName=req.body.lastName;
    let director = new Object();
    if(name){
        director._name=name;
    }
    if(lastName){
        director._lastName=lastName;
    }
    Director.findOneAndUpdate({"_id":id},director,{new:true}).then(obj=>res.status(200).json({
        message: "Director modificado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Director",
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    Director.remove({"_id":id}).then(obj=>res.status(200).json({
        message: "Director eliminado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al eliminar Director",
        error: e
    }))
}
module.exports={getDirectors,getDirector,create,replace,edit,destroy};