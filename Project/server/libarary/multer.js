const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    console.log(ext);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
// const multer = require('multer');
// //multer.diskStorage() creates a storage space for storing files.
// const storage = multerr.diskStorage({
//   destination:function(req,file,cb){
//     if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
//       cb(null,'./files/images/');
//     }else{
//       cb({message:'this file is neither a video or image file'},false)
//     }
//   },
//   filename:function(req,file,cb){
//     cb(null,file.originalname);
//   }
// })
// const upload = multer({storage:storage});
module.exports = upload;