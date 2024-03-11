import React, { useEffect, useState } from 'react'
import privateAxios from "../../../config/privateAxios";
import publicAxios from "../../../config/publicAxios";
import { Link, NavLink } from 'react-router-dom';
import { Popconfirm } from "antd"
import "./UsersAdmin.scss";

export default function UsersAdmin() {
  const [users, setUsers] = useState([])
  const handleGetUsers = async () => {
    try {
      const res = await privateAxios.get("/api/users")
      setUsers(res.data.users)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetUsers()
  }, [])
  const handleChangeStatus = async (user_id) => {
    try {
      const response = await publicAxios.patch(`/api/user/${user_id}`);
      setUsers(response.data.users)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className='header_userAdmin'>

          <div className="quanly" style={{ marginTop: "30px", fontSize: "20px" }}>
            <NavLink className="abc" to="/usersAdmin" style={{ color: "white", fontSize: "25px" }}>Quản lý người dùng</NavLink>
          </div>

          <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
            <NavLink className="abc" to="/productsAdmin">Quản lý sản phẩm</NavLink>
          </div>
          <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
            <NavLink className="abc" to="/categoryAdmin">Quản lý Category</NavLink>
          </div>
          <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
            <NavLink className='abc' style={{ textDecoration: "none", color: "black" }} to="/billsAdmin">Quản lý Hóa đơn</NavLink>
          </div>

        </div>
        <div>
          <h2 style={{ marginLeft: "300px", marginTop: "30px" }}>Quản lý người dùng</h2>

          <table className="table_admin_users" style={{
            marginLeft: "200px", marginTop: "50px"
          }}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Tình trạng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => {
                return <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    {item.status ? "Active" : "Block"}
                  </td>
                  <td>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => handleChangeStatus(item.id, item.status)}
                      onCancel={() => { }}
                    >
                      <button >
                        {
                          item.role == "1" ?
                            <></> :
                            item.status ? "Block" : "Active"
                        }
                      </button>
                    </Popconfirm>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
