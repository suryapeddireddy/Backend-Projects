import Cart from "../models/cart.models.js";
import Product from '../models/product.models.js';

const ViewCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ owner: userId }).populate('Products.Product'); // Populate product details
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ message: "Cart found", cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const UpdateQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity = 1 } = req.body; // Default quantity to 1 if not provided

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ owner: userId });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new Cart({
                owner: userId,
                Products: [{ Product: productId, quantity }],
            });
            await cart.save();
            return res.status(201).json({ message: "Product added to new cart", cart });
        } else {
            // If the cart exists, check if the product is already in it
            const existingCartItem = cart.Products.find(item => item.Product.equals(productId));

            if (existingCartItem) {
                // If the product exists, update the quantity
                existingCartItem.quantity += quantity;
            } else {
                // If the product doesn't exist in the cart, add it
                cart.Products.push({ Product: productId, quantity });
            }
            await cart.save();
            return res.status(200).json({ message: "Product added to existing cart", cart });
        }

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Could not add product to cart", error: error.message });
    }
};

const EmptyCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ owner: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user" });
        }

        // Remove the entire cart document
        await Cart.deleteOne({ owner: userId });

        res.status(200).json({ message: "Cart emptied and removed successfully" });

    } catch (error) {
        console.error("Error emptying and removing cart:", error);
        res.status(500).json({ message: "Could not empty and remove cart", error: error.message });
    }
};

export { ViewCart, EmptyCart, UpdateQuantity };