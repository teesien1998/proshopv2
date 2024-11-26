import express from "express";
import {
  getProducts,
  getProductByID,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductByID);

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     if (products) {
//       return res.status(200).json(products);
//     }
//   })
// );

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       return res.status(200).json(product);
//     } else {
//       res.status(400);
//       throw new Error("Resource not found");
//     }
//   })
// );

export default router;
