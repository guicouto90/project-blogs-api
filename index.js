const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const loginsRouter = require('./router/loginsRouter');
const usersRouter = require('./router/usersRouter');

const app = express();

app.use(express.json());

app.use('/user', usersRouter);

app.use('/login', loginsRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorHandler);
