import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import "./ProductsAdmin.scss";
import { Pagination, Popconfirm, message } from 'antd';
import { changeVND } from "../../../utils/money"
import privateAxios from "../../../config/privateAxios";
import publicAxios from "../../../config/publicAxios";
export default function ProductsAdmin() {
    const [preview, setPreview] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [newProduct, setNewProduct] = useState({
        nameProduct: "",
        price: "",
        image: null,
        description: "",
        categoryId: "",
        stock: "",
    });
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
            const response = await privateAxios.get("/api/v1/products");
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetCategories();
        handleGetProducts();
    }, []);
    const handleAddMedia = (event) => {
        setSelectedMedia(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            setPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    const handleGetValue = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedMedia);
            formData.append("upload_preset", "project");
            const [uploadMedia] = await Promise.all([
                axios.post(
                    "https://api.cloudinary.com/v1_1/dzwap0buq/image/upload",
                    formData
                ),
            ]);
            const media = uploadMedia.data.secure_url;
            const response = await publicAxios.post("/api/v1/products", {
                ...newProduct,
                image: media,
            });
            setProducts(response.data.products);
            setNewProduct({
                nameProduct: "",
                price: "",
                image: null,
                description: "",
                categoryId: "",
                stock: "",
            })
            setSelectedMedia()
            setPreview(null)
        } catch (error) {
            message.error(error.response.data.message);
        }
    };
    const handleSave = async () => {
        try {
            if (!selectedMedia) {
                const response = await publicAxios.put(
                    `/api/v1/products/${newProduct.productId}`,
                    newProduct
                );
                setProducts(response.data.products);
                setNewProduct({
                    nameProduct: "",
                    price: "",
                    image: null,
                    description: "",
                    categoryId: "",
                    stock: "",
                })
                setSelectedMedia()
                setPreview(null)
                return;
            }
            const formData = new FormData();
            formData.append("file", selectedMedia);
            formData.append("upload_preset", "project");
            const [uploadMedia] = await Promise.all([
                axios.post(
                    "https://api.cloudinary.com/v1_1/dzwap0buq/image/upload",
                    formData
                ),
            ]);
            const media = uploadMedia.data.secure_url;
            const response = await publicAxios.put(
                `/api/v1/products/${newProduct.productId}`,
                { ...newProduct, image: media }
            );
            setProducts(response.data.products);
            setNewProduct({
                nameProduct: "",
                price: "",
                image: null,
                description: "",
                categoryId: "",
                stock: "",
            })
            setSelectedMedia()
            setPreview(null)
        } catch (error) {
            console.log(error)
        }
    };
    const handleEdit = async (item) => {
        console.log("Tesst 123", item);
        setNewProduct(item);
        setPreview(item.image)
    };
    const handleDelete = async (id) => {
        try {
            const response = await publicAxios.delete(`/api/v1/deleteProduct/${id}`);
            setProducts(response.data.products);
        } catch (error) { }
    };
    const handleSearch = async () => {
        try {
            const response = await publicAxios.get(
                `/api/v1/products/search?key=${search}`
            );
            setProducts(response.data);
        } catch (error) { }
    };
    ///////////////

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const displayedProducts = products.slice(startIndex, endIndex);
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <div style={{ display: "flex" }}>

                <div className='headerAdmin_category' style={{ color: "red", width: "280px", height: "auto" }}>
                    <div className="quanly" style={{ marginTop: "30px", fontSize: "20px" }}>
                        <NavLink className="abc" to="/usersAdmin">Quản lý người dùng</NavLink>
                    </div>

                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <Link className="abc" to="/productsAdmin" style={{ color: "white", fontSize: "25px" }}>Quản lý sản phẩm</Link>
                    </div>
                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <Link className="abc" to="/categoryAdmin">Quản lý Category</Link>
                    </div>
                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <Link className='abc' style={{ textDecoration: "none", color: "black" }} to="/billsAdmin">Quản lý Hóa đơn</Link>
                    </div>
                </div>
                <div>
                    <h2 style={{ marginLeft: "300px", marginTop: "30px" }}>Quản lý sản phẩm</h2>
                    <table className="table_productAdmin" style={{ marginLeft: "150px" }}>
                        <tr>
                            <td>
                                <label htmlFor="">Tên</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="nameProduct"
                                    onChange={handleGetValue}
                                    value={newProduct.nameProduct}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">Giá</label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="price"
                                    onChange={handleGetValue}
                                    value={newProduct.price}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">Mô tả</label>
                            </td>
                            <td>
                                <textarea
                                    id="" cols="47" rows="5"
                                    name="description"
                                    onChange={handleGetValue}
                                    value={newProduct.description}
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">Category</label>
                            </td>
                            <td>
                                <select
                                    name="categoryId"
                                    onChange={handleGetValue}
                                    value={newProduct.categoryId}
                                >
                                    <option value="">Chọn Category</option>
                                    {categories.map((category) => (
                                        <option value={category.categoryId}>
                                            {category.nameCategory}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">Số lượng</label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="stock"
                                    onChange={handleGetValue}
                                    value={newProduct.stock}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="chooseImage">Ảnh</label>
                            </td>
                            <td>
                                <input
                                    id="chooseImage"
                                    type="file"
                                    onChange={handleAddMedia}
                                    hidden
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src={preview}
                                    alt=""
                                    style={{ width: "100px", height: "100px" }}
                                />
                            </td>
                        </tr>
                        <button style={{ marginLeft: "150px", border: "none", width: "140px", height: "40px" }} onClick={newProduct.productId ? handleSave : handleAdd}>
                            {newProduct.productId ? "Sửa sản phẩm" : "Thêm sản phẩm"}
                        </button>
                    </table>


                    <br />
                    <div style={{
                        marginLeft: "100px", marginTop: "30px"
                    }}>
                        <input
                            type="text"
                            className="border border-sky-500"
                            name="search_Product"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div style={{ marginLeft: "100px" }}>
                        <table className="table_admin">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Ảnh</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Mô tả</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedProducts.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.nameProduct}</td>
                                        <td>
                                            <img className="img_products_admin" src={item.image} alt="" />
                                        </td>
                                        <td>{changeVND(item.price)}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <button onClick={() => handleEdit(item)}>Sửa</button>
                                            <Popconfirm
                                                title="Delete the task"
                                                description="Are you sure to delete this task?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => handleDelete(item.productId)}
                                                onCancel={() => { }}
                                            >
                                                <button>Xóa</button>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* buoc 2 phân trang và search */}
                        <Pagination
                            current={currentPage}
                            onChange={onPageChange}
                            pageSize={itemsPerPage}
                            total={products.length}
                            className="pagination_product"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
