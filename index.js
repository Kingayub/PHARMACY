const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(require('./routes'))
mongoose.connect("mongodb+srv://Ayub:Salavdi1994@cluster0.qdi4tkn.mongodb.net/pharmacy?retryWrites=true&w=majority")


app.listen(PORT, () => {
    console.log(`PORT ${PORT} get started success`)
})