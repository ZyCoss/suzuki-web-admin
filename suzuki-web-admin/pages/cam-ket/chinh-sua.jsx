import { homeAPI } from '@/config';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Router from 'next/router'
import Heading from '@/components/Heading';
import { swalert, swtoast } from '@/mixins/swal.mixin';
import { Input } from 'antd';
const { TextArea } = Input;
import { iconList } from '@/datas/undertakeData'
import { PlusOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons'

function CreateUndertake() {
    const [undertake, setUndertake] = useState([])
    const [heading, setHeading] = useState('');
    const [titleList, setTitleList] = useState([]);
    const [descriptionList, setDescriptionList] = useState([]);
    const [err, setErr] = useState('')

    useEffect(() => {
        undertake && undertake.map((item) => {
            setHeading(item.heading)
            setTitleList(item.title)
            setDescriptionList(item.description)
        })
        console.log(undertake);
        console.log();
    }, [undertake])

    useEffect(() => {
        const handleGetAllUndertake = async () => {
            const result = await axios.get(homeAPI + '/undertake/get-all')
            setUndertake(result.data)
        }
        handleGetAllUndertake()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(homeAPI + '/undertake/create', {
                heading,
                titleList: titleList.map(title => ({ title })),
                descriptionList: descriptionList.map(description => ({ description })),
            });
            swtoast.success({
                text: 'Thêm thông tin cam kết thành công!'
            })
            Router.push('/cam-ket')
        } catch (error) {
            console.error(error.message);
            setErr(error.response.data.message)
        }
    };

    const updateUndertake = async () => {
        try {
            const result = await axios.put(homeAPI + '/undertake/update', {
                heading: heading,
                titleList: titleList.map(title => ({ title })),
                descriptionList: descriptionList.map(description => ({ description })),
            })
            swtoast.success({
                text: 'Cập nhật thông tin cam kết thành công!'
            })
            Router.push('/cam-ket')
        } catch (error) {
            setErr(error.response.data.message)
            console.log(error);
        }
    }

    const handleAddTitle = () => {
        if (titleList.length < 3) {
            setTitleList([...titleList, '']);
        } else {
            setErr("Chỉ được tối đa 3 tiêu đề phụ!!")
            swtoast.error({
                text: "Chỉ được tối đa 3 tiêu đề phụ!!"
            })
        }
    };

    const handleRemoveTitle = (index) => {
        setTitleList([...titleList.slice(0, index), ...titleList.slice(index + 1)]);
    };

    const handleTitleChange = (index, value) => {
        setTitleList([...titleList.slice(0, index), value, ...titleList.slice(index + 1)]);
    };

    const handleAddDescription = () => {
        if (descriptionList.length < 3) {
            setDescriptionList([...descriptionList, '']);
        } else {
            setErr("Chỉ được tối đa 3 nội dung mô tả!!")
            swtoast.error({
                text: "Chỉ được tối đa 3 nội dung mô tả!!"
            })
        }
    };

    const handleRemoveDescription = (index) => {
        setDescriptionList([...descriptionList.slice(0, index), ...descriptionList.slice(index + 1)]);
    };

    const handleDescriptionChange = (index, value) => {
        setDescriptionList([...descriptionList.slice(0, index), value, ...descriptionList.slice(index + 1)]);
    };

    return (
        <div className="update-undertake-wp management-contact-page">
            <Heading title="Chỉnh sửa thông tin cam kết" />
            <div className='management-contact-box'>
                <div className="undertake-row row d-flex align-items-center">
                    <label className='col-3 fw-bold'>Tiêu đề</label>
                    <div className="col-7">
                        <Input
                            placeholder="Tiêu đề"
                            className='w-100'
                            type="text"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                        />
                    </div>
                </div>
                <div className=''>
                    {iconList && titleList.map((title, index) => (
                        <div className='row d-flex align-items-center undertake-row-item' key={index}>
                            <label className='col-3 fw-bold'>Tiều đề phụ {index + 1}</label>
                            <div className="col-7 d-flex">
                                <Input
                                    placeholder={`Tiêu đề phụ ${index + 1}`}
                                    className='w-100'
                                    type="text"
                                    value={title}
                                    onChange={(e) => handleTitleChange(index, e.target.value)}
                                />
                                <button title="icon phù hợp với từng tiêu đề phụ" className='btn btn-light d-flex justify-content-center align-items-center' type="button">
                                    {iconList[index]}
                                </button>
                                <button title="Xóa tiêu đề phụ" className='btn btn-dark d-flex justify-content-center align-items-center' type="button" onClick={() => handleRemoveTitle(index)}>
                                    <MinusOutlined />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-7">
                            <button title="Thêm tiêu đề phụ" className='w-100 btn btn-light d-flex justify-content-center align-items-center' type="button" onClick={handleAddTitle}>
                                <PlusOutlined />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {descriptionList.map((description, index) => (
                        <div className='row d-flex align-items-center undertake-row-item' key={index}>
                            <label className='col-3 fw-bold'>Mô tả {index + 1}</label>
                            <div className="col-7 d-flex">
                                <TextArea
                                    value={description}
                                    className="w-100"
                                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                    placeholder={`Mô tả ${index + 1}`}
                                    defaultValue={description}
                                    allowClear='true'
                                    size="small"
                                    autoSize={{
                                        minRows: 4,
                                        maxRows: 10,
                                    }}
                                />
                                <button className='btn btn-dark d-flex justify-content-center align-items-center' type="button" onClick={() => handleRemoveDescription(index)}>
                                    <MinusOutlined />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-7">
                            <button className='w-100 btn btn-light d-flex justify-content-center align-items-center' type="button" onClick={handleAddDescription}>
                                <PlusOutlined />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="err-box">
                <p className='text-danger'>{err}</p>
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={handleSubmit}>
                    <button type="button" className="btn btn-dark text-center visit-add-product-page">Tạo mới</button>
                </span>
                <span onClick={updateUndertake}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Hoàn thành</button>
                </span>
            </div>
        </div>
    );
}

export default CreateUndertake;
