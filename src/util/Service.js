export const OrdersService = {
  getPreviousOrders: (order) => {
    return order.filter((ord) => ord.isPaymentCompleted === true);
  },
  getCart: (order) => {
    return order.filter((ord) => ord.isPaymentCompleted === false);
  },
};
export const ProductService = {
  getProuctByProductId: (products, productId) => {
    
    return products.find((prod) => {
        return prod.id === productId
    } );
  },
  fetchProduct: () => {
    return fetch("http://localhost:5000/products", { method: "GET" });
  },
};
