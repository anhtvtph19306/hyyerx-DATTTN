import { css } from "@emotion/react"
import { Link, useNavigate } from "react-router-dom"
import ButotnComponent from "~/app/component/parts/button/button.component"
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaForgotPassword } from "../utils/validateForm";
import { Controller, useForm } from "react-hook-form"
import { forgotPassword } from "~/app/api/auth/auth.api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const navigate = useNavigate()
    const { handleSubmit, control, formState: { errors }, } = useForm({
        resolver: yupResolver(schemaForgotPassword)
    })

    const onSubmit = (data: any) => {
        forgotPassword(data).then((res) => {
            if (res) {
                toast.success("hãy vào email để lấy mật khẩu")
                navigate("/login")
            }
        }, (err) => {
            toast.error(err?.response?.data)
        })
    }
    return (
        <div className="relative h-[350px]" css={cssLogin}>
            <div>
                <img src="https://authorize.kobo.com/Images/prism_large.png" alt="" className='w-full' />
            </div>
            <div className="absolute top-[20px] sm:left-[40%] max-sm:w-full max-sm:m-auto ">
                <img src="https://res.cloudinary.com/dpfndtcya/image/upload/t_logo-kobo-web-admin/v1696241284/rakuten-kobo1-removebg-preview_efmks8.png" alt="" />
                <div className='bg-white border p-4 rounded w-[300px] m-auto'>
                    <Link to={"/register"}> <a href="#" className="text-gray-700 font-semibold hover:text-red-700 float-right underline">Tạo tài khoản</a></Link>
                    <div className='mt-10'>
                        <h2 className='text-center'>Quên mật khẩu</h2>
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
                        <ButotnComponent handelColor title={"Gửi email"} className="w-full mt-3" />
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword

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