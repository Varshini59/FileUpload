const app = require('./index')
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')

const DB = 'mongodb+srv://Varsh59:varsh@mongocluster@cluster0.jw5x1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
});
  console.log('DB Connected!') }

connectDB()

app.listen(PORT, () => {
    console.log('Server is up listening on port '+PORT)
})
