const express = require("express")
const { default: mongoose } = require("mongoose")
const multer  = require('multer')
const { ImageModel } = require("./models/image")

PORT = 8000

const app = express()
app.use(express.json())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname)
  }
})

const upload = multer({ storage: storage })


// To store Image To Database
app.post("/single",upload.single("image"),async(req,res)=>{
  try {
    const {path ,filename} =req.file
    const image = await ImageModel({path,filename})
    await image.save()
    res.json({message: "Image Uploaded"})
  }catch(error){
    res.json("erroe", "Unable to upload image")
  }
})

app.listen(PORT, async()=>{
  try {
    await mongoose.connect("mongodb+srv://masterweapon2302:root@cluster0.rbjn4m2.mongodb.net/FileSystem?retryWrites=true&w=majority&appName=Cluster0")

    console.log("DataBase is connected");
    console.log(`App is running on port: ${PORT}`);
  } catch (error) {
    console.log("Error in connection DB");
  }
})
