import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./pages/Layout";
import DashBoard from "./pages/DashBoard";
import NotfoundPage from "./pages/NotfoundPage";
import LoginPage from "./pages/LoginPages";
import ProtectedRoute from "./Routes/ProtectedRoute";
import About from "./pages/About";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBoard />} />
            {/* <Route
            path='product'
            element={
              <ProtectedRoute user={user}>
                <Product user={user} />
              </ProtectedRoute>
            }
          /> */}
            <Route path="about" element={<About />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
