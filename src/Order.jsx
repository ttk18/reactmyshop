import React from "react";

const Order = (props) => {
  console.log("rendered order", props);
  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        <h6>
          <i className="fa fa-arrow-right"></i> {props.productName}
        </h6>
      </div>

      <table className="table table-sm table-borderless mt-1">
        <tbody>
          <tr>
            <td style={{ width: "100px" }}>Quantity: </td>
            <td>{props.quantity}</td>
          </tr>
          <tr>
            <td style={{ width: "100px" }}>Price: </td>
            <td>${props.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
// export default Order;

export default React.memo(Order);
