const express=require("express");
const { findOneAndUpdate } = require("../models/actor");
const Actor=require('../models/actor');
function getActors(req, res, next) {
    Actor.find().then(obj=>res.status(200).json({
        message: "Lista de actores",
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message: "Error al buscar lista de actores",
        error: e
    }));
}
function getActor(req, res, next) {
  const id=req.params.id;
  Actor.findOne({"_id":id}).then(obj=>res.status(200).json({
    message: "Actor encontrado",
    obj: obj
  }))
  .catch(e=>res.status(500).json({
    message: "Error al buscar Actor",
    error: e
  }));
}
function create(req, res, next) {
  const name=req.body.name;
  const lastName=req.body.lastName;
  let actor=new Actor({
    name: name,
    lastName: lastName
  });
  actor.save().then(obj=>res.status(200).json({
    message: "Actor generado",
    obj: obj
  }))
  .catch(e => res.status(500).json({
    message: "No se generó el actor",
    obj: e
  }));
}
function replace(req, res, next) {
    const id=req.params.id;
    let name=req.body.name ? req.body.name : "";
    let lastName=req.body.lastName ? req.body.lastName : "";
    let actor = new Object({
        _name: name,
        _lastName: lastName
    });
    Actor.findOneAndUpdate({"_id":id},actor,{new:true}).then(obj=>res.status(200).json({
        message: "Actor modificado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Actor",
        error: e
    }));
}
function edit(req, res, next) {
    const id=req.params.id;
    let name=req.body.name;
    let lastName=req.body.lastName;
    let actor = new Object();
    if(name){
        actor._name=name;
    }
    if(lastName){
        actor._lastName=lastName;
    }
    Actor.findOneAndUpdate({"_id":id},actor,{new:true}).then(obj=>res.status(200).json({
        message: "Actor modificado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Actor",
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    Actor.remove({"_id":id}).then(obj=>res.status(200).json({
        message: "Actor eliminado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al eliminar Actor",
        error: e
    }))
}
module.exports={getActors,getActor,create,replace,edit,destroy};