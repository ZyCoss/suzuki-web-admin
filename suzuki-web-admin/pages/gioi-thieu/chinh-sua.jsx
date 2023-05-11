import React, { useState, useEffect, useRef } from 'react'
import Heading from '@/components/Heading'
import { Input } from 'antd';
import axios from 'axios';
import { homeAPI } from '@/config';
import { swalert, swtoast } from '@/mixins/swal.mixin';
import Router from 'next/router';

const { TextArea } = Input;

const EditIntroComponent = () => {
    const [introList, setIntroList] = useState([])

    const [intro, setIntro] = useState('')
    const [err, setErr] = useState('')
    const introRef = useRef()

    useEffect(() => {
        introRef.current.focus()
    })

    useEffect(() => {
        if(introList.length > 0) {
            setIntro(introList[0].intro);
            console.log(introList);
        }
    }, [introList])

    useEffect(() => {
        const getIntroList = async () => {
            const result = await axios.get(homeAPI + '/intro/get-all')
            console.log(result);
            setIntroList(result.data);
        }

        getIntroList()
    }, [])

    const updateIntro = async () => {
        try {
            const result = await axios.put(homeAPI + '/intro/update', {
                intro: intro
            })
            swtoast.success({
                text: 'Cập nhật thông tin giới thiệu thành công!'
            })
            Router.push('/gioi-thieu')
        } catch (error) {
            setErr(error.response.data.message)
            console.log(error);

        }
    }


    const createIntro = async () => {
        try {
            const result = await axios.post(homeAPI + '/intro/create', {
                intro: intro,
            })
            swtoast.success({
                text: 'Thêm thông tin giới thiệu thành công!'
            })
            Router.push('/gioi-thieu')
        } catch (error) {
            setErr(error.response.data.message)
        }
    }

    return (
        <div className="update-intro-box">
            <Heading title="Chỉnh sửa thông tin giới thiệu" />
            <TextArea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="Thông tin giới thiệu"
                defaultValue={intro}
                allowClear='true'
                showCount='true'
                onPressEnter={updateIntro}
                ref={introRef}
                autoSize={{
                    minRows: 4,
                    maxRows: 10,
                }}
            />
            <div className="err-box">
                <p className='text-danger'>{err}</p>
            </div>
            <div className="recommend-box">
                <span>Gợi ý:</span>
                <ol>
                    <li>
                        <p>Chào mừng quý khách đến với showroom ô tô Suzuki tại Cần Thơ - một trong những đại lý chính hãng của Suzuki tại Việt Nam. Với không gian rộng rãi và hiện đại, showroom của chúng tôi tự hào là địa điểm tốt nhất để quý khách khám phá và trải nghiệm các dòng xe Suzuki mới nhất.</p>
                    </li>
                    <li>
                        <p>Chào mừng quý khách đến với showroom ô tô Suzuki Cần Thơ - nơi cung cấp các sản phẩm xe mới nhất và dịch vụ bảo trì chất lượng cao. Hãy đến và trải nghiệm sự thú vị của việc sở hữu một chiếc xe Suzuki!</p>
                    </li>
                    <li>
                        <p>Showroom ô tô Suzuki Cần Thơ là một trong những đại lý chính hãng của Suzuki tại Việt Nam, với không gian rộng rãi và hiện đại, chúng tôi cam kết cung cấp cho quý khách những sản phẩm và dịch vụ tốt nhất. Ngoài ra, đội ngũ nhân viên chuyên nghiệp và giàu kinh nghiệm của chúng tôi sẵn sàng hỗ trợ quý khách để tìm kiếm và chọn lựa chiếc xe phù hợp với nhu cầu và sở thích của mình. Hãy đến với chúng tôi để trải nghiệm sự khác biệt của Suzuki và sự tận tâm của đội ngũ nhân viên tại showroom ô tô Suzuki Cần Thơ.</p>
                    </li>
                </ol>
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={createIntro}>
                    <button type="button" className="btn btn-dark text-center visit-add-product-page">Tạo mới</button>
                </span>
                <span onClick={updateIntro}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Hoàn thành</button>
                </span>
            </div>
        </div>
    )
}

export default EditIntroComponent