import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";
import { Modal, Form, message } from "antd";

function Experiences() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  const [showAddEditModal, setShowEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/portfolio/add-experience",
        values
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowEditModal(false);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
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
      <div className="flex justify-end">
        <button
          className="bg-primary text-white px-5 py-2"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowEditModal(true);
          }}
        >
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {experiences.map((experience) => (
          <div className="shadow border border-gray-400 p-5 flex flex-col">
            <h1 className="text-primary text-xl font-bold">
              {experience.duration}
            </h1>
            <hr />
            <h1> Company: {experience.company}</h1>
            <h1> Role: {experience.title}</h1>
            <h1>{experience.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button className="bg-red-500 text-white px-5 py-2 ">
                Delete
              </button>
              <button className="bg-primary text-white px-5 py-2 ">Edit</button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit experience" : "Add Experience"}
        footer={null}
        onCancel={() => setShowEditModal(false)}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="duration" label="Duration">
            <input className="input" placeholder="Duration" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <input className="input" placeholder="Company" />
          </Form.Item>
          <Form.Item name="title" label="Title">
            <input className="input" placeholder="Title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <input className="input" placeholder="Description" />
          </Form.Item>
          <div className="flex justify-end">
            <button
              className="border-primary text-primary px-5 py-2"
              type="submit"
              onClick={() => {
                setShowEditModal(false);
              }}
            >
              Cancel
            </button>
            <button className="bg-primary text-white px-5 py-2" type="submit">
              {selectedItemForEdit ? "update" : "add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Experiences;
