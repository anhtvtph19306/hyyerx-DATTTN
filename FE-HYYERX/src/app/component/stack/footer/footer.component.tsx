import { css } from "@emotion/react"

const Footer = () => {
    return (
        <div css={cssFooter}>
            <div className="max-sm:px-2 sm:w-[1140px] m-auto">
                <div className="sm:flex justify-between">
                    <div>
                        <h2>Tất cả về HaiDang</h2>
                        <p>giới thiệu về shop HaiDang</p>
                        <p>Nhóm quản lý</p>
                        <p>HaiDang trong Podcast</p>
                        <p>An toàn ,đảm bảo </p>
                        <p>Ứng dụng miễn phí</p>
                        <p>Mua thẻ quà tặng điện tử</p>
                        <p>Được giúp đỡ</p>
                        <p>Sơ đồ trang web</p>
                    </div>

                    <div>
                        <h2>Những cơ hội </h2>
                        <p>tự sản xuất</p>
                        <p>chi nhánh</p>
                        <p>Cơ hội việc làm</p>
                    </div>

                    <div>
                        <h2>Bài viết blog mới nhất</h2>
                        <p>Chương trình khuyến mãi các ngày lễ...</p>
                        <p>56 sản phẩm mới được ra mất vào dịp cuối năm...</p>
                        <p>Tặng quà tri ân cho khách hàng lâu năm của shop...</p>
                        <p>phản hồi từ khách hàng là những ý kiến tốt cho hệ thống...</p>
                        <p>58 khách hàng may mắn nhận được quà từ hệ thống...</p>
                        <button>Tất cả bài viết</button>
                    </div>

                    <div>
                        <h2>Giữ liên lạc</h2>
                        <div className="flex pb-2">
                            <div>
                                <img src="https://static.kobo.com/1.0.1.3568/Images/social/Facebook.png" alt="" />
                            </div>
                            <div className="px-6">
                                <p>Facebook</p>
                            </div>
                        </div>

                        <div className="flex pb-2">
                            <div>
                                <img src="https://static.kobo.com/1.0.1.3568/Images/social/Twitter.png" alt="" />
                            </div>
                            <div className="px-6 ">
                                <p>Twitter</p>
                            </div>
                        </div>


                        <div className="flex pb-2">
                            <div>
                                <img src="https://static.kobo.com/1.0.1.3568/Images/social/Pinterest.png" alt="" />
                            </div>
                            <div className="px-6 ">
                                <p>Pinterest</p>
                            </div>
                        </div>


                        <div className="flex pb-2">
                            <div>
                                <img src="https://static.kobo.com/1.0.1.3568/Images/social/YouTube.png" alt="" />
                            </div>
                            <div className="px-6 ">
                                <p>YouTube</p>
                            </div>
                        </div>


                        <div className="flex pb-2">
                            <div>
                                <img src="https://static.kobo.com/1.0.1.3568/Images/social/Instagram.png" alt="" />
                            </div>
                            <div className="px-6 ">
                                <p>Instagram</p>
                            </div>
                        </div>

                    </div>


                    <div>
                        <h2>Tải ứng dụng miễn phí</h2>
                        <div>
                            <img src="https://static.kobo.com/1.0.1.3568/Images/appstore/googleplay_badge_en.svg" alt="" />
                        </div>
                        <div className="px-3">
                            <img src="https://static.kobo.com/1.0.1.3568/Images/appstore/appstore_badge_en.svg" alt="" />
                        </div>
                    </div>
                </div>
                <hr className=" mt-8" />
                <div className="flex justify-center mt-4 mb-4">
                    <div>
                        <p>Phương thức thanh toán:</p>
                    </div>
                    <div className="flex items-center">
                        <div className="px-3">
                            <img src="https://static.kobo.com/1.0.1.3568/Images/payment-methods/Visa.png" alt="" />
                        </div>

                        <div className="px-3">
                            <img src="https://static.kobo.com/1.0.1.3568/Images/payment-methods/MasterCard.png" alt="" />
                        </div>

                        <div className="px-3">
                            <img src="https://static.kobo.com/1.0.1.3568/Images/payment-methods/PayPal.png" alt="" />
                        </div>

                        <div className="px-3">
                            <img src="	https://static.kobo.com/1.0.1.3568/Images/payment-methods/Kobo.png" alt="" />
                        </div>
                    </div>
                </div>
                <hr />

                <div className="flex justify-between py-8">
                    <div>
                        <p>Đang mua sắm: Cửa hàng HaiDang trên toàn Nghệ An </p>
                    </div>
                    <div>
                        <p>© 2023 người phát triển hệ thống Lý Anh Tuấn </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer

const cssFooter = css`
margin-top:55px;
background-color: #595959;
h2{
    margin-top:15px;
    font-family: "Trebuchet MS",Trebuchet,Arial,Helvetica,sans-serif;
    font-size: 1.1rem;
    font-style: normal;
    color: #fff;
    padding: 0 7px 0 0;
    font-weight: 700;
    margin-bottom: 15px;
}
p{
    padding:5px 0;
    font-family: "Trebuchet MS",Trebuchet,Arial,Helvetica,sans-serif;
    font-size: 0.9rem;
    color: #fff;
}
button{
    text-decoration: none;
    display: inline-block;
    border: 1px solid #fff;
    padding: 0.2rem;
    color: #fff;
}
button:hover{
    background:#fff;
    color: #595959;
}
`