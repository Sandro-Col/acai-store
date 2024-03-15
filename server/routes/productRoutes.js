import express from "express";
import Product from "../models/Product.js";

const productRoutes = express.Router();

const getProducts = async (req, res) => {
  console.log("=== EXECUTING: getProducts === ");

  const page = parseInt(req.params.page); // 1, 2 or 3
  const perPage = parseInt(req.params.perPage); // 10

  console.log("Page: ", page);
  console.log("Per Page: ", perPage);

  const products = await Product.find({});

  if (page && perPage) {
    const totalPages = Math.ceil(products.length / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProducts = products.slice(startIndex, endIndex);
    res.json({
      products: paginatedProducts,
      pagination: { currentPage: page, totalPages },
    });
  } else {
    res.json({ products, pagination: {} });
  }

  console.log("=== FINISHED: getProducts === ");
};

const getProduct = async (req, res) => {
  console.log("=== EXECUTING: getProduct === ");
  console.log("id: ", req.params.id);

  const product = await Product.findById(req.params.id);

  if (product) {
    console.log("Product Found!");
    console.log("Product Name: ", product.name);
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }

  console.log("=== FINISHED: getProduct === ");
};

const getProductByBrand = async (req, res) => {
  const trackingLog = true;
  if (trackingLog) {
    console.log("=== getProductByBrand === ");
    console.log("Brand: ", req.params.brand);
  }

  const brand = req.params.brand;
  const regex = new RegExp(brand, "i"); // i for case insensitive

  if (trackingLog) { console.log(`Regex: ${regex}`);  }

  const product = await Product.find({ brand: { $regex: regex } });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
  console.log("=== FINISHED: getProductByBrand === ");
  console.log(" ");


};

// const getProductById = async (req, res) => {
// 	const product = await Product.findById(req.params.id);

// 	if (product) {
//         console.log('id: ', req.params.id);
//         console.log('Product Name: ', product.name);
// 		res.json(product);
// 	} else {
// 		res.status(404);
// 		throw new Error('Product not found');
// 	}
// };

// const searchProductByName = async (req, res) => {
//     const queryName = toString(req.params.name);
//     console.log('queryName: ', queryName);

//     if (queryName !== '') {
//         try {
//             const search_results = await Product.find({ name: req.params.name });
//             res.status(200).json(search_results);
//         } catch (error) {
//             console.log(error);
//             res.status(404).json({ message: `No product found with name ${req.params.name}.`})
//         }
// 		res.json(productName);
// 	} else {
// 		res.status(404);
// 		throw new Error('Product not found');
// 	}

// };

productRoutes.route("/search/:brand").get(getProductByBrand);
productRoutes.route("/:page/:perPage").get(getProducts);
productRoutes.route("/").get(getProducts);
productRoutes.route("/:id").get(getProduct);

export default productRoutes;
