import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./BillsAdmin.scss";
import { changeVND } from "../../../utils/money"
import publicAxios from "../../../config/publicAxios";
import privateAxios from "../../../config/privateAxios";
import { Link, NavLink } from "react-router-dom";

export default function BillsAdmin() {
  const [bills, setBills] = useState([]);
  const [flag, setFlag] = useState(true);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const handleGetBills = async () => {
    try {
      const res = await publicAxios.get("/api/v1/bills");
      setBills(res.data.bills);
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(false);
  const [infoDetail, setInfoDetails] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = async (details) => {
    setShow(true);
    try {
      const response = await privateAxios.get(
        `/api/v1/billDetail/${details.billsId}`
      );
      setInfoDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const [flag, setFlag] = useState(true)
  const handleChangeStatus = async (id, status) => {
    let accept = window.confirm("Bạn muốn thực hiện hành đông không");
    if (accept) {
      const response = await privateAxios.put(
        `/api/v1/bill/update/${id}`,
        {
          status: status,
        }
      );
      // alert(response.data.message);
    }
    setFlag(!flag);
  };

  useEffect(() => {
    handleGetBills();
  }, [flag]);
  console.log(bills);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="div_billAdmin">
          <div
            className="quanly"
            style={{ marginTop: "30px", fontSize: "20px" }}
          >
            <NavLink className="abc" to="/usersAdmin">
              Quản lý người dùng
            </NavLink>
          </div>

          <div
            className="quanly"
            style={{ marginTop: "70px", fontSize: "20px" }}
          >
            <Link className="abc" to="/productsAdmin">
              Quản lý sản phẩm
            </Link>
          </div>
          <div
            className="quanly"
            style={{ marginTop: "70px", fontSize: "20px" }}
          >
            <Link className="abc" to="/categoryAdmin">
              Quản lý Category
            </Link>
          </div>
          <div
            className="quanly"
            style={{ marginTop: "70px", fontSize: "20px" }}
          >
            <Link
              className="abc"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "25px",
              }}
              to="/billsAdmin"
            >
              Quản lý Hóa đơn
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "50px", marginLeft: "150px" }}>
          <h2 style={{ marginLeft: "210px", marginTop: "30px" }}>
            Quản lý hóa đơn
          </h2>

          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên người nhận</th>
                <th>Trạng thái</th>
                <th>Giỏ hàng</th>
                <th>Hóa đơn</th>
                <th>Hành động</th>
              </tr>
            </thead>
            {bills.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.billStatus == "đang xử lý" ? (
                      <span>Đang Chờ</span>
                    ) : item.billStatus == "đã xác nhận" ? (
                      <span>Xác nhận</span>
                    ) : item.billStatus == "user đã hủy" ? (
                      <span>User đã hủy</span>
                    ) : (
                      <span>Từ chối</span>
                    )}
                  </td>
                  <td>
                    {" "}
                    <Button
                      variant="primary"
                      onClick={() => handleShow(item)}
                      style={{
                        width: "90px",
                        height: "30px",
                        fontSize: "10px",
                      }}
                    >
                      Chi tiết
                    </Button>
                  </td>
                  <td>{changeVND(item.total)}</td>
                  <td>
                    {/* {item.status === "Đang chờ" ? ( */}
                    <button
                      onClick={() =>
                        handleChangeStatus(
                          item.billsId,
                          "đã xác nhận"
                        )
                      }
                      style={{
                        border: "none",
                        marginRight: "5px",
                      }}
                    >
                      Xác nhận
                    </button>
                    {/* ) : (
                                    ""
                                )} */}

                    {/* {item.status === "Đang chờ" ? ( */}
                    {/* <button
                      onClick={() =>
                        handleChangeStatus(
                          item.billsId,
                          "admin đã hủy"
                        )
                      }
                      style={{ border: "none" }}
                    >
                      Hủy
                    </button> */}
                    {/* ) : (
                                    ""
                                )} */}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {infoDetail.map((item) => (
              <>
                <div>
                  <img
                    style={{
                      width: "100px",
                      height: "auto",
                    }}
                    src={item.image}
                    alt=""
                  />
                </div>
                <div>Sản phẩm:{item.name}</div>
                <div>Số lượng:{item.quantity}</div>
                <div>Giá:{changeVND(item.price)}</div>
              </>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
