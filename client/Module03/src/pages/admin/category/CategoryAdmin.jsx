import React, { useEffect, useState } from 'react';
import "./CategoryAdmin.scss";
import axios from "axios";
import { Link, NavLink } from 'react-router-dom';
import { failed, success } from '../../../utils/noti';
import publicAxios from "../../../config/publicAxios";
import privateAxios from "../../../config/privateAxios";
import { Popconfirm, message } from 'antd';

export default function CategoryAdmin() {
  const [newCate, setNewCate] = useState({
    nameCategory: ""
  })
  const [categories, setCategories] = useState([])
  const handleGetAllCate = async () => {
    try {
      const response = await publicAxios.get("/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    handleGetAllCate();
  }, []);

  const handleAddCate = async () => {
    const newCateGory = {
      nameCategory: newCate
    }
    try {
      const response = await publicAxios.post("/api/v1/categories", newCateGory.nameCategory)
      setCategories(response.data.cates)
      message.info(response.data.message)
      setNewCate({
        nameCategory: ""
      })
    } catch (error) {
      message.error(error.response.data.message)
    }
  }

  const handleEdit = (item) => {
    setNewCate(item)
  }

  const handleSave = async () => {
    console.log("aaa", newCate);
    try {
      const res = await publicAxios.put(`/api/v1/categories/${newCate.categoryId}`, newCate)
      setCategories(res.data.cates)
      setNewCate({
        nameCategory: ""
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await privateAxios.delete(`/api/v1/categories/${id}`)
      setCategories(res.data.cates)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className='headerAdmin_category'>
          <div className="quanly" style={{ marginTop: "30px", fontSize: "20px" }}>
            <NavLink className="abc" to="/usersAdmin">Quản lý người dùng</NavLink>
          </div>

          <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
            <Link className="abc" to="/productsAdmin">Quản lý sản phẩm</Link>
          </div>
          <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
            <Link className="abc" to="/categoryAdmin" style={{ color: "white", fontSize: "25px" }}>Quản lý Category</Link>
          </div>
          <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
            <Link className='abc' style={{ textDecoration: "none", color: "black" }} to="/billsAdmin">Quản lý Hóa đơn</Link>
          </div>
        </div>

        <div className='' style={{
          marginTop: "20px",
          marginLeft: "100px"
        }}>
          <h2 style={{ marginLeft: "250px", marginTop: "30px" }}>Quản lý Category</h2>

          <label htmlFor="name" style={{ marginTop: "40px", marginLeft: "100px" }}>Category</label>
          <input
            type="text"
            name="nameCategory"
            id="name"
            value={newCate.nameCategory}
            onChange={(e) => setNewCate({ ...newCate, nameCategory: e.target.value })}
            style={{
              marginLeft: "10px"
            }}
          />
          <br />
          <button style={{ border: "none", marginTop: "20px", marginBottom: "50px", marginLeft: "175px", width: "100px", height: "40px" }} onClick={newCate.categoryId ? handleSave : handleAddCate} >
            {newCate.categoryId ? "Sửa" : "Thêm"}
          </button>

          <table className="table_admin_category">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nameCategory}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Sửa</button>

                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => handleDelete(item.categoryId)}
                      onCancel={() => { }}
                    >
                      <button>Xóa</button>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}
