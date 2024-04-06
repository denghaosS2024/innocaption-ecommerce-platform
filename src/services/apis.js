import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export const fetchProducts = () => axios.get(`${API_BASE_URL}/products`);

export const addCart = async (cartItems) => {
    const userId = 1;
    const products = cartItems.map(item => ({ id: item.id, quantity: item.quantity }));

    try {
      const response = await axios.post(`${API_BASE_URL}/carts`, { userId, products });
      console.log('Cart added:', response.data);
    } catch (error) {
      console.error('Error adding cart:', error);
    }
};

export const fetchCartItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/carts/1`);
        return response.data.products.map(item => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            thumbnail: item.thumbnail
        }));
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
};

export const updateCartItems = async (items) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/carts/1`, {
            merge: true,
            products: items.map(({id, quantity}) => ({id, quantity}))
        });
        console.log('Cart updated:', response.data);
    } catch (error) {
        console.error('Error updating cart:', error);
    }
};
