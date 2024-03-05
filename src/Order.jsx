import React from "react";

const Order = (props) => {
  console.log("rendered order", props);
  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        <h6>
          <i className="fa fa-arrow-right"></i> {props.productName}
          {props.isPaymentCompleted === false ? (
            <div className="float-end">
              <button
                className="btn btn-sm btn-info mr-2"
                onClick={() => {
                  return props.onBuyNowClick(
                    props.orderId,
                    props.userId,
                    props.productId,
                    props.quantity
                  );
                }}
              >
                <i className="fa fa-truck"></i> Buy Now
              </button>
              <button
                className="btn btn-sm btn-danger mr-2"
                onClick={() => {
                  props.onDeleteClick(props.orderId);
                }}
              >
                <i className="fa fa-frash-o"></i> Delete
              </button>
            </div>
          ) : (
            ""
          )}
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
