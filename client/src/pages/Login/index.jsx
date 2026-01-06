import React from "react";
import { Button, Input, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/users";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success("User logged in successfully");
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log("Error logging in user:", error);
      message.error("Error logging in user");
    }
  };

  return (
    <>
      <main className="App-header">
        <h1>Login to Book My Show</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input id="email" type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
            <div>
              <p>
                New User? <Link to="/register">Register</Link>
              </p>
            </div>
            <div>
              <p>
                Forgot Password? <Link to="/forget">Reset Password</Link>
              </p>
            </div>
          </Form>
        </section>
      </main>
    </>
  );
};

export default Login;
