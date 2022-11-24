  const express=require("express")
  function getUsers(req, res, next) {
    res.send('Lista de usuarios');
  }
  function getUser(req, res, next) {
    const id=req.params.id;
    res.send('Un solo usuario con id: '+id);
  }
  function create(req, res, next) {
    const name=req.body.name;
    const lastName=req.body.lastName;
    res.send('Crea un solo usuario con nombre: '+name+' y apellido: '+lastName);
  }
  function replace(req, res, next) {
    res.send('Remplaza solo usuario');
  }
  function edit(req, res, next) {
    res.send('Edita solo usuario');
  }
  function destroy(req, res, next) {
    res.send('Elimina solo usuario');
  }
  module.exports={getUsers,getUser,create,replace,edit,destroy};