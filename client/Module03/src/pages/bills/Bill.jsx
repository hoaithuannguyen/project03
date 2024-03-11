import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Bill.scss"
import publicAxios from "../../config/publicAxios";
import { changeVND } from "../../utils/money"

export default function Bill() {
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));

    const [bill, setBill] = useState([])
    const handleGetBill = async () => {
        try {
            const res = await publicAxios.get(`/api/v1/bills/${userLogin.id}`);
            console.log(res.data.bills)
            setBill(res.data.bills)
        } catch (error) {
            console.log(error)
        }
    }
    const [show, setShow] = useState(false);
    const [infoDetail, setInfoDetails] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = async (details) => {
        console.log(details);
        setShow(true);
        try {
            const response = await publicAxios.get(`/api/v1/billDetail/${details.billsId}`)
            setInfoDetails(response.data)
        } catch (error) {
            console.log(error)
        }
    };
    const [flag, setFlag] = useState(true)
    const handleChangeStatus = async (id, status) => {
        let accept = window.confirm("Bạn muốn thực hiện hành đông không");
        if (accept) {
            const response = await publicAxios.put(
                `/api/v1/bill/update/${id}`,
                {
                    status: status,
                }
            );
            alert(response.data.message);
        }
        setFlag(!flag);
    };

    useEffect(() => {
        handleGetBill()
    }, [flag])

    return (
        <div className="div_all_bill">
            {bill.map((item, index) => {
                return (
                    <div key={index} className="bills_users">
                        <div>Đơn hàng số:{index + 1}</div>
                        <div>Tên người nhận:{item.name}</div>
                        <div>Số điện thoại:{item.phoneNumber}</div>
                        <div>Địa chỉ:{item.address}</div>
                        {/* <div>Trạng thái:{item.status}</div> */}
                        <div>Tổng tiền:{changeVND(item.total)}</div>
                        <div>
                            {" "}
                            <Button
                                variant="primary"
                                onClick={() => handleShow(item)}
                                className="button-bootrap"
                                style={{ fontSize: "12px", marginRight: "5px" }}
                            >
                                Chi tiết
                            </Button>
                            <Button className="button-bootrap" onClick={() =>
                                handleChangeStatus(
                                    item.billsId,
                                    "user đã hủy"
                                )
                            } style={{ fontSize: "12px" }}>
                                Hủy
                            </Button>
                        </div>
                        <div></div>
                    </div>
                );
            })}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {infoDetail.map((item) => (
                        <>
                            <div>
                                <img style={{
                                    width: "100px", height: "auto"
                                }} src={item.image} alt="" />
                            </div>
                            <div>Sản phẩm:{item.nameProduct}</div>
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
    );
}
