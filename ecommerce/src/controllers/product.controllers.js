import Product from "../models/product.models.js";
import Category from "../models/category.models.js";
import { UploadImagetoCloudinary, destroyImages } from "../utils/cloudinary.js";
const getProducts = async (req, res) => {
  try {
    const { selectedcategories } = req.body;
    let {
      mindiscount,
      minprice,
      maxprice,
      keyword,
      minrating,
      limit,
      page,
      sort,
      brands,
    } = req.params;

    // Convert to numbers
    mindiscount = Number(mindiscount);
    minprice = Number(minprice);
    maxprice = Number(maxprice);
    minrating = Number(minrating);
    limit = Number(limit);
    page = Number(page);

    // Build query object
    let query = {};

    // Categories filter
    if (selectedcategories && selectedcategories.length > 0) {
      query.categories = { $all: selectedcategories };
    }

    // Keyword search
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Price, discount, rating
    query.price = { $gte: minprice, $lte: maxprice };
    query.discount = { $gte: mindiscount }; // Make sure discount exists in Product schema
    query.rating = { $gte: minrating };
    if (brands.length) {
      query.brand = { $in: brands };
      // brands is an array,
    }
    // Pagination
    const skip = (page - 1) * limit;

    // Sorting
    const sortOption = {};
    if (sort) sortOption[sort] = 1;

    const Products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOption);

    return res
      .status(200)
      .json({ message: "Successfully fetched products", Products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

const getProductbyId = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    return res.status(200).json({ message: "Found product", product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "forbidden" });
    }
    let images = [];
    const { title, description, price, stock, discount, categories, brand } =
      req.body;
    if (!req.files) {
      return res.status(401).json({ message: "Provide filepaths" });
    }
    if (!title || !description || !price || !stock || !categories || !brand) {
      return res.status(400).json({ message: "provide all fields" });
    }
    for (const file of req.files) {
      const folderpath = `ecommerce/products/${title}`;
      const public_id = `${title}`;
      const filepath = file.path;
      const secure_url = await UploadImagetoCloudinary(
        filepath,
        public_id,
        folderpath
      );
      images.push(secure_url);
    }
    const product = new Product({
      title,
      description,
      price,
      stock,
      discount,
      categories,
      images,
      brand,
    });
    await Product.save();
    return res
      .status(201)
      .json({ message: "Added product successfully", Product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "forbidden" });
    }
    const { productId } = req.params;
    const isdeleted = await Product.findByIdAndDelete(productId);
    if (isdeleted) return res.status(200).json({ message: "product deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "forbidden" });
    }
    const {
      title,
      description,
      price,
      discount,
      categories,
      productId,
      brand,
    } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "product not found" });
    const images = [];
    const deleteimages = await destroyImages(`ecommerce/products`);
    for (const file of req.files) {
      const folderPath = `ecommerce/products/${title}`;
      const filepath = file.path;
      const public_id = `${title}`;
      const secure_url = await UploadImagetoCloudinary(
        filepath,
        public_id,
        folderPath
      );
      images.push(secure_url);
    }
    if (images.length) {
      product.images = images;
    }
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (discount) product.discount = discount;
    if (categories) product.categories = categories;
    if (brand) {
      product.brand = brand;
    }
    await product.save();
    return res.status(200).json({ message: "product successfully updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export {
  getProducts,
  getProductbyId,
  addProduct,
  deleteProduct,
  updateProduct,
};
