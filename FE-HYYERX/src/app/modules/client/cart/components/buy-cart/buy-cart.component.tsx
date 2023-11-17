import { css } from "@emotion/react"
import { useNavigate } from "react-router-dom"
import ButotnComponent from "~/app/component/parts/button/button.component"
import { useCartRedux } from "../../../redux/hook/useCartReducer"
import toast from "react-hot-toast"

const BuyCart = () => {
    const { data: { listBuyProduct } } = useCartRedux()
    const navigate = useNavigate()

    const total = listBuyProduct.reduce((accumulator: any, cartItem: any) => {
        const productPrice = cartItem.product.newPrice;
        const quantity = cartItem.quantity;
        const itemTotal = productPrice * quantity;
        return accumulator + itemTotal;
    }, 0);

    const handelNavigate = () => {
        if (listBuyProduct.length == 0) {
            toast.error("chưa chọn sản phẩm mua")
        }
        else {
            navigate("/checkout")
        }
    }
    return (
        <div className="sm:w-[25%] border p-4 h-[150px] mt-3" css={cssBuy}>
            <div className="flex justify-between text-[#595959]">
                <p className="font-mono">Tạm tính:</p>
                <span className="font-mono">{total?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </div>
            <div className="py-6">
                <ButotnComponent onClick={handelNavigate} handelColor title={"Thanh toán"} className="sm:w-[250px] max-sm:w-[100%]" />
            </div>
        </div>
    )
}

export default BuyCart

const cssBuy = css`


`