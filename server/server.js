const appModule = require('./app');
const app = appModule.app;
const PORT = appModule.PORT;

app.listen(PORT, () => {
  console.log('Server works');
})