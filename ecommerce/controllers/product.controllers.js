import Product from "../models/product.models.js";

const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      minprice,
      maxprice,
      stock,
      Category,
      Subcategory,
      rating,
      sort,
      page = 1,
      limit = 10,
    } = req.query;
    let query = {};
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
    if (minprice) query.price.$gte(minprice);
    if (!minprice) query.price.$gte(0);
    if (maxprice) query.price.$lte(maxprice);
    if (!maxprice) query.price.$lte(10000000);
    if (stock) query.stock({ $gt: 0 });
    query.Category = Category;
    query.Subcategory = Subcategory;
    query.rating = rating;
    let sortoption = {};
    sortoption[sort] = 1;
    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query)
      .sort(sortoption)
      .skip(skip)
      .limit(Number(limit));
    const totalproducts = await Product.countDocuments(query);
    return res.status(200).json({
      products,
      totalproducts,
      currentPage: Number(page),
      totalpages: Math.ceil(totalproducts / limit),
    });
  } catch (error) {
    return res.status(500).json({ message: "error in getting products" });
  }
};


export default {getProducts};