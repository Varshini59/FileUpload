const app = require('./index')
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')

const DB = process.env.MONGODB_URI

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
