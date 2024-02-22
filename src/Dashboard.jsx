import React, { useEffect } from "react";
let Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - eCommerce";
  });
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;