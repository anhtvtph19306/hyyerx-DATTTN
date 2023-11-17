import { css } from '@emotion/react'
import { useEffect } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import ButotnComponent from '~/app/component/parts/button/button.component'
import { useCartRedux } from './../../../redux/hook/useCartReducer';
import { deleteProductToCart } from '~/app/api/cart/cart.api'
import { message, Popconfirm } from 'antd';
import QuantityCart from '~/app/component/parts/quantity/quantity-cart.component'

const InfoCart = () => {
  const { data: { carts, listBuyProduct }, actions } = useCartRedux()
  useEffect(() => {
    actions.getAllcarts()
  }, [])
  const confirm = (id: any) => {
    console.log(id)
    deleteProductToCart(id).then((res) => {
      if (res) {
        actions.deleteProductTocarts(id)
      }
    })
    message.success('xoá sản phẩm trong giỏ hàng thành công');
  };

  const cancel = (e: any) => {
    message.error('đã huỷ xoá sản phẩm');
  };

  const handelSelectBuyProduct = (product: any) => {
    actions.selectProductCartBuy(product)
  }

  const handelSelectBuyProductAll = (product: any) => {
    actions.selectProductCartBuyAll(product)
  }

  const isCheckedAll = listBuyProduct.length >= carts.length && listBuyProduct.every((itembuy: any) => carts.some((items: any) => items._id == itembuy._id))

  return (
    <div className='sm:w-[70%]' css={cssInfoCart}>
      <hr className='my-3' />
      <table className='w-full m-auto'>
        <thead >
          <tr className='text-[#595959]'>
            <th className='taitle-table sm:flex max-sm:flex sm:px-5 sm:font-mono sm:py-3'>
              <input type='checkbox' className='w-[18px] sm:mr-3 ' onChange={() => handelSelectBuyProductAll(carts)} checked={isCheckedAll} />
              <a className='font-semibold max-sm:hidden' href='#'>chọn tất cả</a>
            </th>
            <th className='taitle-table font-semibold'>Sản phẩm</th>
            <th className='taitle-table font-semibold max-sm:hidden'>Giá</th>
            <th className='taitle-table font-semibold'>Số lượng</th>
            <th className='taitle-table font-semibold'>Tổng</th>
            <th className='remove-all'>
              <RiDeleteBin5Line size={17} className='delete-icon' />
            </th>
          </tr>
        </thead>

        <tbody >
          {carts?.map((item: any, index: any) => (
            <tr className='trbody' key={index + 1}>
              <td className='sm:flex  items-center sm:space-x-3'>
                <input type='checkbox' className='sm:w-[18px] sm:mr-4 sm:ml-5 ' onChange={() => handelSelectBuyProduct(item)}
                  checked={listBuyProduct?.flatMap((items: any) => items._id)?.includes(item?._id)} />
                <img src={item?.product?.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} alt='' className='w-[50px]  h-[50px] ' />
              </td>
              <td className='max-sm:pl-3'>
                <span className='flex'>{item?.product?.name}</span>
              </td>
              <td className='max-sm:hidden'>
                <span className='flex'>{item?.product?.newPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
              </td>
              <td>
                <span className='flex '><QuantityCart quantity={item.quantity} itemProductCart={item} /></span>
              </td>
              <td>
                <span className='font-semibold text-[#BF0000]'>{(item?.product?.newPrice * item?.quantity)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
              </td>
              <td className='product-delete max-sm:px-1'>
                <Popconfirm
                  title="xác nhấn xoá"
                  description="bạn có muốn xoá sản phẩm trong giỏ hàng không ?"
                  onConfirm={() => confirm(item?._id)}
                  onCancel={cancel}
                  okText="có"
                  cancelText="không"
                >
                  <RiDeleteBin5Line className='delete-icon max-sm:text-[16px]' />
                </Popconfirm>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <hr className='my-6' />
      <Link to={"/"}>
        <ButotnComponent handelColor title={"Tiếp tục mua sắm"} className="sm:w-[200px] max-sm:w-[100%]" />
      </Link>
    </div>
  )
}

export default InfoCart

const cssInfoCart = css`
  .taitle-table {
    text-align: left;
    font-size: 18px;
  }
  .delete-icon:hover {
    color: red;
  }
`