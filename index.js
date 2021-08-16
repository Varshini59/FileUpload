const express = require("express");
const multer = require("multer");
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.redirect('/upload')
});

app.get("/upload", (req, res) => {
  res.render("form.ejs");
});

const upload = multer({
  dest: "uploads",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // console.log(typeof file.originalname)
    const fileName = file.originalname.split(".")[0];

    if (!file.originalname.endsWith(".pdf")) {
      return cb(new Error("Please upload a PDF"));
    }
    if (fileName.length !== 9) {
        return cb(new Error('Invalid Filename!'))
    }
    return cb(undefined, true);
  },
});

app.post("/",upload.single("upload"),(req, res) => {
    res.send("Your file has been uploaded successfully!");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.listen(PORT, () => {
  console.log("Server is running!");
});
