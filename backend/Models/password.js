const mongoose = require("mongoose");
console.log(process.env.MONO_URL);

async function connectMongoose(){
    await mongoose.connect(process.env.MONO_URL);
}
connectMongoose();
const passSchema = new mongoose.Schema({
    url: String,
    username: String,
    password: String,
});

const passwordStore = mongoose.model('PasswordStore', passSchema);
module.exports.passwordStore=passwordStore;
