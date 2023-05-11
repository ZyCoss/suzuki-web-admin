import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import axios from 'axios'
import { swalert, swtoast } from '@/mixins/swal.mixin'
import { homeAPI } from '@/config'
import Router from 'next/router'

const Intro = () => {
    const [introList, setIntroList] = useState([])

    useEffect(() => {
        const handleGetIntro = async () => {
            try {
                const result = await axios.get(homeAPI + '/intro/get-all')
                setIntroList(result.data)
            } catch (error) {
                swtoast.error({
                    text: error
                })
            }
        }

        handleGetIntro()

    }, [])

    return (
        <div className='intro-page'>
            <Heading title="Thông tin giới thiệu" />
            <div className="intro-box">
                {introList.length == 0 ? <p className='text-center'>Thông tin giới thiệu chưa được cập nhật!</p> :
                    introList && introList.map((item, index) => {
                        return (
                            <table key={index} className="table table-intro">
                                <thead>
                                    <tr>
                                        <th className='text-uppercase text-center'>Giới thiệu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {item.intro}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )
                    })
                }
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={() => Router.push('/gioi-thieu/chinh-sua')}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Chỉnh sửa</button>
                </span>
            </div>
        </div>
    )
}

export default Intro