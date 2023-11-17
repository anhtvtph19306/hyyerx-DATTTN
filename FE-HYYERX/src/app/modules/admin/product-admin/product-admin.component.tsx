import { Fragment, useEffect, useState } from 'react'
import { createProduct, getAllProduct, removeProduct, searchProduct, updateProduct } from './service/product.service'
import TemplateTable from '../common/template-table/template-table.component'
import { Form, Input, Select, Upload, UploadFile } from 'antd'
import axios from 'axios'
import { getAllCategory } from './../category-admin/service/category.service';
const Option = Select
const ProductAdminComponent = () => {
    const [dataProduct, setDataProduct] = useState<any>([])
    const [reset, setReset] = useState<boolean>(true)
    const [column, setColumn] = useState([])
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [categorys, setCategorys] = useState([])
    const uploadImage = async (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: (event: any) => {
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append('file', file);
        fmData.append('upload_preset', 'b45tqe77');
        fmData.append('cloud_name', 'dpfndtcya');
        fmData.append('folder', 'samples');

        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/dpfndtcya/image/upload`, fmData, config);
            onSuccess(res.data.url);
            const customFileObj = {
                uid: file.uid,
                name: file.name,
                status: res.status,
                url: res.data.url,
                response: res.data.url
            }

            const updatedFiles: any[] = [...fileList, customFileObj]
            setFileList(updatedFiles)
        } catch (error) {
            onError({ error });
        }
    }


    useEffect(() => {
        getAllProduct().then((res) => {
            setDataProduct(res.data)
        })
        getAllCategory().then((res) => {
            setCategorys(res.data)
        })
    }, [reset])
    useEffect(() => {
        const columTemp: any = []
        const title = ['Danh mục', '', 'Tên sản phẩm', 'Giá mới', 'Giá gốc', 'Ảnh', 'Chi tiết sản phẩm', 'Tác giả', 'Số lượng', 'Công ty', 'Ngày xuất bản', 'Size']
        if (dataProduct.length > 0) {
            Object?.keys(dataProduct[0]).map((itemKey, key = 0) => {
                if (!['_id', '__v', 'updatedAt', 'createdAt'].includes(itemKey)) {
                    return columTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render: (text: any, record: any, index: any) => {
                            if (itemKey === 'images') {
                                return <img src={dataProduct[index]?.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} alt='Product Image' style={{ maxWidth: '50px' }} />
                            }
                            if (itemKey == 'categoryId') {
                                return (
                                    <div>{record.categoryId.name}</div>
                                )
                            }
                            return text;
                        },
                    })
                }
            }
            )
        }
        setColumn(columTemp)
    }, [dataProduct])
    const onRemove = (file: any) => {
        setFileList((prevFileList: any) => prevFileList?.filter((item: any) => item.uid !== file.uid))
    }
    const handelGetList = () => {
        setReset(!reset)
    }

    return (
        <div>
            <TemplateTable dataTable={dataProduct} searchFunc={searchProduct} isAdminProduct={true} setNewData={setDataProduct} columsTable={column} changeFunc={updateProduct} handelGetlist={handelGetList} createFunc={createProduct} deleteFunc={removeProduct} dataPage={5} formEdit={
                <Fragment>
                    <Form.Item
                        label='Tên sản phẩm'
                        name='name'
                        rules={[{ required: true, message: 'không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Giá mới'
                        name='newPrice'
                        rules={[{ required: true, message: 'không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Giá gốc'
                        name='cost'
                        rules={[{ required: true, message: 'không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Ảnh sản phẩm'
                        name="images"
                        getValueFromEvent={(event: any) => event?.fileList}
                        rules={[{ required: true, message: 'không được để trống!' }]}
                        valuePropName={'fileList'}
                    // initialValue={fileList}
                    >
                        <Upload
                            customRequest={uploadImage}
                            listType='picture-card'
                            onRemove={onRemove}
                        >
                            {fileList.length < 2 && '+ Upload'}
                        </Upload>
                    </Form.Item>



                    <Form.Item
                        label='Chi tiết sản phẩm'
                        name='description'
                        rules={[{ required: true, message: 'không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Tác giả'
                        name='author'
                        rules={[{ required: true, message: 'không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Số lượng'
                        name='quantity'
                        rules={[{ required: true, message: 'không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Công ty'
                        name='company'
                        rules={[{ required: true, message: 'Please input your quantity!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Ngày xuất bản'
                        name='datePublish'
                        rules={[{ required: true, message: 'Please input your quantity!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='size'
                        name='size'
                        rules={[{ required: true, message: 'Please input your quantity!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Danh mục sản phẩm'
                        name='categoryId'
                        getValueFromEvent={(event, select) => ({ name: select?.children, _id: select?.value })}
                        getValueProps={(value) => ({ label: value?.name, value: value?._id })}
                        rules={[{ required: true, message: 'không được để trống!' }]}
                    >
                        <Select placeholder="lựa chọn danh mục">
                            {categorys.map((item: any) => (
                                <Option value={item._id} key={item._id}>{item.name}</Option>
                            ))}

                        </Select>
                    </Form.Item>
                </Fragment>
            } />
        </div>
    )
}

export default ProductAdminComponent

