import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, updateAvailability } from "./handlers/product";
import { validateData } from "./middleware/validate-data";

const router = Router();

/** 
* 
* @swagger
* components:
*   schemas:
*     Product:
*       type: object
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the product
*           example: 1
*         name:
*           type: string
*           description: The product name
*           example: Mouse Gamer
*         price:
*           type: number
*           description: The product price
*           example: 300
*         available:
*           type: boolean
*           description: The availability of the product
*           example: true
* 
*/

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    tags: 
 *      - Products
 *    description: Return a list of all products
 *    responses:
 *      200:
 *        description: A list of products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 * 
 * 
 * 
 */

router.get("/", getProducts);


/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a product
 *    tags:
 *      - Products
 *    description: Create a new product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Mouse
 *              price:
 *                type: number
 *                example: 300
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request
 *                    
 * 
 * 
*/
router.post("/",
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty().withMessage("Price is required")
    .isNumeric().withMessage("Price must be a number")
    .custom((value) => value > 0).withMessage("Price must be greater than 0"),
  validateData,
  createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product
 *    tags: 
 *      - Products
 *    description: Return a product by id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The product id
 *    responses:
 *      200:
 *        description: A product
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: Product not found
 * 
 */

router.get("/:id", param("id").isNumeric().withMessage("Id must be a number"), validateData, getProduct)


/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update a product
 *    tags: 
 *      - Products
 *    description: Update a product
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Mouse
 *              price:
 *                type: number
 *                example: 300
 *              available:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Updated
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: Product not found
 * 
 */

router.put("/:id",
  param("id")
    .isNumeric().withMessage("Id must be a number"),
  body("name").optional().isString().withMessage("Name must be a string").notEmpty().withMessage("Name is required"),
  body("price").optional().notEmpty().withMessage("Prie is required").isNumeric().withMessage("Price must be a number"),
  body("available").optional().notEmpty().withMessage("Available is required").isBoolean().withMessage("Available must be a boolean"),
  validateData, updateProduct)


/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags: 
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.patch('/:id', 
  param('id').isInt().withMessage('ID no válido'),
  validateData,
  updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product
 *    tags: 
 *      - Products
 *    description: Delete a product
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The product id
 *    responses:
 *      200:
 *        description: Deleted
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                msg:
 *                  type: string
 *                  example: Product deleted
 *      400:
 *        description: Bad request
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: Product not found
 * 
 */

router.delete("/:id", param("id").isNumeric().withMessage("Id must be a number"), validateData, deleteProduct)

export { router };