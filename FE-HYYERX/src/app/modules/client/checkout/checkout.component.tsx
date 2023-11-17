import { useNavigate } from "react-router-dom"
import PaymentComponent from "./component/payment/payment.component"
import ProductOrderComponent from "./component/product-order/product-order.component"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaShiping } from "../utils/validateForm"
import { useCartRedux } from "../redux/hook/useCartReducer"
import { createOrder } from "~/app/api/order/order.api"
import toast from "react-hot-toast"
import { Skeleton } from "antd"
import { useEffect, useState } from "react"

const CheckoutComponent = () => {
    const navigate = useNavigate()
    const [totalPrice, setTotalPrice] = useState<any>(0);
    const accessToken = localStorage.getItem("accessToken")
    const { data: { carts, listBuyProduct } } = useCartRedux()
    const { handleSubmit, control, formState: { errors }, } = useForm({
        resolver: yupResolver(schemaShiping)
    })
    useEffect(() => {
        if (listBuyProduct) {
            const calculatedTotal = listBuyProduct.reduce((total: any, item: any) => total + item?.product?.newPrice * item?.quantity, 0);
            setTotalPrice(calculatedTotal);
        }
    }, [listBuyProduct]);
    const priceFree1: any = localStorage.getItem("voucherPrice")
    const onSubmit = (data: any) => {
        const dataOrder = {
            ...data,
            total: totalPrice - (priceFree1 ? priceFree1 : 0) + 30000,
            productOrder: listBuyProduct
        }
        createOrder(dataOrder).then((res) => {
            if (res) {
                localStorage.removeItem("productSelectCart")
                localStorage.removeItem("voucherPrice")
                localStorage.removeItem("voucherCode")
                toast.success("mua hàng thành công")
                navigate("/thankyou")
            }
        }, (err) => {
            toast.error(err?.response?.data)
        })
    }

    return (
        <div >
            {listBuyProduct.length == 0 || !accessToken ? <Skeleton /> : (<form action="" className="max-sm:px-3 sm:flex sm:w-[1140px] m-auto justify-between mt-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:w-[55%]">
                    <PaymentComponent control={control} errors={errors} />
                </div>
                <div className="sm:w-[40%]">
                    <ProductOrderComponent />
                </div>
            </form>)}

        </div>
    )
}

export default CheckoutComponent