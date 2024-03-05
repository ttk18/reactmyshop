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
    return products.find((prod) => prod.id === productId.toString());
  },
  fetchProduct: () => {
    return fetch("http://localhost:5005/products", { method: "GET" });
  },
};

export const BrandsService = {
  fetchBrands: () => {
    return fetch("http://localhost:5005/brands", {method: "GET"}); 
  },
  getBrandsByBrandId: (brands, brandId) => {
    return brands.find((brand) => brand.id === brandId)
  }
}

export const CategoriesService = {
  fetchCategories: () => {
    return fetch("http://localhost:5005/categories", {method: "GET"}); 
  },
  getCategoriesByBrandId: (categories, categoryId) => {
    return categories.find((cate) => cate.id === categoryId)
  }
}
