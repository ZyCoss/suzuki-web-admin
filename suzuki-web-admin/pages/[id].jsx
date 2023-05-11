import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Heading from '../components/Heading'
import Head from 'next/head'
import { swalert, swtoast } from "../mixins/swal.mixin";
import { useRouter } from 'next/router'
import CKeditor from '../components/CKeditor'
const EDITPRODUCT_URL = `${homeAPI}/admin/`
import { homeAPI, feAPI } from "../config"

const EditProduct = ({ car }) => {
    const router = useRouter();
    const productId = router.query.id;
    const [carDetail, setCarDetail] = useState({});
    const { name, price, description, moreInfo, src, type, newProduct } = carDetail;
    const nameRef = useRef();
    const priceRef = useRef();
    const srcRef = useRef();
    const [productName, setProductName] = useState(name);
    const [productPrice, setProductPrice] = useState(price || '');
    const [productDescription, setProductDescription] = useState(description || '');
    const [productMoreInfo, setProductMoreInfo] = useState(moreInfo || '');
    const [productSrc, setProductSrc] = useState(src || '');
    const [productType, setProductType] = useState(type || '');
    const [productNewProduct, setProductNewProduct] = useState(newProduct);
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setProductName(carDetail.name);
        setProductPrice(carDetail.price || '');
        setProductDescription(carDetail.description || '');
        setProductMoreInfo(carDetail.moreInfo || '');
        setProductSrc(carDetail.src || carDetail.imageTemp || '');
        setProductType(carDetail.type || '');
        setProductNewProduct(carDetail.newProduct);
    }, [carDetail]);

    useEffect(() => {
        const selectedCar = car.find(item => item.id == productId);
        setCarDetail(selectedCar || {});
    }, [car, productId]);

    console.log(carDetail, name);

    const [err, setErr] = useState('')

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    const handleEditProduct = async (e) => {
        e.preventDefault();
        if (!productName) {
            setErr("Tên xe không được để trống!");
            nameRef.current.focus();
            return
        }
        if (!productPrice) {
            setErr("Giá xe không được để trống!");
            priceRef.current.focus();
            return
        }
        if (!productSrc) {
            setErr("Link ảnh không được để trống!");
            srcRef.current.focus();
            return
        }
        try {

            const body = {
                name: productName,
                price: productPrice,
                description: productDescription,
                moreInfo: productMoreInfo,
                imageTemp: productSrc,
                type: productType,
                newProduct: productNewProduct
            }
            const response = await axios.put(EDITPRODUCT_URL + `${productId}`, body
                ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ',
                    },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data));
            console.log(response?.data);
            console.log(JSON.stringify(response))
            swtoast.success({
                text: "Cập nhật thông tin xe thành công!!",
            });
            window.location.assign(feAPI + '/')
        } catch (err) {
            if (!err?.response) {
                setErr("No server response")
            } else if (err.response.status === 400) {
                setErr("Tên xe, giá, link ảnh, mô tả không được để trống!")
            } else if (err.response.status === 401) {
                setErr('Unauthorized')
            } else if (err.response.status === 422) {
                setErr("Xe đã tồn tại!")
                swtoast.error({
                    text: "Xe này đã tồn tại!!",
                });
                nameRef.current.focus();
            } else {
                setErr("Cập nhật thông tin xe thất bại!");
            }
            console.log(err);
        }
        console.log(err);
    }
    return (
        <div className="admin-page">
            <Head>
                <title>Cập nhật thông tin xe</title>
            </Head>
            <div className='addProduct editProduct'>
                <Heading title='Cập nhật thông tin xe' />
                <div className="add-infor-product">
                    <form id='add-product-form' action="" onSubmit={handleEditProduct}>
                        <label htmlFor="name" className='fw-bold'>Tên xe:</label>
                        <input
                            id="name"
                            placeholder="Nhập tên xe"
                            type="text"
                            className="w-100"
                            ref={nameRef}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <div className="line-2 d-flex w-100 flex-row flex-wrap justify-content-around">
                            <div>
                                <label className="d-block fw-bold" htmlFor="price">Giá:</label>
                                <input
                                    id="price"
                                    type="text"
                                    className=''
                                    placeholder="Ví dụ: 1.200.000.000, 560.000.000"
                                    ref={priceRef}
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="d-block fw-bold" htmlFor="src">Link ảnh:</label>
                                <input
                                    id="src"
                                    type="text"
                                    placeholder="Dán link ảnh"
                                    ref={srcRef}
                                    value={productSrc}
                                    onChange={(e) => setProductSrc(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="line-3 d-flex w-100 flex-row flex-wrap justify-content-left" onClick={() => {
                            setErr('Hiện tại chưa thể thay đổi thông tin này!')
                        }}>
                            <div className="d-flex align-items-center">
                                <label className='fw-bold' htmlFor="type">Loại xe:</label>
                                <select disabled name="" id="type" onChange={(e) => setType(e.target.value)} >
                                    <option value={productType}>{productType}</option>
                                    <option value={productType == 'Xe du lịch' ? 'Xe tải' : 'Xe du lịch'}>{productType == 'Xe du lịch' ? 'Xe tải' : 'Xe du lịch'}</option>
                                </select>
                            </div>
                            {/* Hiện tại thay đổi được từ true -> false, không thay đổi được ngược lại */}
                            <div className="d-flex align-items-center">
                                <label htmlFor="newProduct" className="fw-bold">Xe mới:</label>
                                <input disabled value={productNewProduct} onChange={(e) => setProductNewProduct(!carDetail.newProduct)} id="newProduct" type="checkbox" defaultChecked={newProduct} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="d-block w-100 fw-bold">Mô tả:</label>
                            <CKeditor
                                init="Hello"
                                Placeholder={{ placeholder: "Mô tả thông tin xe ..." }}
                                name="description"
                                id="description"
                                form="add-product-form"
                                data={productDescription}
                                onChange={(data) => {
                                    setProductDescription(data);
                                }}
                                editorLoaded={editorLoaded}
                            />
                        </div>
                        <div style={{ margin: "10px 0" }} className="col-12">
                            <label htmlFor="more-info" className="d-block w-100 fw-bold">Thông tin chi tiết:</label>
                            <CKeditor
                                editorLoaded={editorLoaded}
                                id="more-info"
                                Placeholder={{ placeholder: "Thông tin chi tiết xe ..." }}
                                name="more-info"
                                form="add-product-form"
                                data={productMoreInfo}
                                onChange={(data) => {
                                    setProductMoreInfo(data);
                                }}
                            />
                        </div>
                        <p className="text-danger">{err}</p>
                        <div className="submit-wrapper w-100 text-center"><button onClick={(e) => handleEditProduct(e)} type="submit" className="submit-btn">Lưu</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct


export async function getServerSideProps({ params }) {
    const { id } = params;

    try {
        const res2 = await fetch(homeAPI + '/admin');
        const allCars = await res2.json();

        const car = allCars

        return {
            props: {
                car,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }
}