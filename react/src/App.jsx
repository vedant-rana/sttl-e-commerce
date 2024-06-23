import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import { userExist } from "./redux/reducers/userReducer";
import ProtectedRoute from "./components/ProtectedRoute";
import useSyncCart from "./hooks/SyncCart";
import { setCartItems } from "./redux/reducers/cartReducers";
import ProductDetails from "./pages/ProductDetails";
import CheckOut from "./pages/CheckOut";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";

function App() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userData);
  useEffect(() => {
    dispatch(userExist());
  }, [dispatch]);

  // useSyncCart(user);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={user ? false : true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isAuthenticated={user ? false : true}>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute
              isAuthenticated={user ? true : false}
              redirect="/login"
            >
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              isAuthenticated={user ? true : false}
              redirect="/login"
            >
              <Payment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
