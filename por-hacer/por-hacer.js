const fs = require('fs');

let listadoPorHacer = [];

const guardaDB = () => {

    let data = JSON.stringify(listadoPorHacer);
    // return new Promise((resolve, reject) => {
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err)
            throw new Error('No se pudo guardar', err);
        //     reject(err);
        // else
        //     resolve(`El archivo data.json ha sido creado!`);
    });
    // });

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (e) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porhacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porhacer);

    guardaDB();

    return porhacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardaDB();
        return true;
    } else
        return false
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoPorHacer.length === nuevoListado.length)
        return false;
    else {
        listadoPorHacer = nuevoListado;
        guardaDB();
        return true
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}