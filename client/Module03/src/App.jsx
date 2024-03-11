import React, { useState } from "react";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import ProductsAdmin from "./pages/admin/products/ProductsAdmin";
import BillsAdmin from "./pages/admin/bills/BillsAdmin";
import UsersAdmin from "./pages/admin/users/UsersAdmin";
import CategoryAdmin from "./pages/admin/category/CategoryAdmin";
import Home from "./home/Home";
import Cart from "./pages/cart/Cart";
import Bill from "./pages/bills/Bill";


export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <Header /> <Outlet /> <Footer />
            </>
          }
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/bill" element={<Bill />}></Route>
        </Route>

        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/productsAdmin" element={<ProductsAdmin />}></Route>
        <Route path="/usersAdmin" element={<UsersAdmin />}></Route>
        <Route path="/billsAdmin" element={<BillsAdmin />}></Route>
        <Route path="/categoryAdmin" element={<CategoryAdmin />}></Route>

      </Routes>
    </>
  );
}
