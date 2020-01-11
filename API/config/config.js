module.exports = function ConnectMongoDB() {
    const mongoose = require('mongoose');
    mongoose
        .connect('mongodb://gayme:0108444641g@ds021026.mlab.com:21026/twitter', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        .then(() => console.log('DB Connected!'))
        .catch(err => {
            console.log("DB Connection Error: ${ err.message }");
        });
}
