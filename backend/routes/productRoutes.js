import express from "express";
import {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductByID)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

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
