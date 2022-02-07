const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const categoriesRouter = require('./router/categoriesRouter');
const loginsRouter = require('./router/loginsRouter');
const postsRouter = require('./router/postsRouter');
const usersRouter = require('./router/usersRouter');

const app = express();

app.use(express.json());

app.use('/user', usersRouter);

app.use('/login', loginsRouter);

app.use('/categories', categoriesRouter);

app.use('/post', postsRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorHandler);
