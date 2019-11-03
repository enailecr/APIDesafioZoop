const Paises = require('../models/Paises')

async function getByName(req, res) {
    const { params: { nome } } = req;
    const name = new RegExp(nome, 'ig');
    try {
        const pais = await Paises.findOne({ name });
        if (!pais) {
            return res.status(404).send('País não encontrado');
        }
        return res.status(200).json(pais);
    } catch (err) {
        console.error('ERROR <getByName>', err);
        return res.status(500).send();
    }
}
 
async function getAll(req, res) {
    try {
        const paises = await Paises.find({});
        return res.status(200).json(paises);
    } catch (err) {
        console.error('ERROR <getAll>', err);
        return res.status(500).send();
    }
}

async function insertCountry(req, res) {
    const { body } = req;
    try {
        const pais = await Paises.create(body);
        return res.status(200).json(pais);
    } catch (err) {
        console.error('ERROR <insertCountry>', err);
        return res.status(500).send();
    }
}

async function deleteByName(req, res) {
    const { params: { nome } } = req;
    const name = new RegExp(nome, 'ig');
    try {
        const pais = await Paises.findOneAndRemove({ name });
        if (!pais) {
            return res.status(404).send('País não encontrado');
        }
        return res.status(200).json(pais);
    } catch (err) {
        console.error('ERROR <getByName>', err);
        return res.status(500).send();
    }
}

module.exports = {
    getByName,
    getAll,
    insertCountry,
    deleteByName,
}