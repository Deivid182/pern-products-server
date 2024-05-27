import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "./handlers/product";
import { validateData } from "./middleware/validate-data";

const router = Router();

router.get("/", getProducts);

router.post("/",
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty().withMessage("Price is required")
    .isNumeric().withMessage("Price must be a number")
    .custom((value) => value > 0).withMessage("Price must be greater than 0"),
  validateData,
  createProduct)

router.get("/:id", param("id").isNumeric().withMessage("Id must be a number"), validateData, getProduct)

router.patch("/:id",
  param("id")
    .isNumeric().withMessage("Id must be a number"),
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("available").optional().isBoolean().withMessage("Available must be a boolean"),
  validateData, updateProduct)

router.delete("/:id", param("id").isNumeric().withMessage("Id must be a number"), validateData, deleteProduct)

export { router };