import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import ProductAdmin from '../../components/ProductAdmin'
import Heading from '../../components/Heading'
import Head from 'next/head'
import { swalert, swtoast } from "../../mixins/swal.mixin";
import { FaTrash } from "react-icons/fa"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { homeAPI } from "../../config"
import Router from 'next/router'
import { Input } from 'antd'
const { Search } = Input;

const adminPage = () => {

    const [colors, setColors] = useState([])
    const [newColor, setNewColor] = useState('')
    const newColorRef = useRef()
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        newColorRef.current.focus()
    }, [])

    const addColor = async (e) => {
        // e.preventDefault()
        if (!newColor) {
            swtoast.error({
                text: "Vui lòng nhập màu muốn thêm!!"
            })
            newColorRef.current.focus()
            return
        }
        try {
            const result = await axios.post(homeAPI + '/color/create', {
                name: newColor
            })
            refreshColors()
            setNewColor('')
            swtoast.success({
                text: "Màu xe được thêm thành công!!",
            });
        } catch (error) {
            swtoast.error({
                text: "Màu xe này đã tồn tại!!",
            });
        }

    }

    const router = useRouter()
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getColors = async () => {
            fetch(`${homeAPI}/color/get-all`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer',
                }
            })
                .then((res) => res.json())
                .then((colors) => {
                    console.log(colors)
                    setColors(colors)
                })
        }
        getColors();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const refreshColors = async () => {
        const result = await axios.get(homeAPI + '/color/get-all')
        setColors(result.data)
    }

    const deleteColor = async (id) => {
        console.log(id);
        swalert
            .fire({
                title: "Xác nhận xóa màu xe",
                icon: "warning",
                text: "Bạn chắc chắn muốn xóa màu xe?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.delete(`${homeAPI}/color/delete/${id}`);
                        const ColorList = colors.filter(color => color.id !== id)
                        setColors(ColorList);
                        // props.refreshProduct()
                        swtoast.success({
                            text: "Màu xe đã được xóa!!",
                        });
                    } catch (err) {
                        console.log(`Error: ${err.message}`);
                        swtoast.error({
                            text: "Đã xảy ra lỗi khi xóa màu xe. Vui lòng reload lại trang!",
                        });
                    }
                }
            })
    }

    return (
        <div className="admin-page">
            <Head>
                <title>Quản lý màu xe</title>
            </Head>

            <Heading title='Quản lý màu xe' />
            <div className="" style={{maxWidth: "50%", margin: "0 auto"}}>
                <div className="" style={{margin: "12px 0 20px"}}>
                    <table className="d-flex justify-content-center align-items-center">
                        <tbody>
                            <tr className="fs-6 w-100 d-flex align-items-center justify-content-around">
                                <th className="">
                                    <Search
                                        id="newColor"
                                        value={newColor}
                                        onChange={(e) => setNewColor(e.target.value)}
                                        ref={newColorRef}
                                        placeholder='Thêm màu xe'
                                        onPressEnter={addColor}
                                        enterButton="Enter"
                                        onSearch={addColor}
                                    />
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="all-product">
                    <table className='table product-admin w-100'>
                        <thead className="w-100 text-center">
                            <tr className="fs-6 w-100 d-flex align-items-center justify-content-around">
                                <th title='Tên xe' className="name">Màu xe</th>
                                <th title="Thao tác với xe" className="manipulation">Xóa</th>
                            </tr>
                        </thead>
                    </table>
                    {colors?.length
                        ? (
                            colors.map((item, index) => {
                                return (
                                    <div key={index} className="">
                                        <div className="table-responsive">
                                            <table className="table align-middle product-admin w-100">
                                                <tbody className='w-100 text-center'>
                                                    <tr className="w-100 d-flex align-items-center justify-content-around">
                                                        <td className="name"><p>{item.name}</p></td>
                                                        <td className="d-none d-sm-flex justify-content-around align-items-center manipulation">
                                                            <FaTrash title='Xóa xe' className="text-dark trash" onClick={() => deleteColor(item.id)} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        ) : <p className="product-empty text-center w-100">Hiện tại danh sách màu xe đang trống, vui lòng thêm màu xe trước khi thêm xe!</p>
                    }
                    <table className='table product-admin w-100'>
                        <tbody className="w-100 text-center">
                            <tr className="fs-6 w-100">
                                <th className="">Tổng cộng:</th>
                                <th className="">{colors.length}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default adminPage
