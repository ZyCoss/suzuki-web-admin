import React, { useState, useEffect } from 'react';
import { Upload, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';

const RowVariant = ({ colourSelectedList, listImg, onAddImage, onRemoveImage }) => {

    const onPreview = (file) => {
        Modal.info({
            title: 'Xem ảnh',
            content: (
                <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={file.url}
                />
            ),
            onOk() { },
        });
    };

    return (
        <table className="table table-hover">
            <thead>
                <tr className=''>
                    <th scope="col">Màu</th>
                    <th scope="col">Ảnh</th>
                </tr>
            </thead>
            <tbody className='row-variant'>
                {
                    colourSelectedList && colourSelectedList.map((item, index) => {
                        return (
                            <tr>
                                <td style={{ height: "126px" }}>
                                    <ImgCrop>
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            fileList={listImg}
                                            onChange={onAddImage}
                                            onPreview={onPreview}
                                            onRemove={onRemoveImage}
                                        >
                                            {listImg.length < 1 && '+ Tải ảnh lên'}
                                        </Upload>

                                    </ImgCrop>
                                </td>
                            </tr>
                        )
                    })
                }
                <td>
                    Đang cập nhật
                </td>
            </tbody>
        </table>
    );
};

export default RowVariant;
