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
        const { ItemId } = req.params;
        const userId = req.user._id; // Assuming you have user authentication and req.user is populated
        const { oprn } = req.params; // Either '+' or '-'

        const product = await Product.findById(ItemId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const cart = await Cart.findOne({ owner: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user" });
        }

        const cartItemIndex = cart.Products.findIndex(item => item.Product.equals(ItemId));

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        let newQuantity = cart.Products[cartItemIndex].quantity;

        if (oprn === '+') {
            newQuantity++;
        } else if (oprn === '-') {
            newQuantity--;
            if (newQuantity < 1) {
                // Optionally remove the item from the cart if quantity becomes less than 1
                cart.Products.splice(cartItemIndex, 1);
                await cart.save();
                return res.status(200).json({ message: "Product removed from cart as quantity reached zero", cart });
            }
        } else {
            return res.status(400).json({ message: "Invalid operation. Use '+' for increment or '-' for decrement" });
        }

        cart.Products[cartItemIndex].quantity = newQuantity;
        await cart.save();

        res.status(200).json({ message: "Cart quantity updated successfully", cart });

    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({ message: "Could not update cart quantity" });
    }
};

const EmptyCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ owner: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.Products = [];
        await cart.save();
        return res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { ViewCart, EmptyCart, UpdateQuantity };