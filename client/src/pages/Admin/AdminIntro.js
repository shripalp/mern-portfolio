import React from "react";
import { Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intro._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.intro}
      >
        <Form.Item name="welcomeText" label="welcomeText">
          <Input className="input" placeholder="Welcome Text" />
        </Form.Item>
        <Form.Item name="firstName" label="firstName">
          <Input className="input" placeholder="Firsname" />
        </Form.Item>
        <Form.Item name="lastName" label="lastName">
          <Input className="input" placeholder="Lastname" />
        </Form.Item>
        <Form.Item name="caption" label="caption">
          <Input className="input" placeholder="Caption" />
        </Form.Item>
        <Form.Item name="description" label="description">
          <textarea
            className="border border-gray-700 h-48 w-full"
            placeholder="Description"
          />
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 py-2 text-white bg-primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
