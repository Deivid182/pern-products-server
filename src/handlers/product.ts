import { Request, Response } from "express"
import colors from "colors";
import Product from "../models/Product.model"
export const createProduct = async (req: Request, res: Response) => {

  try {
    const { name, price, available } = req.body;
    const product = await Product.create({ name, price, available });
    return res.status(201).json({ data: product });
    
  } catch (error) {
    console.log(colors.red(error as string));
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["price", "ASC"]],
    });
    return res.status(200).json({ data: products });
  } catch (error) {
    console.log(colors.red(error as string));
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    return res.status(200).json({ data: product });
  } catch (error) {
    console.log(colors.red(error as string));
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const { name, price, available } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await product.update({ name, price, available });
    await product.save();
    res.status(200).json({ data: product });
  } catch (error) {
    console.log(colors.red(error as string));
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(colors.red(error as string));
    return res.status(500).json({ msg: "Something went wrong" });
  }
}