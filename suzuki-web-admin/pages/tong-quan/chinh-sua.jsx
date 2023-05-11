import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import Router from 'next/router'
import axios from 'axios'
import { homeAPI } from '@/config'
import { swalert, swtoast } from '@/mixins/swal.mixin'

const EditOverview = () => {
    const [overviews, setOverviews] = useState([])

    const [heading, setHeading] = useState('')
    const [staff, setStaff] = useState('')
    const [yearOfOperation, setYearOfOperation] = useState('')
    const [carsSold, setCarsSold] = useState('')
    const [customerSatisfied, setCustomerSatisfied] = useState('')
    const [err, setErr] = useState('')

    useEffect(() => {
        overviews && overviews.map((overview) => {
            setHeading(overview.heading)
            setStaff(overview.staff)
            setYearOfOperation(overview.yearOfOperation)
            setCarsSold(overview.carsSold)
            setCustomerSatisfied(overview.customerSatisfied)
        })
    }, [overviews])

    useEffect(() => {
        const handleGetAllOverviews = async () => {
            const result = await axios.get(homeAPI + '/overview/get-all')
            setOverviews(result.data)
        }
        handleGetAllOverviews()
    }, [])

    const updateOverview = async () => {
        try {
            const result = await axios.put(homeAPI + '/overview/update', {
                heading: heading,
                staff: staff,
                yearOfOperation: yearOfOperation,
                carsSold: carsSold,
                customerSatisfied: customerSatisfied
            })
            swtoast.success({
                text: 'Cập nhật thông tin tổng quan thành công!'
            })
            Router.push('/tong-quan')
        } catch (error) {
            setErr(error.response.data.message)
            console.log(error);
        }
    }

    const createOverview = async () => {
        try {
            const result = await axios.post(homeAPI + '/overview/create', {
                heading: heading,
                staff: staff,
                yearOfOperation: yearOfOperation,
                carsSold: carsSold,
                customerSatisfied: customerSatisfied
            })
            swtoast.success({
                text: 'Thêm thông tin tổng quan thành công!'
            })
            Router.push('/tong-quan')
        } catch (error) {
            setErr(error.response.data.message)
        }
    }

    return (
        <div className="management-contact-page">
            <Heading title="Chỉnh sửa thông tin tổng quan" />
            <div className="management-contact-box d-flex flex-wrap justify-content-start" >
                <div className="management-contact-item">
                    <label htmlFor='heading'>Tiêu đề</label>
                    <input
                        className='w-100'
                        type="text"
                        placeholder='Tiêu đề'
                        id='heading'
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor="staff">Nhân viên</label>
                    <input
                        className='w-100'
                        type="text"
                        id='staff'
                        placeholder='Số lượng nhân viên (Ví dụ: 150+)'
                        value={staff}
                        onChange={(e) => setStaff(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor='yearOfOperation'>Năm hoạt động</label>
                    <input
                        className='w-100'
                        type="text"
                        id='yearOfOperation'
                        placeholder='Năm hoạt động (Ví dụ: 17+)'
                        value={yearOfOperation}
                        onChange={(e) => setYearOfOperation(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor="carsSold">Xe đã bán</label>
                    <input
                        className='w-100'
                        type="text"
                        id='carsSold'
                        placeholder='Số xe đã bán (Ví dụ: 2500+)'
                        value={carsSold}
                        onChange={(e) => setCarsSold(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor='customerSatisfied'>KH hài lòng</label>
                    <input
                        className='w-100'
                        type="text"
                        id='customerSatisfied'
                        placeholder='% khách hàng hài lòng (Ví dụ: 98%)'
                        value={customerSatisfied}
                        onChange={(e) => setCustomerSatisfied(e.target.value)}
                    />
                </div>
            </div>
            <div className="err-box">
                <p className='text-danger'>{err}</p>
            </div>
            <div className="recommend-box">
                <span>Lưu ý:</span>
                <ol>
                    <li>
                        <p>Nếu tiêu đề rỗng, tất cả thông tin sẽ không được hiển thị trên website.</p>
                    </li>
                    <li>
                        <p>Nên thiết lập từ 4 đến 5 thông tin để giao diện website cân đối hơn.</p>
                    </li>
                </ol>
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={createOverview}>
                    <button type="button" className="btn btn-dark text-center visit-add-product-page">Tạo mới</button>
                </span>
                <span onClick={updateOverview}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Hoàn thành</button>
                </span>
            </div>
        </div >
    )
}

export default EditOverview