import { FC, ReactNode, useEffect, useState } from 'react';
import { Button, Form, Input, Popconfirm, Select, Space, Table, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import TemplateModal from '../template-modal/template-modal.component';
import LayoutLoading from '~/app/component/stack/layout-loadding/layout-loadding.component';
import toast from 'react-hot-toast';
import { getAllCategory } from '../../category-admin/service/category.service';
import { getAllProduct } from '../../product-admin/service/product.service';


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

interface ITemplateTableProp {
    dataTable?: any[],
    columsTable?: any
    createFunc?: any
    deleteFunc?: any
    changeFunc?: any
    searchFunc?: any
    dataPage?: any
    formEdit?: ReactNode | any
    handelGetlist?: any
    setNewData?: any
    isAdminProduct?: boolean

}


const TemplateTable: FC<ITemplateTableProp> = ({ isAdminProduct, setNewData, formEdit, dataTable, createFunc, deleteFunc, changeFunc, searchFunc, columsTable, dataPage, handelGetlist }) => {
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [triggerLoadding, setTriggerLoadding] = useState(false)
    const [filter, setFilter] = useState<any[]>([])
    const [dataFilter, setDataFilter] = useState<any[]>([])
    const [selectedValue, setSelectedValue] = useState<string>('all');
    const [applyFilter, setApplyFilter] = useState<boolean>(false);
    const [type, setType] = useState('CREATE')
    const [dfaulValue, setDefaulvalue] = useState<any>()
    const [form] = Form.useForm()
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getAllCategory().then((res: any) => {
            setFilter(res.data.map((item: any) => {
                return { value: item._id, label: item.name }
            }));

        })
        if (isAdminProduct) {
            getAllProduct().then(res => setDataFilter(res.data))
        }
    }, [])
    const handleSelectChange = (value: any, option: any) => {
        setSelectedValue(value);
        if (value === 'all') {
            setApplyFilter(true);
        } else {
            setApplyFilter(false);
            const list = dataFilter.filter((item) => item.categoryId._id == value);
            setNewData(list);
        }
    };

    useEffect(() => {
        if (applyFilter) {
            setApplyFilter(false);
            setNewData(dataFilter);
        }
    }, [applyFilter]);


    const SelectInput: React.FC = () => (
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input?.toLowerCase())}
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[...filter, { value: 'all', label: ' Tất cả' }]}
            value={selectedValue}
            onChange={handleSelectChange}
        >
            <Select.Option value="all">All</Select.Option>
            {filter.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    );

    const confirmDelete = (itemId: any) => {
        setTriggerLoadding(true)
        deleteFunc(itemId).then((res: any) => {
            if (res) {
                setTimeout(() => {
                    setTriggerLoadding(false)
                    toast.success("xoá thành công")
                    handelGetlist()
                }, 1000)
            }
        }, (err: any) => {
            console.log(err)
            setTimeout(() => {
                setTriggerLoadding(false)
                toast.error(err?.response?.data)
            }, 1000)
        })
    };

    const cancel = (e: any) => {
        message.error('Đã huỷ xoá');
    };

    const handleOk = () => {
        if (form.getFieldValue('images')) {
            const dataList = [...form.getFieldValue('images')].map((itemImg: any) => ({
                uid: itemImg.uid,
                name: itemImg.name,
                status: itemImg.status,
                url: itemImg.url || itemImg.response,
                response: itemImg.response || itemImg.url
            }))

            form.setFieldsValue({
                images: dataList
            })
        }

        if (type == 'CREATE') {
            form.validateFields().then((values) => {
                createFunc(values).then((res: any) => {
                    if (res) {
                        setIsModelOpen(false);
                        setTriggerLoadding(true)
                        setTimeout(() => {
                            setTriggerLoadding(false)
                            toast.success("thêm thành công")
                            handelGetlist()
                        }, 1000)
                    }
                }, (err: any) => {
                    setTimeout(() => {
                        setTriggerLoadding(false)
                        toast.error("thêm thất bại")
                    }, 1000)
                })
                form.resetFields()
            })
        }
        if (type == 'CHANGE') {
            form.validateFields().then((values) => {
                form.resetFields()
                changeFunc(dfaulValue._id, values).then((res: any) => {
                    if (res) {
                        setIsModelOpen(false);
                        setTriggerLoadding(true)
                        setTimeout(() => {
                            setTriggerLoadding(false)
                            toast.success("sửa thành công")
                            handelGetlist()
                        }, 1000)
                    }
                }, (err: any) => {
                    setTimeout(() => {
                        setTriggerLoadding(false)
                        toast.error("sửa thất bại")
                    }, 1000)
                })
            })
        }
    };
    const handelSearchData = (event: any) => {
        setKeyword(event.target.value)
    }

    const handelSearchItem = () => {
        setTriggerLoadding(true)
        searchFunc(keyword).then((res: any) => {
            if (res) {
                setTimeout(() => {
                    setTriggerLoadding(false)
                    setNewData(res.data)
                }, 1000)
            }
        }, (err: any) => {
            setTimeout(() => {
                setTriggerLoadding(false)
                toast.error(err?.response?.data)
            }, 1000)
        })
    }

    const handleCancel = () => {
        setIsModelOpen(false);
    };

    const showModel = (typeAction: any, recordTable?: any) => {
        setIsModelOpen(true)
        setType(typeAction)
        if (typeAction === "CHANGE") {
            form.setFieldsValue(recordTable)
            setDefaulvalue(recordTable)
        }
        else {
            form.resetFields()
        }
    }

    const columns: ColumnsType<DataType> = [
        ...columsTable,
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showModel('CHANGE', record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Thông báo xoá"
                        description="Bạn có chắc chắn muốn xoá không ?"
                        onConfirm={() => confirmDelete(record._id)}
                        onCancel={cancel}
                        okText="đúng"
                        cancelText="không"
                    >
                        <Button danger>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <>
            <LayoutLoading condition={triggerLoadding}>
                <div className='pb-4 flex justify-between'>
                    <Button type="primary" onClick={() => showModel('CREATE')}>
                        Tạo
                    </Button>
                    <div className='flex space-x-3 items-center'>
                        {isAdminProduct && <SelectInput />}
                        <Input placeholder='tìm kiếm tại đây' className='w-[350px]' prefix={<SearchOutlined />} onChange={handelSearchData} />
                        <Button type='primary' onClick={handelSearchItem}>Tìm Kiếm</Button>
                    </div>


                </div>

                <div className='overflow-auto'>
                    <Table columns={columns} dataSource={dataTable} pagination={{ pageSize: dataPage }} />
                </div>
                <div>
                    <TemplateModal isModelOpen={isModelOpen} handleOk={handleOk} handleCancel={handleCancel} >
                        <Form form={form} layout='vertical' name='form_in_modal' >
                            {formEdit}
                        </Form>
                    </TemplateModal>
                </div>
            </LayoutLoading>
        </>

    )

}

export default TemplateTable;