import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import Admin from "./pages/Admin";
import Partner from "./pages/Partner";
import Profile from "./pages/User";
import SingleMovie from "./pages/Home/SingleMovie";
import BookShow from "./pages/Home/BookShow";
import Forget from "./pages/User/ForgotPassword";
import Reset from "./pages/User/ResetPassword";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/partner"
              element={
                <ProtectedRoute>
                  <Partner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <SingleMovie />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-show/:id"
              element={
                <ProtectedRoute>
                  <BookShow />
                </ProtectedRoute>
              }
            />
            <Route path="/forget" element={<Forget />} />
            <Route path="/reset/:email" element={<Reset />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
