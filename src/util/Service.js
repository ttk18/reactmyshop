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
    return products.find((prod) => prod.id === productId);
  },
  fetchProduct: () => {
    return fetch("http://localhost:5000/products", { method: "GET" });
  },
};

export const BrandsService = {
  fetchBrands: () => {
    return fetch("http://localhost:5000/brands", {method: "GET"}); 
  }
}

export const CategoriesService = {
  fetchCategories: () => {
    return fetch("http://localhost:5000/categories", {method: "GET"}); 
  }
}
