import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

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

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    const normalizedPath = req.file.path.replace(/\\/g, "/");

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${normalizedPath}`,
    });
  });
});

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
