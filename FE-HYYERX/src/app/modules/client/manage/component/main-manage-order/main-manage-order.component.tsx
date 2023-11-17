import { css } from '@emotion/react'
import { FunctionComponent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useOrderRedux } from '../../../redux/hook/useOrderReducer'
import { deleteOrder } from '~/app/api/order/order.api'
import dayjs from 'dayjs'
import { Button, Pagination } from 'antd'

interface MainManangeOrderProps {
    props?: any
}

const MainManangeOrder: FunctionComponent<MainManangeOrderProps> = () => {
    const { data: { orders }, actions } = useOrderRedux()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    useEffect(() => {
        actions.getAllOrders()
    }, [])

    const handelDeteOrder = (id: any) => {
        deleteOrder(id).then((res) => {
            if (res) {
                toast.success("huỷ đơn hàng thành công")
                actions.getAllOrders()
            }
        }, (err) => {
            toast.error(err.response.data)
        })
    }

    return (
        <div css={cssMainManangeOrder}>
            <h1 className="text-2xl text-center mb-4">Quản lý đơn hàng</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className='w-full md:w-[910px]'>
                        <thead>
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Ngày mua</th>
                                <th className="px-4 py-2">Trạng thái</th>
                                <th className="px-4 py-2">Sản phẩm</th>
                                <th className="px-4 py-2">Tổng tiền</th>
                                <th className="px-4 py-2">Hành động</th>
                            </tr>
                        </thead>
                        {
                            orders?.slice(startIndex, endIndex)?.map((item: any, index: any) => (
                                <tbody key={index + 1}>
                                    <tr>
                                        <th className="px-4 py-2" scope="row">{index + 1}</th>
                                        <td className="px-4 py-2">{dayjs(item?.createdAt).format('MM-DD-YYYY')}</td>
                                        <td className={`${item?.orderStatus === 'đang chờ duyệt' || item?.orderStatus === 'hủy đơn'
                                            ? 'text-red-500'
                                            : 'text-green-500'
                                            } px-4 py-2`}>
                                            {item?.orderStatus}
                                        </td>
                                        <td className="px-4 py-2">
                                            {
                                                item?.productOrder?.map((item: any, index: any) => (
                                                    <div key={index + 1} className=''>{item?.product?.name}</div>
                                                ))
                                            }
                                        </td>
                                        <td className="px-4 py-2">{item?.total?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                        <td className="px-4 py-2">
                                            <Button onClick={() => handelDeteOrder(item._id)} type="dashed" danger>
                                                Hủy đơn
                                            </Button>
                                        </td>
                                    </tr>

                                </tbody>
                            ))
                        }
                    </table>
                    <Pagination className='py-20 float-right' current={currentPage}
                        pageSize={pageSize}
                        total={orders.length}
                        onChange={setCurrentPage}
                    />
                </div>
            </div>

        </div>
    )
}

export default MainManangeOrder

const cssMainManangeOrder = css`
padding:0 40px;
table {
 
    border-collapse: collapse;
    margin: 20px 0;
}

th, td {
    padding: 8px;
    text-align: left;

}

th {
    background-color: #f2f2f2;
    padding:0 10px;
}

`