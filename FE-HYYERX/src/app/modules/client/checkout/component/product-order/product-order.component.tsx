import ButotnComponent from '~/app/component/parts/button/button.component'
import { useCartRedux } from '../../../redux/hook/useCartReducer'
import { FC, useEffect, useState } from 'react';
import { getAllVorcher } from '~/app/modules/admin/vorcher-admin/service/vorcher.service';

interface IPropProductOrder {

}
const ProductOrderComponent: FC<IPropProductOrder> = () => {
    const { data: { listBuyProduct } } = useCartRedux()
    const [showPopup, setShowPopup] = useState(true);
    const [getVocher, setGetVorcher] = useState([])
    const [voucherCode, setVoucherCode] = useState<any>('');
    const [priceFree, setPriceFree] = useState<any>()
    const [totalPrice, setTotalPrice] = useState<any>(0)
    useEffect(() => {
        getAllVorcher().then((res) => {
            if (res) {
                setGetVorcher(res.data)
            }
        })
    }, [])

    const handleSaveAndContinue = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleUseVoucher = (codeData: any, discountData: any) => {
        localStorage.setItem('voucherCode', codeData)
        localStorage.setItem('voucherPrice', discountData)
        setShowPopup(false);
    };

    useEffect(() => {
        if (listBuyProduct) {
            const calculatedTotal = listBuyProduct?.reduce(
                (total: any, item: any) => total + item?.product?.newPrice * item?.quantity, 0)
            setTotalPrice(calculatedTotal)
        }
    }, [listBuyProduct])
    const priceFree1 = localStorage.getItem("voucherPrice")
    const codeVorcher = localStorage.getItem("voucherCode")
    useEffect(() => {
        setVoucherCode(codeVorcher)
        setPriceFree(priceFree1)
    }, [priceFree1, codeVorcher])
    return (
        <>
            <div>
                <h2 className='text-[17px] font-semibold text-red-700 mb-4'>Hoá đơn sản phẩm mua</h2>

                <div className='border border-gray-400 p-5 bg-[#e9f5f4] '>
                    <p>Bạn đang mua sách điện tử Bạn sắp mua nội dung số thay vì sách in. Đọc bằng thiết bị đọc sách điện tử Kobo hoặc với Ứng dụng Kobo miễn phí.</p>
                </div>
                {listBuyProduct?.map((item: any, index: any) => (
                    <div className='flex items-center justify-between mt-4' key={index + 1}>
                        <div className="flex justify-between items-center">
                            <img src={item?.product?.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} alt="" className='w-[50px] h-[50px]' />
                            <div className='font-semibold'>
                                x {item?.quantity}
                            </div>
                        </div>

                        <div>
                            <h2 className='font-semibold'>{item?.product?.name}</h2>
                            <p className='text-gray-500 text-[15px]'>by {item?.product?.author}</p>
                        </div>

                        <div className='font-bold text-[16px]'>
                            {(item?.quantity * item?.product?.newPrice)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </div>
                    </div>
                ))}
                <hr />

                <div className='mt-4'>
                    <p className='text-gray-600 font-semibold'>Phí vận chuyển: {30000?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                    <p className='text-green-600 font-semibold'>Giảm giá: -{priceFree ? priceFree?.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : 0?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                </div>

                <div className='font-bold text-[18px] mt-2 text-red-700 '>
                    Tổng cộng: {priceFree ? ((totalPrice + 30000 - priceFree)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })) : ((totalPrice + 30000 - 0)?.toLocaleString('vi', { style: 'currency', currency: 'VND' }))}
                </div>

                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-md">
                            <p>mã giảm giá của bạn ở đây.</p>

                            {getVocher?.map((item: any, index: any) => (
                                <p key={index + 1} className='text-[16px] font-semibold py-3'>
                                    {item?.code}
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 ml-3 rounded"
                                        onClick={() => handleUseVoucher(item.code, item.discount)}
                                    >
                                        Sử dụng
                                    </button>
                                </p>
                            ))}
                            <button onClick={closePopup} className="mt-4 bg-blue-500 text-white p-1 rounded-md">Thoát</button>
                        </div>
                    </div>
                )}
                <div className='mt-4'>
                    <div className='sm:flex justify-between'>
                        <label className='block text-sm font-semibold text-gray-600 mb-1'>
                            Nhập mã giảm giá
                        </label>
                        <label className='block text-sm font-semibold text-gray-600 mb-1' onClick={handleSaveAndContinue}>nhấn để xem mã của tôi</label>
                    </div>
                    <input
                        type='text'
                        placeholder='click xem mã của tôi để nhận được giảm giá'
                        className='border border-gray-300 rounded-md p-2 w-full '
                        value={voucherCode}
                        disabled
                    />
                </div>

                {
                    voucherCode && (
                        <div className='mt-4'>
                            <p className='text-green-600 font-semibold'>
                                Mã giảm giá {voucherCode}  đã được áp dụng.
                            </p>
                        </div>
                    )
                }
                <div>
                    <ButotnComponent handelColor className="sm:w-[200px] max-sm:w-[100%] mt-6" title={"save and continue"} />
                </div>
            </div>
        </>

    )
}

export default ProductOrderComponent