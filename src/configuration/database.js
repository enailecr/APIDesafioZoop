const mongoose = require('mongoose');
const initialData = require('./initialData');

const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on('connected', async () => {
    console.log(`MongoDB connected at ${uri}`);
    try {
        const promise = await initialData.insertInitialData();
        console.log(promise);
    } catch (err) {
        console.error('ERROR <insertInitialData>', err);
    }
});
mongoose.connection.on('disconnected', () => console.log(`MongoDB disconnected at ${uri}`));
mongoose.connection.on('error', (error) => console.error('ERROR CONNECTION MONGODB', error));

module.exports = mongoose;