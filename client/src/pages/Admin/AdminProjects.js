import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";
import { Modal, Form, message } from "antd";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values.technologies.split(",") || [];
      values.technologies = tempTechnologies;
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-project", values);
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
      const response = await axios.post("/api/portfolio/delete-project", {
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
        <button
          className="bg-primary text-white font-semibold px-5 py-2"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowEditModal(true);
            setType("add");
          }}
        >
          Add project
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {projects.map((project) => (
          <div className="shadow border border-gray-400 p-5 flex flex-col">
            <h1 className="text-primary text-xl font-bold">{project.title}</h1>
            <hr />
            <img src={project.image} alt="" className="h-60 w-80 py-2" />

            <h1>{project.description}</h1>

            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => {
                  onDelete(project);
                  setType("add");
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(project);

                  setShowEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit project" : "Add project"}
          footer={null}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              {
                ...selectedItemForEdit,
                technologies: selectedItemForEdit?.technologies?.join(" , "),
              } || {}
            }
          >
            <Form.Item name="title" label="Title">
              <input className="input" placeholder="Title" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <input className="input" placeholder="Image URL" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea
                className="w-full border border-gray-400 h-36"
                placeholder="Description"
              />
            </Form.Item>
            <Form.Item name="link" label="Link">
              <input className="input" placeholder="Link" />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies">
              <input className="input" placeholder="Technologies" />
            </Form.Item>

            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2">
                {selectedItemForEdit ? "update" : "add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminProjects;
