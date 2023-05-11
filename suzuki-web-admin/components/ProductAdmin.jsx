import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { swalert, swtoast } from "../mixins/swal.mixin";
import { homeAPI } from "../config"
import { FaTrash, FaEdit, FaClipboardList } from "react-icons/fa"
import { Image, Switch } from 'antd';

const ProductAdmin = (props) => {
    const [products, setProducts] = useState([])
    const time = new Date(props.created)
    const createAt = time.toLocaleDateString()
    const [disabledInputState, setDisabledInputState] = useState(false);

    const addPointToPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const deleteProduct = async (id) => {
        const body = {
            id: id,
            isDeleteAll: false
        }
        console.log(id);
        swalert
            .fire({
                title: "Xác nhận xóa xe",
                icon: "warning",
                text: "Bạn chắc chắn muốn xóa xe?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post(`${homeAPI}/admin/delete`, body);
                        const productsList = products.filter(product => product.id !== id)
                        setProducts(productsList);
                        props.refreshProduct()
                        swtoast.success({
                            text: "Xe đã được xóa!!",
                        });
                    } catch (err) {
                        if (err.response.status === 400) {
                            console.log("Product id is required!")
                        }
                        console.log(`Error: ${err.message}`);
                        swtoast.error({
                            text: "Đã xảy ra lỗi khi xóa xe. Vui lòng reload lại trang!",
                        });
                    }
                }
            })
    }

    const handleUpdateOutStandingState = async (outStanding) => {
        if (outStanding) {
            try {
                setDisabledInputState(true)
                await axios.put(homeAPI + '/admin/on-out-standing',
                    { product_id: [props.id] })
                setDisabledInputState(false)
                props.refreshProduct()
            } catch (e) {
                console.log(e)
                props.refreshProduct()
                setDisabledInputState(false)
                swtoast.error({ text: 'Xảy ra lỗi khi mở sản phẩm vui lòng thử lại!' })
            }
        } else {
            try {
                setDisabledInputState(true)
                await axios.put(homeAPI + '/admin/off-out-standing',
                    { product_id: [props.id] })
                setDisabledInputState(false)
                props.refreshProduct()
            } catch (e) {
                console.log(e)
                props.refreshProduct()
                setDisabledInputState(false)
                swtoast.error({ text: 'Xảy ra lỗi khi tắt sản phẩm vui lòng thử lại!' })
            }
        }
    };

    const handleUpdateState = async (state) => {
        if (state) {
            try {
                setDisabledInputState(true)
                await axios.put(homeAPI + '/admin/on',
                    { product_id: [props.id] })
                setDisabledInputState(false)
                props.refreshProduct()
            } catch (e) {
                console.log(e)
                props.refreshProduct()
                setDisabledInputState(false)
                swtoast.error({ text: 'Xảy ra lỗi khi mở sản phẩm vui lòng thử lại!' })
            }
        } else {
            try {
                setDisabledInputState(true)
                await axios.put(homeAPI + '/admin/off',
                    { product_id: [props.id] })
                setDisabledInputState(false)
                props.refreshProduct()
            } catch (e) {
                console.log(e)
                props.refreshProduct()
                setDisabledInputState(false)
                swtoast.error({ text: 'Xảy ra lỗi khi tắt sản phẩm vui lòng thử lại!' })
            }
        }
    };

    return (
        <div className="table-responsive">
            <table className="table align-middle product-admin w-100">
                <tbody className='w-100 text-center'>
                    <tr className="w-100 d-flex align-items-center justify-content-between">
                        <td className="">
                            <Image src={props.src || props.imageTemp} alt={props.name} />
                        </td>
                        <td className="name"><p>{props.name}</p></td>
                        <td className="text-danger fw-bold"><p>{addPointToPrice(props.price)} VNĐ</p></td>
                        <td className="createAt">
                            <Switch
                                checked={props.outStanding}
                                onChange={handleUpdateOutStandingState}
                                disabled={disabledInputState}
                                size="small"
                                title="Hiện / Ẩn sản phẩm ở trang chủ"
                            />
                        </td>
                        <td className="d-none d-sm-flex justify-content-around align-items-center manipulation">
                            <Switch
                                title="Hiện / Ẩn sản phẩm"
                                checked={props.state}
                                onChange={handleUpdateState}
                                disabled={disabledInputState}
                                size="small"
                            />
                            <Link title='Cập nhật thông tin xe' href={props.href}>
                                <FaEdit className="text-dark" />
                            </Link>
                            <FaTrash title='Xóa xe' className="text-dark trash" onClick={() => deleteProduct(props.href)} />
                            {/* <button onClick={() => deleteProduct(props.href)} className="btn btn-danger manipulation-btn">Xóa</button> */}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductAdmin