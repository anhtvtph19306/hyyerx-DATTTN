import { css } from "@emotion/react"
import { Controller, useForm } from "react-hook-form"
import ButotnComponent from "~/app/component/parts/button/button.component"
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../utils/validateForm";
import { register } from "~/app/api/auth/auth.api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const RegisterComponent = () => {
    const navigate = useNavigate()
    const { handleSubmit, control, formState: { errors }, } = useForm({
        resolver: yupResolver(schemaRegister)
    })

    const onSubmit = (data: any) => {
        register(data).then((res) => {
            if (res) {
                toast.success("bạn đã đăng kí thành công")
                navigate("/login")
            }
        }, (err) => {
            toast.error(err?.response?.data)
        })
    }
    return (
        <div className="relative h-[750px]" css={cssRegister}>
            <div>
                <img src="https://authorize.kobo.com/Images/prism_large.png" alt="" className='w-full' />
            </div>
            <div className="absolute top-[20px] sm:left-[40%] max-sm:w-full max-sm:m-auto ">
                <img src="https://res.cloudinary.com/dpfndtcya/image/upload/t_logo-kobo-web-admin/v1696241284/rakuten-kobo1-removebg-preview_efmks8.png" alt="" />
                <div className='bg-white border p-4 rounded w-[300px] m-auto'>
                    <Link to={"/login"}> <a href="#" className="text-gray-700 font-semibold hover:text-red-700 float-right underline">Login</a></Link>
                    <div className='mt-10'>
                        <h2 className='text-center'>Register</h2>
                    </div>

                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Controller
                                control={control}
                                name="fullname"
                                render={({
                                    field: { onChange, value, ref },
                                    fieldState: { error } }) => (
                                    <input type="text" value={value} placeholder='fullname' onChange={onChange} ref={ref} />
                                )}
                            />
                            {errors && <span className="text-red-800 font-semibold">{errors.fullname?.message}</span>}
                        </div>

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
                                    <input type="password" value={value} placeholder='password' onChange={onChange} ref={ref} />
                                )}
                            />
                            {errors && <span className="text-red-800 font-semibold">{errors.password?.message}</span>}
                        </div>

                        <p className='text-[12px] text-gray-800 font-semibold mt-3'>Bằng việc tiếp tục, bạn xác nhận rằng bạn đồng ý với Điều khoản sử dụng và xác nhận rằng bạn đã đọc Chính sách quyền riêng tư, được cập nhật vào ngày 15 tháng 8 năm 2023</p>

                        <ButotnComponent handelColor title={"Tiếp tục"} className="w-full mt-3" />
                    </form>

                    <div className="flex border border-gray-300 rounded-sm items-center mt-3">
                        <img src="https://static.kobo.com/1.0.1.3568/Images/social/Facebook.png" alt="" className="px-3 py-1 w-[45px]" />
                        <p className="text-[13px] font-semibold">Tiếp tục với Facebook</p>
                    </div>

                    <div className="flex border border-gray-300 rounded-sm items-center mt-3">
                        <img src="https://static.kobo.com/1.0.1.3568/Images/social/Twitter.png" alt="" className="px-3 py-1 w-[45px]" />
                        <p className="text-[13px] font-semibold">Tiếp tục với Twitter</p>
                    </div>

                    <div className="flex border border-gray-300 rounded-sm items-center mt-3">
                        <img src="https://static.kobo.com/1.0.1.3568/Images/social/Instagram.png" alt="" className="px-3 py-1 w-[45px]" />
                        <p className="text-[13px] font-semibold">Tiếp tục với Instagram</p>
                    </div>
                </div>
                <div className="w-[300px] m-auto text-center mt-4 text-[13px] font-bold text-gray-900">
                    Điều khoản sử dụng Chính sách quyền riêng tư 2023 HaiDang. Trang web này được bảo vệ bởi hCaptcha và Chính sách quyền riêng tư cũng như Điều khoản dịch vụ của hCaptcha được áp dụng.
                </div>
            </div>


        </div>

    )
}

export default RegisterComponent

export const cssRegister = css`
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