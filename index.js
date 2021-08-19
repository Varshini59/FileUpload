const express = require("express");
const multer = require("multer");
const File = require("./model/fileSchema");
const bodyParser = require("body-parser");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

let ext;

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
     ext = file.mimetype.split("/")[1];
    cb(null, `files/${file.originalname}`);
  },
});

let fn;

const multerFilter = (req, file, cb) => {
  fn = file.originalname.split(".")[0];
  if (file.mimetype.split("/")[1] !== "pdf")
    return cb(new Error('Please upload a PDF document'));
   
  if (fn.length !== 9) 
      return cb(new Error('Invalid filename!'))
    
    cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter:multerFilter
});

app.get('/',(req,res) => {
  res.redirect('/upload')
})

app.get('/upload',(req,res) => {
  res.render('form')
})
 
app.post("/upload", upload.single("upload"), (req, res) => {
  File.create({ name: fn+'.'+ext }, (err, newfile) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Your file has been uploaded successfully!");
    }
  })
  
}, (error,req,res,next) => {
      res.status(400).send({error:error.message})
});

app.get('/getFiles',(req,res) => {
  File.find({},(err,files) => {
     if(err)
       res.send(err);
     else{
       console.log(files);
       res.render('files',{files:files})
     }
  })
})

app.get('/:id/download', (req,res) => {
  const file=`${__dirname}/public/files/${req.params.id}`
  res.download(file)
})


module.exports = app;
