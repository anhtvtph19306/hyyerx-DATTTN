import { css } from "@emotion/react"
import { Link, useNavigate } from "react-router-dom"
import ButotnComponent from "~/app/component/parts/button/button.component"
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../utils/validateForm";
import { Controller, useForm } from "react-hook-form"
import { login } from "~/app/api/auth/auth.api";
import toast from "react-hot-toast";
import { message } from "antd";

const LoginComponent = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const { handleSubmit, control, formState: { errors }, } = useForm({
        resolver: yupResolver(schemaLogin)
    })

    const onSubmit = (data: any) => {
        login(data).then((res) => {
            if (res) {
                localStorage.setItem("userId", res.user._id)
                localStorage.setItem("accessToken", res.accessToken)
                localStorage.setItem("emailUser", res.user.email)
                localStorage.setItem("roleUser", res.user.role)
                message.success("Đăng nhập thành công", () => {
                    navigate("/");
                    location.reload();
                });
            }
        }, (err) => {
            toast.error(err?.response?.data)
        })
    }
    return (
        <div className="relative h-[650px]" css={cssLogin}>
            {contextHolder}
            <div>
                <img src="https://authorize.kobo.com/Images/prism_large.png" alt="" className='w-full' />
            </div>
            <div className="absolute top-[20px] sm:left-[40%] max-sm:w-full max-sm:m-auto ">
                <img src="https://res.cloudinary.com/dpfndtcya/image/upload/t_logo-kobo-web-admin/v1696241284/rakuten-kobo1-removebg-preview_efmks8.png" alt="" />
                <div className='bg-white border p-4 rounded w-[300px] m-auto'>
                    <Link to={"/register"}> <a href="#" className="text-gray-700 font-semibold hover:text-red-700 float-right underline">Tạo tài khoản</a></Link>
                    <div className='mt-10'>
                        <h2 className='text-center'>Đăng nhập</h2>
                    </div>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Controller
                                control={control}
                                name="email"
                                render={({
                                    field: { onChange, value, ref },
                                    fieldState: { error } }) => (
                                    <input type="email" value={value} placeholder='email' onChange={onChange} ref={ref} />
                                )}
                            />
                            {errors && <span className="text-red-800 font-semibold">{errors.email?.message}</span>}
                        </div>


                        <div>
                            <Controller
                                control={control}
                                name="password"
                                render={({
                                    field: { onChange, value, ref },
                                    fieldState: { error } }) => (
                                    <input type="password" value={value} placeholder='Mật khẩu' onChange={onChange} ref={ref} />
                                )}
                            />
                            {errors && <span className="text-red-800 font-semibold">{errors.password?.message}</span>}
                        </div>
                        <p className='text-[12px] text-gray-800 font-semibold mt-3'>Bằng việc tiếp tục, bạn xác nhận rằng bạn đồng ý với Điều khoản sử dụng và xác nhận rằng bạn đã đọc Chính sách quyền riêng tư, được cập nhật vào ngày 15 tháng 8 năm 2023</p>

                        <ButotnComponent handelColor title={"Đăng nhập"} className="w-full mt-3" />
                    </form>

                    <Link to={"/forgotpassword"}>
                        <a href="#" className="py-4 text-[13px] font-bold underline">Quên mật khẩu ?</a>
                    </Link>


                    <div className="flex border border-gray-300 rounded-sm items-center mt-3">
                        <img src="https://static.kobo.com/1.0.1.3568/Images/social/Facebook.png" alt="" className="px-3 py-1 w-[45px]" />
                        <p className="text-[13px] font-semibold">Đăng nhập với Facebook</p>
                    </div>

                    <div className="flex border border-gray-300 rounded-sm items-center mt-3">
                        <img src="https://static.kobo.com/1.0.1.3568/Images/social/Twitter.png" alt="" className="px-3 py-1 w-[45px]" />
                        <p className="text-[13px] font-semibold">Đăng nhập với Twitter</p>
                    </div>

                    <div className="flex border border-gray-300 rounded-sm items-center mt-3">
                        <img src="https://static.kobo.com/1.0.1.3568/Images/social/Instagram.png" alt="" className="px-3 py-1 w-[45px]" />
                        <p className="text-[13px] font-semibold">Đăng nhập với Instagram</p>
                    </div>
                </div>
                <div className="w-[300px] m-auto text-center mt-4 text-[13px] font-bold text-gray-900">
                    Điều khoản sử dụng Chính sách quyền riêng tư 2023 HaiDang. Trang web này được bảo vệ bởi hCaptcha và Chính sách quyền riêng tư cũng như Điều khoản dịch vụ của hCaptcha được áp dụng.
                </div>
            </div>


        </div>

    )
}

export default LoginComponent

export const cssLogin = css`
input{
    border: 1px solid;
    padding:5px;
    margin-top:15px;
    border-radius:5px;
    width:100%;
}
h2{
    font-size: 2.2rem;
    font-family: "Trebuchet MS",Trebuchet,Arial,Helvetica,sans-serif;
    color: #000;
    font-weight: 400;
}
`