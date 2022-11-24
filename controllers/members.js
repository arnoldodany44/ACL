const express=require("express");
const Member=require('../models/member');
function getMembers(req, res, next) {
    Member.find().then(obj=>res.status(200).json({
        message: "Lista de Members",
        obj: obj
    }))
    .catch(e =>res.status(500).json({
        message: "Error al buscar lista de Members",
        error: e
    }));}
function getMember(req, res, next) {
    const id=req.params.id;
    Member.findOne({"_id":id}).then(obj=>res.status(200).json({
      message: "Member encontrado",
      obj: obj
    }))
    .catch(e=>res.status(500).json({
      message: "Error al buscar Member",
      error: e
    }));
}
function create(req, res, next) {
  const name=req.body.name;
  const lastName=req.body.lastName;
  const phone=req.body.phone;
  let Address=new Object();
  Address.street=req.body.street;
  Address.number=req.body.number;
  Address.zip=req.body.zip;
  Address.state=req.body.state;
  let member=new Member({
    name:name,
    lastName:lastName,
    phone:phone,
    address:Address,
  });
  member.save().then(obj=>res.status(200).json({
    message: "Miembro creado",
    obj:obj
  })).catch(e=>res.status(400).json({
    message:"Error al crear miembro",
    error:e
  }));
}
function replace(req, res, next) {
    const id=req.params.id;
    let name=req.body.name ? req.body.name : "";
    const phone=req.body.phone ? req.body.phone :"";
    let Address=new Object();
    Address.street=req.body.street ? req.body.street :"";
    Address.number=req.body.number ? req.body.number :"";
    Address.zip=req.body.zip ? req.body.zip :"";
    Address.state=req.body.state ? req.body.state :"";
    let member=new Member({
        name:name,
        lastName:lastName,
        phone:phone,
        address:Address,
    });
    Member.findOneAndUpdate({"_id":id},member,{new:true}).then(obj=>res.status(200).json({
        message: "Miembro reemplazado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al reemplazar Miembro",
        error: e
    }));}
function edit(req, res, next) {
    const name=req.body.name;
    const lastName=req.body.lastName;
    const phone=req.body.phone;
    let Address=new Object();
    Address.street=req.body.street;
    Address.number=req.body.number;
    Address.zip=req.body.zip;
    Address.state=req.body.state;
    let member=new Member();
    if(name){
        member._name=name;
    }
    if(lastName){
        member._lastName=lastName;
    }
    if(phone){
        member._phone=phone;
    }
    if(Address){
        member._address=Address;
    }
    Member.findOneAndUpdate({"_id":id},member,{new:true}).then(obj=>res.status(200).json({
        message: "Miembro modificado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al editar Miembro",
        error: e
    }));}
function destroy(req, res, next) {
    const id=req.params.id;
    Member.remove({"_id":id}).then(obj=>res.status(200).json({
        message: "Miembro eliminado",
        obj: obj
    }))
    .catch(e=>res.status(500).json({
        message: "Error al eliminar miembro",
        error: e
    }))}
module.exports={getMembers,getMember,create,replace,edit,destroy};