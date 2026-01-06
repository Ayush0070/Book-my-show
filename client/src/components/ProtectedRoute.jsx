import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GetCurrentUser } from "../api/users";
import { setUser } from "../redux/userSlice";
import { message, Layout, Menu, Flex } from "antd";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header, Content, Footer, Sider } = Layout;
  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user && user.roles === "admin") {
                  navigate("/admin");
                } else if (user && user.roles === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  useEffect(() => {
    const getValidUser = async () => {
      try {
        dispatch(ShowLoading());
        const response = await GetCurrentUser();
        dispatch(HideLoading());
        if (response && response.success) {
          dispatch(setUser(response.data));
        } else {
          message.error("Failed to fetch user data");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        dispatch(HideLoading());
        console.error("Error in getValidUser:", error);
        message.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="text-white m-0">Book My Show</h3>
            <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
          </Header>
          <div style={{ padding: 24, minHeight: 300, background: "" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
};
export default ProtectedRoute;
