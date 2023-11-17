import { css } from "@emotion/react"
import QuantityCompoennt from "~/app/component/parts/quantity/quantity.component"
import StarComponent from "~/app/component/parts/star/star.component"
import { useProductRedux } from "../../../redux/hook/useProductReducer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ButotnComponent from "~/app/component/parts/button/button.component"
import { useCartRedux } from "../../../redux/hook/useCartReducer"
import { addProductToCart } from "~/app/api/cart/cart.api"
import toast from "react-hot-toast"
import { getAllComment } from "~/app/api/comment/comment.api"


const InfoDetail = () => {
    const [quantity, setQuantity] = useState(1)
    let { id } = useParams()
    const { data: { product: productDetail }, actions } = useProductRedux()
    const { actions: actionscart } = useCartRedux()
    const [averageStar, setAverageStar] = useState(0);

    useEffect(() => {
        getAllComment().then((res) => {
            if (res) {
                const productComments = res.filter((item: any) => item.productId === id);
                const totalStars = productComments.reduce((sum: any, comment: any) => sum + parseInt(comment.star), 0);
                const avgStar = productComments.length > 0 ? totalStars / productComments.length : 1;

                setAverageStar(avgStar);
            }
        });
    }, []);
    const starComponents = [];
    for (let i = 1; i <= averageStar; i++) {
        starComponents.push(<StarComponent key={i} />);
    }
    useEffect(() => {
        actions.getProductById(id)
    }, [id])

    const HandelAddProductToCart = () => {

        const requestProductCartAPI = {
            productId: productDetail._id,
            quantity: quantity
        }
        addProductToCart(requestProductCartAPI).then((res) => {
            if (res) {
                const requestProductCart = {
                    product: productDetail,
                    quantity: quantity
                }
                actionscart.addProductToCarts(requestProductCart)
                toast.success("thêm giỏ hàng thành công")
            }
        }, (err) => {
            toast.error(err?.response?.data)
        })
    }


    return (
        <>
            <div className="sm:flex justify-between mt-4">

                <div css={cssDetail} className="sm:flex justify-between">
                    <div className="sm:w-[246px]">
                        <div>
                            <img src={productDetail.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} alt="" className="sm:w-[246px] max-sm:w-full h-[376px]" />
                        </div>
                        <div className="flex items-center py-5">
                            {starComponents}
                            ({starComponents.length})
                        </div>
                    </div>
                    <div className="px-6 sm:w-[633px]">
                        <h2>{productDetail?.name}</h2>
                        <span className="title">Giá mới : {productDetail?.newPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                        <span className="title sm:px-5"><del>Giá gốc: {productDetail?.cost?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</del></span>
                        <span className="title sm:px-5">Tác giả: {productDetail?.author}</span>
                        <div className="flex mt-6"></div>
                        <div className="flex mt-6">
                            <div className="title-price border border-[#bbb]">
                                <span>sản phẩm luôn đảm bảo chất lượng</span>
                            </div>
                            <div className="px-5">
                                <div className="title-price border border-red-600 bg-red-200">
                                    <span>được đổi trả trong vòng 3 ngày</span>
                                </div>
                            </div>

                        </div>
                        <p className="my-4">sản phẩm không được free ship</p>
                        <div className="py-3 flex items-center">
                            <QuantityCompoennt
                                listQuantityRemain={productDetail}
                                setQuantity={setQuantity}
                                quantity={quantity}
                            />
                            <p className="text-[16px] px-3 font-medium">Số lượng đang còn : {productDetail?.quantity} sản phẩm</p>
                        </div>

                        <hr />

                        <h2 className="title-name">Chi tiết sản phẩm</h2>
                        <span>
                            {productDetail?.description}
                        </span>
                    </div>
                </div>
                <div className="sm:w-[250px]" css={cssBuy}>
                    <h2 className="text-[1.3rem]">Thông tin tạm tính</h2>
                    <div className="flex justify-between py-2">
                        <p>Tạm tính giá cũ</p>
                        <p><del>{(productDetail?.cost * quantity)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</del></p>
                    </div>

                    <div className="flex justify-between ">
                        <p className="font-semibold">Tạm tính giá mới</p>
                        <b>{(productDetail?.newPrice * quantity)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })} </b>
                    </div>

                    <div className="">
                        <div className="mt-2">
                            <ButotnComponent handelColor title={"Thêm vào giỏ hàng"} className="sm:w-[200px] max-sm:w-[100%]" onClick={HandelAddProductToCart} />
                        </div>

                        <div className="py-3">
                            <ButotnComponent title={"Mua ngay"} className="sm:w-[200px] max-sm:w-[100%]" />
                        </div>
                        <ButotnComponent title={"Thêm vào yêu thích"} className="sm:w-[200px] max-sm:w-[100%]" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoDetail


const cssDetail = css`
a{
    text-decoration:underline;
    font-weight:600;
}
.title-name{
    font-size: 1rem;
}
h2{
    font-family: "Trebuchet MS",Trebuchet,Arial,Helvetica,sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;
}
.title{
    font-family: "Trebuchet MS",Trebuchet,Arial,Helvetica,sans-serif;
    font-size: 1.2rem;
    color: #595959;
    display: inline-block;
}
.title-price{
    text-align:center;
    width: 120px;
    padding: 0.3rem 0.3rem 0.5rem 0.5rem;
    // border: 1px solid #bbb;
}
`
const cssBuy = css`
box-shadow: 0 0 7px #e6e6e6;
padding: 2rem 1.5rem;
border: 1px solid #e6e6e6;
background-color: #fff;
height:320px;
`