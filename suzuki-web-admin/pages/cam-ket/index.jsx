import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import axios from 'axios'
import { homeAPI } from '../../config'
import Router from 'next/router'
import UndertakeItem from '@/components/UndertakeItem'
import { iconList, initUndertake } from '@/datas/undertakeData'

const ManagementUndertake = () => {
    const [undertake, setUndertake] = useState([])
    const [note, setNote] = useState('')

    useEffect(() => {
        const handleGetAllUndertake = async () => {
            const result = await axios.get(homeAPI + '/undertake/get-all')
            setUndertake(result.data)

        }
        handleGetAllUndertake()
    }, [])

    useEffect(() => {
        if (undertake.length == 0) {
            setUndertake(initUndertake)
            setNote("Hiện tại chưa có thông tin cam kết, trên đây chỉ là bố cục mẫu!")
        } else {
            setNote('')
        }
    }, [undertake])

    return (
        <div className="management-contact-page">
            <Heading title="Quản lý thông tin cam kết" />
            <div className="management-contact-box table-responsive">
                {
                    undertake.map((item, index) => (
                        <div key={index} className="undertake-wrapper position-relative">
                            <Heading title={item.heading} />
                            <div className="undertake-box d-flex flex-wrap justify-content-around">
                                {item.title && item.description && iconList && item.title.map((title, index) => (
                                    <UndertakeItem
                                        key={index}
                                        icon={iconList[index]}
                                        title={title}
                                        des={item.description[index]}
                                    />
                                ))}
                            </div>
                            <p className='text-center'>{note}</p>
                        </div>
                    ))
                }
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={() => Router.push('/cam-ket/chinh-sua')}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Chỉnh sửa</button>
                </span>
            </div>
        </div>
    )
}

export default ManagementUndertake