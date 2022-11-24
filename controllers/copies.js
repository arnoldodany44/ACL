const express=require("express");
const Copy=require('../models/copy');
function getCopies(req, res, next) {
    Copy.find().then(obj=>res.status(200).json({
        message: "Lista de Copias",
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message: "Error al buscar lista de Copias",
        error: e
    }));}
function getCopy(req, res, next) {
    const id=req.params.id;
    Copy.findOne({"_id":id}).then(obj=>res.status(200).json({
      message: "Copia encontrado",
      obj: obj
    }))
    .catch(e=>res.status(500).json({
      message: "Error al buscar Copia",
      error: e
    }));
}
async function create(req, res, next) {
  const number=req.body.number;
  const format=req.body.format;
  const status=req.body.status;
  const movieId=req.body.movieId;
  let movie=await Movie.findOne({"_id":movieId});
  let copy=new Copy({
    number:number,
    format:format,
    status:status,
    movie:movie,
  });
  copy.save().then(obj=>res.status(200).json({
    message: "Copia creada",
    obj:obj
  })).catch(e=>res.status(400).json({
    message:"Error al crear Copia",
    error:e
  }));
}
async function replace(req, res, next) {
    const id=req.params.id;
    let number=req.body.number ? req.body.number : 0;
    const status=req.body.status ? req.body.status :"";
    const format=req.body.format ? req.body.format :"";
    const movieId=req.body.movieId ? req.body.movieId : 0;
    let movie=await Movie.findOne({"_id":movieId});
    let copy=new Copy({
        number:number,
        format:format,
        status:status,
        movie:movie,
    });
    Copy.findOneAndUpdate({"_id":id},copy,{new:true}).then(obj=>res.status(200).json({
        message: "Copia reemplazada",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Copia",
        error: e
    }));}
async function edit(req, res, next) {
    const id=req.params.id;
    const number=req.body.number;
    const format=req.body.format;
    const status=req.body.status;
    const movieId=req.body.movieId;
    let movie=await Movie.findOne({"_id":movieId});
    let copy=new Copy();
    if(number){
        copy._number=number;
    }
    if(format){
        copy._format=format;
    }
    if(status){
        copy._status=status;
    }
    if(movie){
        copy._movie=movie;
    }
    Copy.findOneAndUpdate({"_id":id},copy,{new:true}).then(obj=>res.status(200).json({
        message: "Copia modificado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al editar Copia",
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    Copy.remove({"_id":id}).then(obj=>res.status(200).json({
        message: "Copia eliminado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al eliminar Copia",
        error: e
    }))}
module.exports={getCopies,getCopy,create,replace,edit,destroy};