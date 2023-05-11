import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import axios from 'axios'
import { homeAPI } from '../../config'
import Router from 'next/router'

const ManagementContact = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const handleGetAllContacts = async () => {
            const result = await axios.get(homeAPI + '/contact/get-all')
            setContacts(result.data)
            console.log(contacts);
        }
        handleGetAllContacts()
    }, [])
    return (
        <div className="management-contact-page">
            <Heading title="Quản lý thông tin liên hệ" />
            <div className="management-contact-box table-responsive">
                {contacts.length == 0 ? <p className='text-center'>Thông tin liên hệ chưa được cập nhật!</p> :
                    contacts.map((contact, index) => (
                        <table key={index} className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Thông tin liên hệ</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='fw-bold'>{index + 1}</td>
                                    <td className='fw-bold'>Địa chỉ</td>
                                    <td>{contact.address}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>{index + 2}</td>
                                    <td className='fw-bold'>Email</td>
                                    <td>{contact.email}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>{index + 6}</td>
                                    <td className='fw-bold'>Zalo</td>
                                    <td>{contact.zalo}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>{index + 3}</td>
                                    <td className='fw-bold'>Số điện thoại</td>
                                    <td>{contact.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>{index + 4}</td>
                                    <td className='fw-bold'>Facebook</td>
                                    <td>{contact.linkToFace}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>{index + 5}</td>
                                    <td className='fw-bold'>Messenger</td>
                                    <td>{contact.linkToMessenger}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>{index + 7}</td>
                                    <td className='fw-bold'>Youtube</td>
                                    <td>{contact.youtube}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>{index + 8}</td>
                                    <td className='fw-bold'>Instagram</td>
                                    <td>{contact.instagram}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>{index + 9}</td>
                                    <td className='fw-bold'>Tiktok</td>
                                    <td>{contact.tiktok}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>{index + 10}</td>
                                    <td className='fw-bold'>Website</td>
                                    <td>{contact.website}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={() => Router.push('/lien-he/chinh-sua')}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Chỉnh sửa</button>
                </span>
            </div>
        </div>
    )
}

export default ManagementContact