import { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { changeUser, createUser, deleteUser, getAllUser, searchAuth } from './service/user.service'
import { Form, Input, Select } from 'antd'

const UserAdminComponent = () => {
    const [dataUser, setDataUser] = useState([])
    const [colums, setColums] = useState([])
    const [reset, setReset] = useState<boolean>(true)
    useEffect(() => {
        getAllUser().then((res) => {
            setDataUser(res.data)
        })
    }, [reset])
    useEffect(() => {
        const columTemp: any = []
        const title = ['', 'Họ và tên', 'Email', 'Mật khẩu', 'Quyền']
        if (dataUser.length > 0) {
            Object?.keys(dataUser[0]).map((itemKey, key = 0) => {
                if (!['_id', 'updatedAt', 'createdAt', '__v'].includes(itemKey)) {
                    return columTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey
                    })
                }
            }
            )
        }
        setColums(columTemp)
    }, [dataUser])
    const handelGetList = () => {
        setReset(!reset)
    }
    return (
        <div>
            <TemplateTable columsTable={colums} searchFunc={searchAuth} setNewData={setDataUser} handelGetlist={handelGetList} dataTable={dataUser} dataPage={8} deleteFunc={deleteUser} createFunc={createUser} changeFunc={changeUser} formEdit={
                <Fragment>
                    <Form.Item
                        label='Họ và tên'
                        name='fullname'
                        rules={[{ required: true, message: 'Không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label='email' name='email' rules={[{ required: true, message: 'Không được để trống' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Mật khẩu'
                        name='password'
                        rules={[{ required: true, message: 'Không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label='Quyền' name='role' rules={[{ required: true, message: 'Không được để trống!' }]}>
                        <Select placeholder='Lựa chọn quyền'>
                            <Select.Option value='ADMIN'>ADMIN</Select.Option>
                            <Select.Option value='USER'>USER</Select.Option>
                        </Select>
                    </Form.Item>
                </Fragment>
            } />
        </div>
    )
}

export default UserAdminComponent