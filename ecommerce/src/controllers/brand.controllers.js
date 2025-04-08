import Brand from '../models/brand.models.js'

// Create a brand
const AddBrand = async (req, res) => {
  try {
    if (req.user?.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name } = req.body;

    // Optional: check if brand already exists
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    const brand = new Brand({ name });
    await brand.save();

    return res.status(201).json({ message: "Brand created successfully", brand });
  } catch (error) {
    return res.status(500).json({ message: "Error creating brand", error: error.message });
  }
};

// Delete a brand
const DeleteBrand = async (req, res) => {
  try {
    if (req.user?.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { brandId } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting brand", error: error.message });
  }
};

// Get a brand by ID
const GetBrandById = async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    return res.status(200).json({ message: "Brand found", brand });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching brand", error: error.message });
  }
};

export  { AddBrand, DeleteBrand, GetBrandById };
