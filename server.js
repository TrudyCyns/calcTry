require('dotenv').config();
const { json } = require('express');
const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('calc', {
    title: 'Calculator',
  });
});

app.post('/', (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);
  const sign = req.body.sign;
  let result;

  if (sign === 'add') result = num1 + num2;

  res.render('calc', {
    title: 'Calculator',
    value1: num1,
    value2: num2,
    operator: sign,
    resValue: result,
  });
});

const server = app.listen(port, () => {
  console.log(` server started on port: ${port}`);
});
