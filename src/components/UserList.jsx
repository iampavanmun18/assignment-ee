import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DLT, EDT, Fetch_User } from "../redux/action/action";
import {
  EditFilled,
  DeleteFilled,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

const UsersList = () => {
  const content = useSelector((state) => state);
  const dispatch = useDispatch();
  const [heart, setheart] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  function getData() {
    return (dispatch) => {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) =>
        dispatch({
          type: "FETCH_DATA",
          data: res.data,
        })
      );
    };
  }

  function onFetchdata() {
    //invoking action
    dispatch(getData());
  }

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then((res) => res.json())
    //   .then((data) => setUsers(data))
    //   .catch((er) => console.log(er));

    onFetchdata();
  }, []);

  const openPopup = (id) => {
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

  // const removeElement = (index) => {
  //   const filterreData = content.data.filter((user, i) => user.id !== index);
  //   setUsers(filterreData);
  // };

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
  return (
    <div>
      {selectedUser && selectedUser?.name && (
        <div className="popup">
          <div className="overlay"></div>
          <div className="popupBody">
            <p>
              Name:{" "}
              <input
                type="text"
                value={userData.name}
                onChange={(ev) =>
                  setUserData({ ...userData, name: ev.target.value })
                }
              />
            </p>
            <p>
              Email:{" "}
              <input
                type="text"
                value={userData.email}
                onChange={(ev) =>
                  setUserData({ ...userData, email: ev.target.value })
                }
              />
            </p>
            <p>
              Phone:{" "}
              <input
                type="text"
                value={userData.phone}
                onChange={(ev) =>
                  setUserData({ ...userData, phone: ev.target.value })
                }
              />
            </p>
            <p>
              Website:{" "}
              <input
                type="text"
                value={userData.website}
                onChange={(ev) =>
                  setUserData({ ...userData, website: ev.target.value })
                }
              />
            </p>
            <div className="popup-footer">
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onSave.bind(this, selectedUser.id)}>Ok</button>
            </div>
          </div>
        </div>
      )}
      <div className="basic-grid">
        {content.data.length > 0 ? (
          content.data.map((user) => (
            <div className="card" key={user.id}>
              <div className="card-header">
                <img
                  src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg`}
                />
              </div>
              <div className="card-body">
                <div className="title">
                  <div>{user.name} </div>
                </div>
                <div className="email">{user.email}</div>
                <div className="phone">{user.phone}</div>
                <div className="web">{user.website}</div>
              </div>

              <div className="row_group">
                <div style={{color:'red'}} onClick={() => setheart(!heart)}>
                {
                  heart ? <HeartOutlined/> :<HeartFilled/>
                }
                </div>

                <div className="item">
                  <EditFilled
                    style={{ color: "red" }}
                    onClick={() => editCard(user.id)}
                  />
                </div>
                <div className="item">
                  {/* <button onClick={()=> removeCard(user.id)}>
                    delete
                  </button> */}
                  <DeleteFilled
                    style={{ color: "red" }}
                    onClick={() => removeCard(user.id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No Users to display</h1>
        )}
      </div>
    </div>
  );
};
export default UsersList;
