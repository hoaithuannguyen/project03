import React, { useEffect, useState } from 'react'
import "./Home.scss"
// import { failed, success } from '../../utils/noti.js';
import { Pagination } from 'antd';
import Slider from "react-slick";
import { changeVND } from "../utils/money"
import { BsCart4 } from "react-icons/bs";
import publicAxios from "../config/publicAxios";
import { Link } from 'react-router-dom';

export default function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const userLogin = JSON.parse(localStorage.getItem("userLogin"))
    const [flag, setFlag] = useState(false)
    const [cart, setCart] = useState([]);

    const handleGetCategories = async () => {
        try {
            const response = await publicAxios.get("/api/v1/categories");
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleGetProducts = async () => {
        try {
            const response = await publicAxios.get("/api/v1/products");
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetCategories();
        handleGetProducts();
    }, []);

    const handleAddToCart = async (item) => {
        if (!userLogin) {
            alert("Vui lòng đăng nhập để mua hàng!")
            return
        }
        try {
            const response = await publicAxios.post(`/api/v1/cart/${userLogin.id}`, item)
            alert(response.data.message)
            setFlag(!flag)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async (search) => {
        try {
            const response = await publicAxios.get(
                `/api/v1/products/search?key=${search}`
            );
            setProducts(response.data);
        } catch (error) { }
    }

    const handleCLickCategory = async (id) => {
        try {
            const response = await publicAxios.get(
                `/api/v1/products/category/${id}`
            );
            setProducts(response.data);
        } catch (error) { }
    }
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
    ///
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const displayedProducts = products.slice(startIndex, endIndex);
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <div className='slider_home'>
                <Slider {...settings}>
                    <div>
                        <div><img className='img_banner' src='https://bizweb.dktcdn.net/100/362/077/themes/746584/assets/slider_1.jpg?1700551333835'></img></div>
                    </div>
                    <div>
                        <div><img className='img_banner' src='https://bizweb.dktcdn.net/100/362/077/themes/746584/assets/slider_2.jpg?1700551333835'></img></div>
                    </div>
                </Slider>
            </div>

            <div className='category_home'>
                <ul style={{ display: "flex" }} className="ul_home">
                    <li className='item-cate allProducts'
                        onClick={() => handleCLickCategory(0)}
                    >Tất cả sản phẩm</li>
                    {categories.map((item) =>
                        <li
                            key={item.categoryId}
                            className='item-cate'
                            onClick={() => handleCLickCategory(item.categoryId)}
                        >
                            {item.nameCategory}
                        </li>
                    )}
                </ul>
                <input className='inp_search_home' type="text"
                    placeholder="Tìm kiếm..."
                    // value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div >

            <div className='products_home'>
                {displayedProducts.map((item) => (
                    <div key={item.id} className='products_home_child'>
                        <div className="img_home_div">
                            <Link
                                to={`/details/${item.id}`}
                            >
                                <img className='img_home' src={item.image} alt="" />
                            </Link>
                        </div>
                        <div className="name_home">{item.nameProduct}</div>
                        <div className="price_home">{changeVND(item.price)}</div>
                        <div><button className='btn_home'
                            onClick={() => handleAddToCart(item)}>Mua hàng</button></div>
                    </div>
                ))}
            </div>
            {userLogin?.id ?
                <Link className='cart_home' to="/cart"><BsCart4 className="bicart"></BsCart4> </Link>
                :
                <></>
            }
            {userLogin?.id ?
                <div className="number_card">{cart?.length}</div>
                :
                <div className="number_card"></div>
            }
            <Pagination
                current={currentPage}
                onChange={onPageChange}
                pageSize={itemsPerPage}
                total={products.length}
                className="pagination_home"
            />
        </>
    )
}
