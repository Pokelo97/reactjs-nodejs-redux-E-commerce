const express =require('express');
const app = express();

const routes = require('./routes/routes');
//env
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(PORT,() => console.log('Server is running'));