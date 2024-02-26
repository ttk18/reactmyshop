import React, { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";
import { OrdersService, ProductService } from "./util/Service";
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
  let loadDataFromDatabase = useCallback(
    async () => {
      let response_order = await fetch(
        `http://localhost:5000/orders?userId=${_userContent.user.currentUserId}`,
        { method: "GET" }
      );
      if (response_order.ok) {
        let response_orderBody = await response_order.json();

        let response_product = await ProductService.fetchProduct();

        if (response_product.ok) {
          let response_productBody = await response_product.json();
          response_orderBody.forEach((order) => {
            order.product = ProductService.getProuctByProductId(
              response_productBody,
              order.productId
            );
          });
          setOrders(response_orderBody);
        }
      }
    }, [_userContent.user.currentUserId]
  );
  useEffect(() => {
    loadDataFromDatabase();
  }, [_userContent.user.currentUserId, loadDataFromDatabase]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 py-3" style={header}>
          <h4>
            <i className="fa fa-dashboard"></i> Dashboard {" "}
            <button className="btn btn-sm btn-info" onClick={loadDataFromDatabase}>
              <i className="fa fa-refresh"></i> Refresh
            </button>
          </h4>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-lg-6">
              <h4 className="py-2 my-2 text-info border-bottom border-info">
                <i className="fa fa-history"></i> Previous Orders{" "}
                <span className="badge badge-info text-light text-bg-info">
                  {OrdersService.getPreviousOrders(orders).length}
                </span>
              </h4>
              {OrdersService.getPreviousOrders(orders).length === 0 ? (
                <div className="text-danger">No orders</div>
              ) : (
                ""
              )}
              {OrdersService.getPreviousOrders(orders).map((order) => {
                return (
                  <Order
                    key={order.id}
                    productId={order.productId}
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
                  {OrdersService.getCart(orders).length}
                </span>
              </h4>
              {OrdersService.getCart(orders).length === 0 ? (
                <div className="text-danger">No orders</div>
              ) : (
                ""
              )}
              {OrdersService.getCart(orders).map((order) => {
                return (
                  <Order
                    key={order.id}
                    productId={order.productId}
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
