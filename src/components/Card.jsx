import React, { useState } from "react";
import {
  DeleteFilled,
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

import { Card } from "antd";
import LoadingSpinner from "./LoadingSpinner";
const { Meta } = Card;
export function CustomCard({ user, editCard, removeCard, isLoading }) {
  const [toggle, settoggle] = useState(false)
    console.log('loading', isLoading)

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="basic-grid">
          {user.data.length > 0 ? (
            user.data.map((user) => (
              <Card
                className="card"
                key={user.id}
                style={{ width: 260 }}
                cover={
                  <img
                    alt="example"
                    src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg`}
                  />
                }
                actions={[
                  <HeartOutlined key="heart" style={{color:'red'}} onClick={()=>(settoggle(!toggle))} />,
                  <EditOutlined key="edit" onClick={() => editCard(user.id)} />,
                  <DeleteFilled
                    key="ellipsis"
                    onClick={() => removeCard(user.id)}
                  />,
                ]}
              >
                <div className="card-body">
                  <div className="title">
                    <div>{user.name} </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <MailOutlined />
                    <div style={{ paddingLeft: "12px" }}>{user.email}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <PhoneOutlined />
                    <div style={{ paddingLeft: "12px" }}>{user.phone}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <GlobalOutlined />
                    <div style={{ paddingLeft: "12px" }}>{user.website}</div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <LoadingSpinner/>
          )}
        </div>
      )}
    </>
  );
}
