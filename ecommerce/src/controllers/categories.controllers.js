import Category from '../models/category.models.js'

// CREATE CATEGORY
const CreateCategory = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = new Category({ name });
    await category.save();

    return res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create category", error: error.message });
  }
};

// DELETE CATEGORY
const DeleteCategory = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { CategoryId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(CategoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
};

// GET CATEGORY BY ID
const GetCategoryById = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { CategoryId } = req.params;
    const category = await Category.findById(CategoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category retrieved", category });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get category", error: error.message });
  }
};

export { GetCategoryById, DeleteCategory, CreateCategory };
