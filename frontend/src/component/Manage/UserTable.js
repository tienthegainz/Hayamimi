import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Table, Radio, Divider, Button, Space } from "antd";
import FirebaseController from "../../firebase.js";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const { Column } = Table;

const UserTable = (props) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "displayName",
    },
    {
      title: "ID",
      dataIndex: "uid",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Delete",
      key: "uid",
      dataIndex: "uid",
      render: (tags) => (
        <>
          {[tags].map((uid) => {
            return (
              <Space size="middle">
                <a
                  onClick={() => {
                    confirmAlert({
                      title: 'Confirm to delete',
                      message: 'Are you sure to delete user ' + uid,
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () => {
                            FirebaseController.db
                              .collection("users")
                              .doc(uid)
                              .delete()
                              .then(() => {
                                let new_data = data.filter((user) => user.uid !== uid);
                                setData(new_data);
                                FirebaseController.db.collection('post').where('uid', '==', uid).get()
                                  .then((querySnapshot) => {
                                    // Once we get the results, begin a batch
                                    var batch = FirebaseController.db.batch();
                                    console.log(querySnapshot);

                                    querySnapshot.forEach((doc) => {
                                      // For each doc, add a delete operation to the batch
                                      batch.delete(doc.ref);
                                      console.log(doc.ref);
                                    });
                                    // Commit the batch
                                    return batch.commit();
                                  }).then(() => {
                                    // console.log("Delete all", uid, "s posts");
                                  });
                                FirebaseController.db.collection('comment').where('uid', '==', uid).get()
                                  .then((querySnapshot) => {
                                    // Once we get the results, begin a batch
                                    var batch = FirebaseController.db.batch();
                                    console.log(querySnapshot);
                                    querySnapshot.forEach((doc) => {
                                      batch.delete(doc.ref);
                                      console.log(doc.ref);
                                    });
                                    // Commit the batch
                                    return batch.commit();
                                  }).then(() => {
                                    // console.log("Delete all", uid, "s comments");
                                  });
                              })
                              .catch((error) => {
                                console.error("Error removing document: ", error);
                              });
                          }
                        },
                        {
                          label: 'No',
                          onClick: () => { return; }
                        }
                      ]
                    });
                  }}
                >
                  Delete
                </a>
              </Space>
            );
          })}
        </>
      ),
    },
  ];

  const getAllUserData = async () => {
    let users = [];
    const userRef = await FirebaseController.db.collection("users").get();
    userRef.forEach((doc) => {
      if (doc.data().isAdmin === true) return;
      users.push(doc.data());
    });
    // console.log(users);
    setData(users);
  };
  useEffect(() => {
    getAllUserData();
  }, []);


  return (
    <Col span={24}>
      <div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}
          </span>
        </div>
        <Table columns={columns} dataSource={data} bordered pagination={"true"}>
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a>Delete</a>
              </Space>
            )}
          />
        </Table>
      </div>
    </Col>
  );
};

export default UserTable;
