import React, { useEffect, useState } from 'react'
// import { failed, success } from '../../utils/noti';
import axios from "axios";
import "./Cart.scss"
import { message } from "antd";
import { changeVND } from "../../utils/money"
import { NavLink, useNavigate } from 'react-router-dom'
import publicAxios from "../../config/publicAxios";
import privateAxios from "../../config/privateAxios";
export default function Cart() {
    const [infoBill, setinforBill] = useState({
        name: "",
        sdt: "",
        address: "",
    });
    const handleInputChange = (e) => {
        setinforBill({ ...infoBill, [e.target.name]: e.target.value });
    };
    const [cart, setCart] = useState([])
    const [flag, setFlag] = useState(false)

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const [total, setTotal] = useState(0)
    const handleTotalPrice = () => {
        let totalPrice = cart?.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        setTotal(totalPrice);
    };

    useEffect(() => {
        handleTotalPrice();
    }, [cart]);

    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const handleGetCart = async () => {
        try {
            const response = await publicAxios.get(`/api/v1/cart/${userLogin.id}`);
            setCart(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetCart()
    }, [flag])

    const handleDeleteCart = async (id) => {
        try {
            if (window.confirm("Bạn có muốn xóa sản phẩm không?")) {
                const res = await publicAxios.delete(`/api/v1/cart/${id}`);
                setFlag(!flag)
            }
        } catch (error) {
            console.log(11122221, error);
        }
    }

    const handleDecrease = async (item) => {
        if (item.quantity == 1) {
            handleDeleteCart(item.cartId)
            return
        }
        const body = { cartId: item.cartId, type: "decre" }
        try {
            await publicAxios.patch(`/api/v1/cart`, body);
            setFlag(!flag);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    const handleIncrease = async (item) => {
        if (item.quantity >= item.stock){
            alert("Khong the mua qua so luong ton kho")
            return
        } 
        const body = { cartId: item.cartId, type: "incre" }
        try {
            await publicAxios.patch(`/api/v1/cart`, body);
            setFlag(!flag);
        } catch (error) {
            console.log(error);
        }
    }
    //////////////////////////
    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            const bill = {
                userId: userLogin.id,
                address: infoBill.address,
                phone: infoBill.sdt,
                name: infoBill.name,
                total
            }
            const response = await publicAxios.post("/api/v1/bills", bill)
            const billDetail = {
                billId: response.data.newIdBill,
                cart
            }
            await publicAxios.post("/api/v1/billDetail", billDetail)
            await publicAxios.delete(`/api/v1/carts/${userLogin.id}`)
            message.info("Thanh toán thành công!")
            setCart([])
            setTimeout(() => {
                navigate("/bill")
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div style={{ display: "flex" }} className='div_all_products_cart'>
                {
                    cart?.map((item, index) => {
                        return <div key={index} style={{}} className='all_products_cart'>
                            <div><img src={item.image} alt="" style={{ width: "100%", height: "auto" }} /></div>
                            <div className='cart_name'>{item.nameProduct}(Kho hàng còn:{item.stock})</div>
                            {/* <div className='cart_price cart_name'>Giá:{changeVND(item.price)}</div> */}
                            <div className='cart_btn cart_name'>
                                <button onClick={() => handleDecrease(item)} className='btn_cart_1'>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrease(item)} className='btn_cart_1'>+</button>
                            </div>
                            <div className='cart_name'><button className='cart_btn_delete' onClick={() => handleDeleteCart(item.cartId)}>Xóa sản phẩm</button></div>
                            <div>
                                <strong>Thành tiền:</strong> {changeVND(item.price * item.quantity)}
                            </div>
                        </div>
                    })
                }
            </div>
            <h3>Tổng tiền: {changeVND(total)} </h3>
            <div className='thongtinkhachhang'>
                <h2>Thông tin khách hàng</h2>
                <table className='customer_cart'>
                    <tbody className='tbody_cart'>
                        <tr>
                            <td><label htmlFor="">Tên</label></td>
                            <td><input type="text" id=""
                                onChange={handleInputChange}
                                name="name"
                                value={infoBill.name}
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">SĐT</label></td>
                            <td><input type="text" id=""
                                onChange={handleInputChange}
                                name="sdt"
                                value={infoBill.sdt}
                            /></td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">Địa chỉ</label>
                            </td>
                            <td>
                                <input type="text" id=""
                                    onChange={handleInputChange}
                                    name="address"
                                    value={infoBill.address}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='btn_thanhtoan' onClick={handlePayment}>Thanh toán</button>
            </div>
        </>
    )
}
