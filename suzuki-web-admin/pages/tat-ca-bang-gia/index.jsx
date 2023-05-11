import React, { useRef, useState, useEffect } from 'react'
import PriceTableItem from '../../components/PriceTableItem'
import Heading from '../../components/Heading'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import { swalert, swtoast } from "../../mixins/swal.mixin";
import $ from 'jquery'
import { homeAPI } from '../../config'

const PriceTableManagePage = () => {
    const [priceTable, setPriceTable] = useState([])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getPriceTable = async () => {
            fetch(homeAPI + '/admin/find-all-price-table', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ',
                }
            })
                .then((res) => res.json())
                .then((priceTable) => {
                    console.log(priceTable)
                    setPriceTable(priceTable)
                })
        }
        getPriceTable();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const refreshProduct = async () => {
        const result = await axios.get(homeAPI + '/admin/find-all-price-table')
        setPriceTable(result.data)
    }

    const handleDeleteAll = async () => {
        const body = {
            isDeleteAll: true
        }
        swalert
            .fire({
                title: "Xóa tất cả bảng giá",
                icon: "warning",
                text: "Bạn muốn xóa tất cả bảng giá?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post(`${homeAPI}/admin/delete-price-table`, body)
                        setPriceTable(response.data)
                    } catch (err) {
                        console.log(err)
                    }
                }
            })
    }

    return (
        <div className='price-table-manage-page'>
            <Head>
                <title>Quản lý bảng giá</title>
            </Head>

            <div className="price-table-manage-group">
                <Heading title='Quản lý bảng giá' />
                {priceTable?.length ? (
                    priceTable.map((item, index) => {
                        return (
                            <PriceTableItem
                                key={index}
                                id={item.id}
                                nameCar={item.nameCar}
                                srcCar={item.srcCar}
                                version={item.version}
                                price={item.price}
                                refreshProduct={refreshProduct}
                            />
                        )
                    })
                ) : <p className="product-empty text-center w-100">Hiện tại danh sách bảng giá đang trống!</p>
                }
            </div>
            <div className="button-group w-100 text-center">
                <Link href="/tat-ca-bang-gia/them-bang-gia">
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Thêm bảng giá</button>
                </Link>
                {
                    priceTable?.length ? (
                        <button type="button" onClick={handleDeleteAll} className="btn btn-danger text-center delete-all-product">Xóa tất cả</button>
                    ) : ''
                }
            </div>
        </div >
    )
}

export default PriceTableManagePage