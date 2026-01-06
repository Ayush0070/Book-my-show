import React from "react";
import { Button, Input, Form, message, Radio } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../api/users";

const Register = () => {
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log("Error registering user:", error);
      message.error(response.message);
    }
  };

  return (
    <>
      <main className="App-header">
        <h1>Register to Book My Show</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input id="name" type="text" placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
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
                Register
              </Button>
            </Form.Item>
            <Form.Item
              label="Register as a Partner"
              htmlFor="roles"
              name="roles"
              className="d-block text-center"
              initialValue="user"
              rules={[{ required: true, message: "Please select a option" }]}
            >
              <div>
                <Radio.Group name="radiogroup" className="flex-start">
                  <Radio value={"partner"}>Yes</Radio>
                  <Radio value={"user"}>No</Radio>
                </Radio.Group>
              </div>
            </Form.Item>
            <div>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </section>
      </main>
    </>
  );
};

export default Register;
