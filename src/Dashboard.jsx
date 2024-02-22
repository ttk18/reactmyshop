import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";
let Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - eCommerce";
  });
  const header = {
    backgroundColor: "#e6e6ee",
    position: "sticky",
    top: "0",
  };
  let [orders, setOrders] = useState([]);
  let _userContent = useContext(UserContext);
  useEffect(() => {
    (async () => {
      let response_order = await fetch(
        `http://localhost:5000/orders?userId=${_userContent.user.currentUserId}`,
        { method: "GET" }
      );
      if (response_order.ok) {
        let response_orderBody = await response_order.json();
        let response_product = await fetch("http://localhost:5000/products", {
          method: "GET",
        });
        if (response_product.ok) {
          let response_productBody = await response_product.json();
          response_orderBody.forEach((order) => {
            order.product = response_productBody.find(
              (prod) => prod.id === order.id
            );
          });
          setOrders(response_orderBody);
        }
      }
    })();
  }, [_userContent.user.currentUserId]);

  let getPreviousOrders = (order) => {
    return orders.filter((ord) => ord.isPaymentCompleted === true);
  };
  let getCart = (orders) => {
    return orders.filter((ord) => ord.isPaymentCompleted === false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 py-3" style={header}>
          <h4>
            <i className="fa fa-dashboard"></i> Dashboard
          </h4>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-lg-6">
              <h4 className="py-2 my-2 text-info border-bottom border-info">
                <i className="fa fa-history"></i> Previous Orders{" "}
                <span className="badge badge-info text-light text-bg-info">
                  {getPreviousOrders(orders).length}
                </span>
              </h4>
              {getPreviousOrders(orders).length == 0 ? (
                <div className="text-danger">No orders</div>
              ) : (
                ""
              )}
              {getPreviousOrders(orders).map((order) => {
                return (
                  <Order
                    key={order.id}
                    productId={order.producId}
                    orderId={order.id}
                    userId={order.userId}
                    isPaymentCompleted={order.isPaymentCompleted}
                    quantity={order.quantity}
                    productName={order.product.productName}
                    price={order.product.price}
                  />
                );
              })}
            </div>
            <div className="col-lg-6">
              <h4 className="py-2 my-2 text-primary border-bottom border-primary">
                <i className="fa fa-shopping-cart"></i> Cart{" "}
                <span className="badge badge-primary text-light text-bg-primary">
                  {getCart(orders).length}
                </span>
              </h4>
              {getCart(orders).length == 0 ? (
                <div className="text-danger">No orders</div>
              ) : (
                ""
              )}
              {getCart(orders).map((order) => {
                return (
                  <Order
                    key={order.id}
                    productId={order.producId}
                    orderId={order.id}
                    userId={order.userId}
                    isPaymentCompleted={order.isPaymentCompleted}
                    quantity={order.quantity}
                    productName={order.product.productName}
                    price={order.product.price}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
