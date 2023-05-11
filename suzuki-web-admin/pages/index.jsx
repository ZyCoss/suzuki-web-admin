import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import ProductAdmin from '../components/ProductAdmin'
import Heading from '../components/Heading'
import Head from 'next/head'
import { swalert, swtoast } from "../mixins/swal.mixin";
import { useRouter } from 'next/router'
import $ from 'jquery'
import Link from 'next/link'
import { homeAPI } from "../config"
import Router from 'next/router'
const ADDPRODUCT_URL = `${homeAPI}/admin/add-product`

const typeProducts = ['Xe du lịch', 'Xe thương mại']

const adminPage = () => {

  const [products, setProducts] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      fetch(`${homeAPI}/admin`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ',
        }
      })
        .then((res) => res.json())
        .then((products) => {
          console.log(products)
          setProducts(products)
        })
    }
    getProducts();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  const refreshProduct = async () => {
    const result = await axios.get(homeAPI + '/admin')
    setProducts(result.data)
  }


  const handleDeleteAll = async () => {
    const body = {
      isDeleteAll: true
    }
    swalert
      .fire({
        title: "Xóa tất cả xe",
        icon: "warning",
        text: "Bạn muốn xóa tất cả xe?",
        showCloseButton: true,
        showCancelButton: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.post(`${homeAPI}/admin/delete`, body)
            setProducts(response.data)
          } catch (err) {
            console.log(err)
          }
        }
      })
  }

  return (
    <div className="admin-page">
      <Head>
        <title>Tất cả xe</title>
      </Head>

      <Heading title='Tất cả xe' />
      <div className="all-product">
        <table className='table product-admin w-100'>
          <thead className="w-100 text-center">
            <tr className="fs-6 w-100 d-flex align-items-center justify-content-around">
              <th title='Ảnh xe' className="">Ảnh</th>
              <th title='Tên xe' className="name">Tên xe</th>
              <th title='Giá xe' className="">Giá</th>
              <th title="Thời gian thêm xe" className="createAt">Nổi bật</th>
              <th title="Thao tác với xe" className="manipulation">Thao tác</th>
            </tr>
          </thead>
        </table>
        {products?.length
          ? (
            products.map((item, index) => {
              return (
                <div key={index} className="">
                  <ProductAdmin
                    name={item.name}
                    price={item.price}
                    src={item.src}
                    imageTemp={item.imageTemp}
                    href={item.id}
                    created={item.created}
                    state={item.state}
                    id={item.id}
                    outStanding={item.outStanding}
                    refreshProduct={refreshProduct}
                  />
                </div>
              )
            }
            )
          ) : <p className="product-empty text-center w-100">Hiện tại chưa có xe nào được tải lên!</p>
        }
        <table className='table product-admin w-100'>
          <tbody className="w-100 text-center">
            <tr className="fs-6 w-100">
              <th className="">Tổng cộng:</th>
              <th className="">{products.length}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="button-group w-100 text-center">
        <span onClick={() => Router.push('/them-xe')}>
          <button type="button" className="btn btn-success text-center visit-add-product-page">Thêm xe</button>
        </span>
        {
          products?.length ? (
            <button type="button" onClick={handleDeleteAll} className="btn btn-danger text-center delete-all-product">Xóa tất cả</button>
          ) : ''
        }
      </div>
    </div>
  )
}

export default adminPage
