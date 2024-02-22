import React from "react";

const Order = (props) => {
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
            <td style={{ witdh: "100px" }}>Quantity: </td>
            <td>{props.quantity}</td>
          </tr>
          <tr>
            <td style={{ witdh: "100px" }}>Price: </td>
            <td>${props.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Order;
