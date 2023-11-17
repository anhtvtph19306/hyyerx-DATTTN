import { Button, Form, Input, InputNumber, Modal, Segmented, Select, Typography } from "antd"
import TemplateOrder from "../common/template-order/tamplate-order.component"
import { Fragment, useCallback, useEffect, useState } from "react"
import { createOrder, deleteOrder, filterDataOrderByStatus, updateOrder } from "./service/order.service"
import toast from "react-hot-toast"
import { PlusOutlined } from '@ant-design/icons';
import { getAllProduct } from "../product-admin/service/product.service"

const { Title } = Typography


const OrderAdminComponent = () => {
  const [orderStatus, setOrderStatus] = useState<string | number>('đang chờ duyệt')
  const [dataTable, setDataTable] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listProduct, setListProduct] = useState<any>([]);
  const [productTotalPrices, setProductTotalPrices] = useState([]);
  const [dataProduct, setDataProduct] = useState<any>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [form] = Form.useForm()
  const [reset, setReset] = useState<boolean>(true)
  const handleProductChange = (value: any) => {
    const product = dataProduct.find((product: any) => product._id === value);
    setSelectedProduct(product);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {

    form.validateFields().then((values: any) => {
      setIsModalOpen(false);
      createOrder({ ...values, total: grandTotal }).then((res) => {
        if (res) {
          setReset(!reset)
          toast.success("order thành công")
        }
      }, (err) => {
        toast.success("order thất bại")
      })
      form.resetFields()
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const changeStatusDataOrder = (value: string | number) => {
    setOrderStatus(value)
  }
  const callAllOrder = useCallback(() => {
    filterDataOrderByStatus(orderStatus).then((res) => {
      if (res) {
        setDataTable(res.data)
      }
    })
  }, [orderStatus])
  useEffect(() => {
    getAllProduct().then((res) => {
      setDataProduct(res.data);
      setListProduct(res.data.map((item: any) => {
        return { value: item._id, label: item.name }
      }));
    })
  }, [])

  const handelvalueQuantity = (event: any, index: number) => {
    console.log(selectedProduct)
    const newTotalPrice = event * selectedProduct.newPrice;
    const updatedTotalPrices: any = [...productTotalPrices];
    updatedTotalPrices[index] = newTotalPrice;
    setProductTotalPrices(updatedTotalPrices);
    const totalPricesSum = updatedTotalPrices.reduce((acc: any, curr: any) => acc + (curr || 0), 0);
    setGrandTotal(totalPricesSum);
  }

  useEffect(() => {
    callAllOrder()
  }, [orderStatus])

  const handleUpdateStatusOrder = (orderId: string, orderStatus: string) => {
    updateOrder({ orderId, orderStatus }).then((res) => {
      if (res) {
        callAllOrder()
        toast.success('Đã cập nhật trạng thái đơn hàng')
      }
    })
  }


  const handelDeleteOrder = (orderId: any) => {
    deleteOrder(orderId).then((res) => {
      if (res) {
        setReset(!reset)
        toast.success("xoá thành công đơn hàng")
      }
    }, (err) => {
      toast.error("xoá đơn hàng lỗi")
    })
  }
  const buttonByStatus = (orderId: string, orderStatus: string) => {
    switch (orderStatus) {
      case 'đang chờ duyệt':
        return (
          <Fragment>
            <Button className='text-blue-700' onClick={() => handleUpdateStatusOrder(orderId, 'đã nhận đơn')}> Chuyển duyệt thành công</Button>
            <Button danger onClick={() => handleUpdateStatusOrder(orderId, 'đã huỷ')}>
              Chuyển huỷ đơn
            </Button>
          </Fragment>
        )
        break
      case 'đã nhận đơn':
        return (
          <Button className='text-blue-700' onClick={() => handleUpdateStatusOrder(orderId, 'đang giao hàng')}>
            Chuyển đang vận chuyển
          </Button>
        )
        break
      case 'đang giao hàng':
        return (
          <Button className='text-blue-700' onClick={() => handleUpdateStatusOrder(orderId, 'đã hoàn thành')}>
            Chuyển hoàn thành
          </Button>
        )
      case 'đã hoàn thành':
        break
      case 'đã huỷ':
        return (
          <Button danger onClick={() => handelDeleteOrder(orderId)}>
            xoá đơn hàng
          </Button>
        )
        break

      default:
        break
    }
  }
  return (
    <div>

      <Segmented
        options={[
          { value: 'đang chờ duyệt', label: 'đang chờ duyệt' },
          { value: 'đã nhận đơn', label: 'đã nhận đơn' },
          { value: 'đang giao hàng', label: 'đang giao hàng' },
          { value: 'đã hoàn thành', label: 'đã hoàn thành' },
          { value: 'đã huỷ', label: 'Đã huỷ' }
        ]}
        size='large'
        value={orderStatus}
        onChange={changeStatusDataOrder}
      />
      <div className='float-right'>
        <Button
          onClick={showModal}
          type='primary'
          className='p-0 h-[40px]  w-[44px] rounded-[4px] bg-[#D4FF00]'
        >
          <PlusOutlined className='text-[20px] mb-[4px]' />
        </Button>
      </div>
      <div>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} layout='vertical' name='form_in_modal' >
            <Fragment>
              <Form.Item
                label='Họ và tên'
                name='fullname'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Số điện thoại'
                name='phoneNumber'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Thành phố / Tỉnh'
                name='city'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Huyện / Phường'
                name='district'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Xã / Quận'
                name='commune'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Địa chị chi tiết'
                name='locationDetail'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Input />
              </Form.Item>

              <Form.List
                name="productOrder"
                initialValue={[]}
              >
                {(fields, { add, remove }) => (
                  <div>
                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                      <div key={key} >
                        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                          <Form.Item
                            {...restField}
                            name={[name, 'product']}
                            fieldKey={[fieldKey, 'product'] as any}
                            label="Chọn sản phẩm"
                            rules={[{ required: true, message: 'Không được để trống' }]}
                          >
                            <Select
                              showSearch
                              style={{ width: 200 }}
                              placeholder="Lựa chọn sản phẩm"
                              optionFilterProp="children"
                              filterOption={(input, option: any) => (option?.label ?? '').toLowerCase().includes(input?.toLowerCase())}
                              filterSort={(optionA, optionB) =>
                                (optionA?.name ?? '').toLowerCase().localeCompare((optionB?.name ?? '').toLowerCase())
                              }
                              options={listProduct}
                              onChange={(value, label) => {
                                handleProductChange(value)
                              }}
                            >
                            </Select>
                          </Form.Item>


                          <Form.Item
                            label='Số lượng'
                            name={[name, 'quantity']}
                            rules={[{ required: true, message: 'Không được để trống!' }]}

                          >
                            <InputNumber
                              placeholder="Số lượng"
                              min={1}
                              max={selectedProduct?.quantity}
                              onChange={(value) => handelvalueQuantity(value, index)} />
                          </Form.Item>
                          <p>Số lượng còn {selectedProduct?.quantity}</p>

                          <Form.Item
                            label='Tổng tiền'
                            name='totalprice'
                          >
                            {productTotalPrices[index]}
                          </Form.Item>

                          {fields.length > 1 && (
                            <Form.Item label="Xoá">
                              <Button type="dashed" onClick={() => remove(name)}>
                                xoá sản phẩm
                              </Button>
                            </Form.Item>
                          )}
                        </div>
                      </div>

                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      + Mua sản phẩm
                    </Button>
                  </div>
                )}
              </Form.List>

              <Form.Item
                label='Trạng thái đơn hàng'
                name='orderStatus'
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Select placeholder=' trạng thái'>
                  <Select.Option value='đã nhận đơn'>đã nhận đơn</Select.Option>
                  <Select.Option value='đang giao hàng'>đang giao hàng</Select.Option>
                  <Select.Option value='đã hoàn thành'>đã hoàn thành</Select.Option>
                </Select>
              </Form.Item>
            </Fragment>
          </Form>
        </Modal>
      </div>
      <Title className='py-5' level={3}>
        Số Đơn hàng: {dataTable.length}
      </Title>
      <TemplateOrder buttonByStatus={buttonByStatus} dataTable={dataTable} />
    </div>
  )
}

export default OrderAdminComponent