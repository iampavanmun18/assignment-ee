import { Card, CustomCard } from "./Card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DLT, EDT } from "../redux/action/action";
import { Modal } from "antd";
import { Form, Button, Input } from "antd";

const UsersList = () => {
  const content = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  const [selectedUser, setSelectedUser] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  function getData() {
    return (dispatch) => {
      setIsLoading(false)
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) =>
        dispatch({
          type: "FETCH_DATA",
          data: res.data,
        }),
      ).catch(() => {
        setErrorMessage("Unable to fetch user list");
        setIsLoading(false);
     });
    };
  }

  function onFetchdata() {
    setIsLoading(true)
    dispatch(getData());
  }

  useEffect(() => {
    onFetchdata();
  }, []);

  const openPopup = (id) => {
    showModal();
    const selectedUser = content.data.find((user) => user.id === id);
    setSelectedUser(selectedUser);
    setUserData({
      name: selectedUser.name,
      email: selectedUser.email,
      phone: selectedUser.phone,
      website: selectedUser.website,
    });
  };

  const onCancel = () => {
    setSelectedUser([]);
  };

  const onSave = (id) => {
    const updateUser = [...content.data];
    const newUpdatedArray = [];
    updateUser.map((item) => {
      if (item.id === id) {
        newUpdatedArray.push({
          ...item,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          website: userData.website,
        });
      } else {
        newUpdatedArray.push(item);
      }
      return newUpdatedArray;
    });
    dispatch({
      type: "FETCH_DATA",
      data: newUpdatedArray,
    });
    setSelectedUser([]);
  };

  const removeCard = (ele) => {
    console.log("data", ele);
    dispatch(DLT(ele));
  };

  const editCard = (ele) => {
    openPopup(ele);

    console.log("data", ele);
    dispatch(EDT(ele));
    dispatch({
      type: "FETCH_DATA",
      data: content.data,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onSave(selectedUser.id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {selectedUser && selectedUser?.name && (
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item
              label="Name"
              value={userData.name}
              onChange={(ev) =>
                setUserData({ ...userData, name: ev.target.value })
              }
              name="Username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              type="email"
              value={userData.email}
              onChange={(ev) =>
                setUserData({ ...userData, email: ev.target.value })
              }
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              value={userData.phone}
              onChange={(ev) =>
                setUserData({ ...userData, phone: ev.target.value })
              }
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Website"
              type="text"
              value={userData.website}
              onChange={(ev) =>
                setUserData({ ...userData, website: ev.target.value })
              }
              name="website"
              rules={[{ required: true, message: "Please enter website" }]}
            >
              <Input />
            </Form.Item>
          </Form>

          {/* alternate code for form  */}
          {/* <p>
            <label>Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={(ev) =>
                setUserData({ ...userData, name: ev.target.value })
              }
            />
          </p>
          <p>
            <label>Email</label>
            <input
              type="text"
              value={userData.email}
              onChange={(ev) =>
                setUserData({ ...userData, email: ev.target.value })
              }
            />
          </p>
          <p>
            <label>Phone</label>

            <input
              type="text"
              value={userData.phone}
              onChange={(ev) =>
                setUserData({ ...userData, phone: ev.target.value })
              }
            />
          </p>
          <p>
            <label>Website</label>
            <input
              type="text"
              value={userData.website}
              onChange={(ev) =>
                setUserData({ ...userData, website: ev.target.value })
              }
            />
          </p> */}
        </Modal>
      )}
      <CustomCard user={content} editCard={editCard} removeCard={removeCard} isLoading={isLoading} />
    </div>
  );
};
export default UsersList;
