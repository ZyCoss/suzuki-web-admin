import React, { useState, useEffect, useRef } from 'react'
import Heading from '@/components/Heading'
import Router from 'next/router'
import axios from 'axios'
import { homeAPI } from '@/config'
import { swalert, swtoast } from '@/mixins/swal.mixin'

const EditContact = () => {
    const [contacts, setContacts] = useState([])

    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [zalo, setZalo] = useState('')
    const [youtube, setYoutube] = useState('')
    const [linkToFace, setLinkToFace] = useState('')
    const [linkToMessenger, setLinkToMessenger] = useState('')
    const [instagram, setInstagram] = useState('')
    const [email, setEmail] = useState('')
    const [tiktok, setTiktok] = useState('')
    const [website, setWebsite] = useState('')

    const [err, setErr] = useState('')

    useEffect(() => {
        contacts && contacts.map((contact) => {
            setAddress(contact.address)
            setPhoneNumber(contact.phoneNumber)
            setEmail(contact.email)
            setInstagram(contact.instagram)
            setLinkToFace(contact.linkToFace)
            setLinkToMessenger(contact.linkToMessenger)
            setYoutube(contact.youtube)
            setTiktok(contact.tiktok)
            setZalo(contact.zalo)
            setWebsite(contact.website)
        })
    }, [contacts])

    useEffect(() => {
        const handleGetAllContacts = async () => {
            const result = await axios.get(homeAPI + '/contact/get-all')
            setContacts(result.data)
        }
        handleGetAllContacts()
    }, [])

    const updateContact = async () => {
        try {
            const result = await axios.put(homeAPI + '/contact/update', {
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                linkToFace: linkToFace,
                linkToMessenger: linkToMessenger,
                youtube: youtube,
                tiktok: tiktok,
                instagram: instagram,
                zalo: zalo,
                website: website
            })
            swtoast.success({
                text: 'Cập nhật thông tin liên hệ thành công!'
            })
            Router.push('/lien-he')
        } catch (error) {
            setErr(error.response.data.message)
            console.log(error);
        }
    }

    const createContact = async () => {
        try {
            const result = await axios.post(homeAPI + '/contact/create', {
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                linkToFace: linkToFace,
                linkToMessenger: linkToMessenger,
                youtube: youtube,
                tiktok: tiktok,
                instagram: instagram,
                zalo: zalo,
                website: website
            })
            swtoast.success({
                text: 'Thêm thông tin liên hệ thành công!'
            })
            Router.push('/lien-he')
        } catch (error) {
            setErr(error.response.data.message)
        }
    }

    return (
        <div className="management-contact-page">
            <Heading title="Chỉnh sửa thông tin liên hệ" />
            <div className="management-contact-box d-flex justify-content-between" >
                <div className="management-contact-item">
                    <label htmlFor='address'>Địa chỉ</label>
                    <input
                        className='w-100'
                        type="text"
                        placeholder='Đia chỉ'
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor="phoneNumber">Số điện thoại</label>
                    <input
                        className='w-100'
                        type="text"
                        id='phoneNumber'
                        placeholder='Số điện thoại'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor='zalo'>Zalo</label>
                    <input
                        className='w-100'
                        type="text"
                        id='zalo'
                        placeholder='Số điện thoại Zalo'
                        value={zalo}
                        onChange={(e) => setZalo(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor="email">Email</label>
                    <input
                        className='w-100'
                        type="text"
                        id='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor='linkToFace'>Đường dẫn tài khoản FB</label>
                    <input
                        className='w-100'
                        type="text"
                        id='linkToFace'
                        placeholder='URL Facebook'
                        value={linkToFace}
                        onChange={(e) => setLinkToFace(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor='linkToMessenger'>Đường dẫn Messenger</label>
                    <input
                        className='w-100'
                        type="text"
                        placeholder='URL Messenger (Chỉ lấy mã số)'
                        id='linkToMessenger'
                        value={linkToMessenger}
                        onChange={(e) => setLinkToMessenger(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor="youtube">Youtube</label>
                    <input
                        className='w-100'
                        type="text"
                        id='youtube'
                        placeholder='URL Youtube'
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor="tiktok">Tiktok</label>
                    <input
                        className='w-100'
                        type="text"
                        id='tiktok'
                        placeholder='URL Tiktok'
                        value={tiktok}
                        onChange={(e) => setTiktok(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor='instagram'>Instagram</label>
                    <input
                        className='w-100'
                        type="text"
                        id='instagram'
                        placeholder='URL Instagram'
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor='website'>Website</label>
                    <input
                        className='w-100'
                        type="text"
                        id='website'
                        placeholder='Ví dụ: 2023 Designed by Suzuki Cần Thơ'
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>
            </div>
            <div className="err-box">
                <p className='text-danger'>{err}</p>
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={createContact}>
                    <button type="button" className="btn btn-dark text-center visit-add-product-page">Tạo mới</button>
                </span>
                <span onClick={updateContact}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Hoàn thành</button>
                </span>
            </div>
        </div >
    )
}

export default EditContact