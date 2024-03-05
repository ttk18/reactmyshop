import React, { useState } from "react";
const Product = (props) => {
  let [prod] = useState(props.product);
  return (
    <div className="col-lg-6">
      <div className="card m-1">
        <div className="card-body">
          <h5>
            <i className="fa fa-arrow-right"></i> {prod.productName}
          </h5>
          <div>$ {prod.price.toFixed(2)}</div>
        </div>
        <div className="mt-2 text-muted">
          #{prod.band.brandName}#{prod.category.categoryName}
        </div>
        <div>
          {[...Array(prod.rating).key()].map((n) => {
            return <i className="fa fa-star text-warning" key={n}></i>;
          })}

          {[...Array(5-prod.rating).key()].map((n) => {
            return <i className="fa fa-star-o text-warning" key={n}></i>;
          })}
        </div>
      </div>
    </div>
  );
};
export default Product;
