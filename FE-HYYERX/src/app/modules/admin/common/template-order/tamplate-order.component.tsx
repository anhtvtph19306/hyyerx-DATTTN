import { Button, Descriptions, DescriptionsProps, Modal, Space, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { FC, useState } from 'react'


const { Title } = Typography
interface PropsTypes {
    buttonByStatus?: any
    dataTable: any
    isStatistical?: boolean,
}
const TemplateOrder: FC<PropsTypes> = ({ buttonByStatus, dataTable, isStatistical }) => {
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailRecord, setDetailRecord] = useState<any>({
        fullname: "",
        phoneNumber: "",
        district: "",
        commune: "",
        detailAddress: "",
        city: "",
        productOrder: "",
        total: Number,
    })

    const showModal = (record: any) => {
        console.log(record)
        setIsModalOpen(true);
        setDetailRecord({
            city: record?.city,
            fullname: record?.fullname,
            phoneNumber: record?.phoneNumber,
            district: record?.district,
            commune: record?.commune,
            detailAddress: record?.detailAddress,
            productOrder: record?.productOrder,
            total: record?.total
        })
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = (record: any) => {
        console.log(record)
        setIsModalOpen(false);
        setDetailRecord({
            city: record?.city,
            fullname: record?.fullname,
            phoneNumber: record?.phoneNumber,
            district: record?.district,
            commune: record?.commune,
            detailAddress: record?.detailAddress,
            productOrder: record?.productOrder,
            total: record?.total
        })
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã order / ngày',
            dataIndex: 'name',
            key: '_id',
            render: (_, record: any) => (
                <div>
                    {record?._id} / {dayjs(record?.createdAt).format('MM-DD-YYYY')}
                </div>
            )

        },
        {
            title: 'Trạng thái',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        },
        {
            title: 'Tổng số lượng mua',
            dataIndex: 'address',
            key: 'address',
            render: (_, record: any) => {
                const orderTotal = record?.productOrder?.reduce((orderTotal: number, product: any) => {
                    return orderTotal + product?.quantity
                }, 0)

                return <strong className='block text-center'>{orderTotal}</strong>
            }
        },
        {
            title: 'Tổng tiền',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, record: any) => {
                return <strong className='block text-center'>{record?.total?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</strong>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size='middle'>
                    <Button type='primary' onClick={() => showModal(record)}>
                        Xem chi tiết
                    </Button>
                    {!isStatistical && (
                        <Space size='middle' direction='vertical'>
                            {buttonByStatus(record?._id, record?.orderStatus)}
                        </Space>
                    )}
                </Space>
            )
        }
    ]

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Họ Và Tên',
            children: detailRecord?.fullname
        },
        {
            key: '2',
            label: 'Số Điện Thoại',
            children: detailRecord?.phoneNumber
        },
        {
            key: '3',
            label: 'Tỉnh / Thành Phố',
            children: detailRecord?.city
        },
        {
            key: '4',
            label: 'Quẩn / Huyện',
            children: detailRecord?.district
        },
        {
            key: '5',
            label: 'Xã / Phường',
            children: detailRecord?.commune
        },
        {
            key: '6',
            label: 'Thông Tin Chi Tiết',
            children: detailRecord?.detailAddress
        }
    ]

    const columListProduct = [
        {
            title: "Tên Sản Phẩm",
            key: "1",
            render: (_: any, record: any) => <div className=''>{record?.product?.name}</div>
        },
        {
            title: "Ảnh Sản Phẩm",
            key: "2",
            render: (_: any, record: any) => <div> {record?.product.images?.slice(0, 1).map((image: any) => image?.response || image?.url) ? <img className='w-[70px]' src={record?.product.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} /> : 'Chưa có ảnh sản phẩm'}</div>
        },
        {
            title: "Giá Sản Phẩm",
            key: "3",
            render: (_: any, record: any) => <strong className='block text-center'>{(record?.quantity * record?.product?.newPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</strong>
        },
        {
            title: "Số Lượng Mua",
            key: "4",
            render: (_: any, record: any) => <div>{record?.quantity}</div>
        }
    ]


    return (
        <div>
            <div>
                <Table columns={columns} dataSource={dataTable} />
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} width={900} footer={null} onCancel={handleCancel}>
                <Descriptions title="Thông Tin Khách Hàng" items={items} />
                <Title level={4}>Sản Phẩm Khách Hàng mua</Title>
                <div>
                    <Table columns={columListProduct} dataSource={detailRecord.productOrder} />
                </div>
            </Modal>

        </div>
    )
}

export default TemplateOrder