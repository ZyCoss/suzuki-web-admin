import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import axios from 'axios'
import { homeAPI } from '../../config'
import Router from 'next/router'

const ManagementOverview = () => {
  const [overviews, setOverviews] = useState([])

  useEffect(() => {
    const handleGetAllOverviews = async () => {
      const result = await axios.get(homeAPI + '/overview/get-all')
      setOverviews(result.data)
      console.log(overviews);
    }
    handleGetAllOverviews()
  }, [])

  return (
    <div className="management-contact-page">
      <Heading title="Quản lý thông tin tổng quan" />
      <div className="management-contact-box table-responsive">
        {overviews.length == 0 ? <p className='text-center'>Thông tin tổng quan chưa được cập nhật!</p> :
          overviews.map((overview, index) => (
            <table key={overview.id} className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Thông tin</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='fw-bold'>{index + 1}</td>
                  <td className='fw-bold'>Tiêu đề</td>
                  <td>{overview.heading}</td>
                </tr>
                <tr>
                  <td className='fw-bold'>{index + 2}</td>
                  <td className='fw-bold'>Năm hoạt động</td>
                  <td>{overview.yearOfOperation}</td>
                </tr>
                <tr>
                  <td className='fw-bold'>{index + 6}</td>
                  <td className='fw-bold'>Số lượng nhân viên</td>
                  <td>{overview.staff}</td>
                </tr>
                <tr>
                  <td className='fw-bold'>{index + 3}</td>
                  <td className='fw-bold'>Số xe đã bán</td>
                  <td>{overview.carsSold}</td>
                </tr>
                <tr>
                  <td className='fw-bold'>{index + 4}</td>
                  <td className='fw-bold'>Tỉ lệ KH hài lòng</td>
                  <td>{overview.customerSatisfied}</td>
                </tr>
              </tbody>
            </table>
          ))}
      </div>
      <div className="button-group w-100 text-center">
        <span onClick={() => Router.push('/tong-quan/chinh-sua')}>
          <button type="button" className="btn btn-success text-center visit-add-product-page">Chỉnh sửa</button>
        </span>
      </div>
    </div>
  )
}

export default ManagementOverview