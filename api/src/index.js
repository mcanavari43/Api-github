const express = require('express')
const cors = require('cors')


const router = require('./router/routes');
const app = express();
app.use(cors());

app.use('/',router);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    res.status(status).send(message);
  });

app.listen(process.env.PORT, () => console.log(
    'Server listen on port 4000'
))