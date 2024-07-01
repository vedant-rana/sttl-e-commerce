import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import { userExist } from "./redux/reducers/userReducer";
import Footer from "./components/Footer";
import { getAllProducts } from "./redux/reducers/productReducer";

function App() {
  const dispatch = useDispatch();

  // geeting login user Data from state
  const { user, loading, error } = useSelector((state) => state.userData);

  useEffect(() => {
    // checking if user is logged in or not
    dispatch(getAllProducts());
    dispatch(userExist());
  }, [dispatch]);

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="flex-1 mt-[10vh]">
        <Routes>
          {/* Un Authorize paths */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Authorized routes */}
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

          {/* Default 404-not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
