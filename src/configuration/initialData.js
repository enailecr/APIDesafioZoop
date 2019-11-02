const axios = require('axios');
const { API_RESTCOUNTRIES } = process.env;

const Paises = require('../models/Paises');

async function insertInitialData() {
    try {
        const paisesBD = await Paises.find({});
        if (paisesBD.length === 0) {
            const paises = await axios.get(API_RESTCOUNTRIES); 
            if (paises.data) {
                const inseridos = await Paises.insertMany(paises.data);
                return (`Inseridos ${inseridos.length} registros`);
            } 
            return ('API Rest Countries não retornou nenhum país');
        }
        return ('Banco de dados devidamente populado');
    } catch (err) {
        console.error('ERROR <insertInitialData>', err)
        return ('Não foi possível inserir os dados da API Rest Countries');
    }
}

module.exports = {
    insertInitialData,
}