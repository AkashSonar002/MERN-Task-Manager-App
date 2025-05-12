const express = require('express')
const app = express()
require('dotenv').config();
require('./Models/db')
const TaskRouter = require('./Routes/TaskRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5001;

app.get('/', (req,res)=>{
    res.send("Hello From The server")
})

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', TaskRouter)

app.listen(PORT, () => {
    console.log(`Server is running on Port=${PORT}`);
});