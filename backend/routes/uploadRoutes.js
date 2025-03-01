import path from "path";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js"; // Cloudinary config

const router = express.Router();

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    format: async (req, file) => "jpeg", // Format (e.g., jpeg, png)
    public_id: (req, file) =>
      `${file.fieldname}-${file.originalname}-${Date.now()}`, // Custom file name
    transformation: [{ width: 640, height: 510, crop: "scale" }], // Resize directly on Cloudinary
  },
});

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     fs.mkdirSync("./uploads", { recursive: true }); // Ensure the directory exists

//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // .test() returns true or false
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false); // Error will be passed to the
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    console.log(req);
    res.status(200).send({
      message: "Image uploaded successfully",
      image: req.file.path,
    });
  });
});

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // .test() returns true or false
//   const mimetype = filetypes.test(file.mimetype);
//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only!"), false);
//   }
// }

// router.post("/", (req, res, next) => {
//   upload.single("image")(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       // Handle Multer-specific errors
//       return next(new Error(`Multer error: ${err.message}`));
//     } else if (err) {
//       // Handle other errors
//       return next(err);
//     }

//     // Check if a file was uploaded
//     if (!req.file) {
//       return next(new Error("No file uploaded"));
//     }

//     // Successful upload
//     res.send({
//       message: "Image uploaded successfully",
//       image: `/${req.file.path}`,
//     });
//   });
// });

export default router;
