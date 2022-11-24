const express=require("express");
const { findOneAndUpdate } = require("../models/booking");
const AwaitList=require('../models/awaitList');
const Member=require('../models/member');
const Movie=require('../models/movie');

function getAwaitLists(req, res, next) {
    AwaitList.find().then(obj=>res.status(200).json({
        message: "Lista de espera",
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message: "Error al buscar lista de espera",
        error: e
    }));
}
function getAwaitList(req, res, next) {
  const id=req.params.id;
  AwaitList.findOne({"_id":id}).then(obj=>res.status(200).json({
    message: "Lista de espera encontrada",
    obj: obj
  }))
  .catch(e=>res.status(500).json({
    message: "Error al buscar Lista de espera",
    error: e
  }));
}
async function create(req, res, next) {
  const memberId=req.body.memberId;
  const movieId=req.body.movieId;

  let member=await Member.findOne({"_id":memberId});
  let movie=await Movie.findOne({"_id":movieId});
  let awaitList=new AwaitList({
    member: member,
    movie: movie
  });
  awaitList.save().then(obj=>res.status(200).json({
    message: "Lista de espera generada",
    obj: obj
  }))
  .catch(e => res.status(500).json({
    message: "No se genero la Lista de espera",
    obj: e
  }));
}
async function replace(req, res, next) {
    const id=req.params.id;
    const memberId=req.body.memberId ? req.body.memberId : 0;
    const movieId=req.body.movieId ? req.body.movieId : 0;
    let member=await Member.findOne({"_id":memberId});
    let movie=await Movie.findOne({"_id":movieId});
    let awaitList = new Object({
        _member: member,
        _movie: movie,
    });
    AwaitList.findOneAndUpdate({"_id":id},awaitList,{new:true}).then(obj=>res.status(200).json({
        message: "Lista de espera modificada",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Lista de espera",
        error: e
    }));
}
async function edit(req, res, next) {
    const id=req.params.id;
    const memberId=req.body.memberId;
    const movieId=req.body.movieId;
    let member=await Member.findOne({"_id":memberId});
    let movie=await Movie.findOne({"_id":movieId});
    let awaitList = new Object();
    if(member){
        awaitList._member=member;
    }
    if(movie){
        awaitList._movie=movie;
    }
    AwaitList.findOneAndUpdate({"_id":id},awaitList,{new:true}).then(obj=>res.status(200).json({
        message: "Lista de espera modificada",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Lista de espera",
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    AwaitList.remove({"_id":id}).then(obj=>res.status(200).json({
        message: "Lista de espera eliminada",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al eliminar Lista de espera",
        error: e
    }))
}
module.exports={getAwaitLists,getAwaitList,create,replace,edit,destroy};