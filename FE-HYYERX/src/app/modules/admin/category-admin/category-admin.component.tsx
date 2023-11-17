import { Fragment, useEffect, useState } from 'react'
import { createCategory, deleteCategory, getAllCategory, searchCategory, updateCategory } from './service/category.service'
import TemplateTable from '../common/template-table/template-table.component'
import { Form, Input } from 'antd'
import dayjs from 'dayjs'
const CategoryAdmin = () => {
    const [dataCategory, setDataCategory] = useState([])
    const [colums, setColums] = useState([])
    const [reset, setReset] = useState<boolean>(true)
    useEffect(() => {
        getAllCategory().then((res) => {
            setDataCategory(res.data)
        })
    }, [reset])
    useEffect(() => {
        const columTemp: any = []
        const title = ['', 'Tên danh mục', 'Ngày tạo', 'Ngày cập nhật']
        if (dataCategory.length > 0) {
            Object?.keys(dataCategory[0]).map((itemKey, key = 0) => {
                if (!['_id', '__v'].includes(itemKey)) {
                    return columTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render: (text: any, record: any, index: any) => {
                            if (itemKey === 'createdAt') {
                                return <div> {dayjs(record?.createdAt).format('MM-DD-YYYY')}</div>
                            }
                            if (itemKey === 'updatedAt') {
                                return <div> {dayjs(record?.updatedAt).format('MM-DD-YYYY')}</div>
                            }
                            return text
                        }

                    })
                }
            }
            )
        }
        setColums(columTemp)
    }, [dataCategory])
    const handelGetList = () => {
        setReset(!reset)
    }
    return (
        <div>
            <TemplateTable dataTable={dataCategory} setNewData={setDataCategory} searchFunc={searchCategory} columsTable={colums} deleteFunc={deleteCategory} changeFunc={updateCategory} handelGetlist={handelGetList} createFunc={createCategory} formEdit={
                <Fragment>
                    <Form.Item
                        label='Tên danh mục'
                        name='name'
                        rules={[{ required: true, message: 'không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Fragment>
            } />
        </div>
    )
}

export default CategoryAdmin