const appModule = require('./app');
const app = appModule.app;
const PORT = appModule.PORT;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin228@cluster0.izfij.mongodb.net/googleIdApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.listen(PORT, () => {
  console.log('Server works');
})