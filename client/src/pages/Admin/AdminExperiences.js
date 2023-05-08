import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";
import { Modal, Form, message, Button } from "antd";

function AdminExperiences() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  const [showAddEditModal, setShowEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-experience", values);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowEditModal(false);
        setSelectedItemForEdit(null);
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

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-experience", {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
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
        <Button
          className="bg-primary text-white font-semibold px-5 py-2"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowEditModal(true);
            setType("add");
          }}
        >
          Add Experience
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
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
              <Button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => {
                  onDelete(experience);
                  setType("add");
                }}
              >
                Delete
              </Button>
              <Button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(experience);

                  setShowEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit || {}}
          >
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
              <Button
                className="border-primary text-primary px-5 py-2"
                htmlType="Button"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-white px-5 py-2"
                htmlType="submit"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                {selectedItemForEdit ? "update" : "add"}
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminExperiences;
