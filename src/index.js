const app = require('./app');

app.listen(app.get('port'),() => {
  console.log('We are connected!')
});
