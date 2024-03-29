import React, { useContext, useEffect, useState } from "react";
import {
  BrandsService,
  CategoriesService,
  ProductService,
} from "./util/Service";
import { UserContext } from "./UserContext";
import Product from "./Product";

let Store = () => {
  let userContext = useContext(UserContext);
  let [brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsReponseBody = await brandsResponse.json();
      brandsReponseBody.forEach((brand) => {
        brand.isChecked = true;
      });
      setBrands(brandsReponseBody);

      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();
      categoriesResponseBody.forEach((category) => {
        category.isChecked = true;
      });
      setCategories(categoriesResponseBody);

      // get product from db
      let productsReponse = await ProductService.fetchProduct();
      let productsReponseBody = await productsReponse.json();
      if (productsReponseBody.ok) {
        productsReponseBody.forEach((prod) => {
          prod.brand = BrandsService.getBrandsByBrandId(
            brandsReponseBody,
            prod.brandId
          );
          prod.category = CategoriesService.getCategoriesByBrandId(
            categoriesResponseBody,
            prod.categoryId
          );
          prod.isOrdered = false;
        });
        console.log(productsReponseBody)
        setProducts(productsReponseBody);
        document.title = "Store - eCommerce";
      }
    })();
  }, []);
  let updateBrandIsCheck = (id) => {
    let brandData = brands.map((brand) => {
      if (brand.id === id) {
        brand.isChecked = !brand.isChecked;
      }
      return brand;
    });
    setBrands(brandData);
  };
  let updateCategoriesIsCheck = (id) => {
    let categoriesData = categories.map((cate) => {
      if (cate.id === id) {
        cate.isChecked = !cate.isChecked;
      }
      return cate;
    });
    setCategories(categoriesData);
  };
  return (
    <div className="container-fluid">
      <div className="row py-3 header">
        <div className="col-lg-3">
          <h4>
            <i className="fa fa-shopping-bag"></i> Store
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 py-2">
          <div className="my-2">
            <h5>Brands</h5>
            <ul className="list-group list-group-flush">
              {brands.map((brand) => {
                return (
                  <li className="list-group-item" key={brand.id}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value="true"
                        checked={brand.isChecked}
                        onChange={() => {
                          updateBrandIsCheck(brand.id);
                        }}
                      />
                      <label htmlFor="" className="form-check-label">
                        {brand.brandName}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="my-2">
            <h5>Categories</h5>
            <ul className="list-group list-group-flush">
              {categories.map((category) => {
                return (
                  <li className="list-group-item" key={category.id}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value="true"
                        checked={category.isChecked}
                        onChange={() => {
                          updateCategoriesIsCheck(category.id);
                        }}
                      />
                      <label htmlFor="" className="form-check-label">
                        {category.categoryName}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-lg-9 py-2">
          <div className="row">
            {products.map((prod) => {
              return <Product key={prod.id} product={prod} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Store;
