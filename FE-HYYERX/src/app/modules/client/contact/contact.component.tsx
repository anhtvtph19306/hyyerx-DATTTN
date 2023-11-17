import { FC } from 'react';
import { css } from '@emotion/react';
import { FiMapPin, FiUser } from 'react-icons/fi';
import { TfiEmail } from 'react-icons/tfi';
import { FaPhone } from 'react-icons/fa';
import { SlEarphones } from 'react-icons/sl';
import { AiOutlineMessage, AiOutlineFileText } from 'react-icons/ai';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateContact } from '../utils/validateForm';
import ButotnComponent from '~/app/component/parts/button/button.component';
import { createContact } from '~/app/api/contact/contact.api';
import toast from 'react-hot-toast';


interface ContactTypes {
    props?: any
}
const ContactComponent: FC<ContactTypes> = () => {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validateContact)
    })

    const onSubmit = (data: any) => {
        createContact(data).then(
            (res) => {
                if (res) {
                    toast.success('Đã gửi cho Admin')
                }
            },
            (err) => {
                toast.error(err?.reponse?.data)
            }
        )
    }
    return (
        <div css={Contacts_css}>
            <div className='img'>
                <img src="https://marketingai.mediacdn.vn/zoom/600_315/wp-content/uploads/2022/06/stt-hay-ve-nail-2.jpg" alt="" className='w-full h-[350px]' />
            </div>
            <div className='contact py-2 max-sm:p-3'>
                <div className='right'>
                    <div className='item rounded-tl-[40px]'>
                        <div className='icon'>
                            <FiMapPin />
                        </div>
                        <div className='text'>
                            <h4>Địa chỉ</h4>
                            <p>Quỳnh Châu - Quỳnh Lưu - Nghê An</p>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='icon'>
                            <TfiEmail />
                        </div>
                        <div className='text'>
                            <h4>Email</h4>
                            <p>cskh.com.vn</p>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='icon'>
                            <FaPhone />
                        </div>
                        <div className='text'>
                            <h4>Mua hàng online</h4>
                            <p>+ (84) 38 4798 433</p>
                        </div>
                    </div>
                    <div className='item rounded-br-[40px]'>
                        <div className='icon'>
                            <SlEarphones />
                        </div>
                        <div className='text '>
                            <h4>Chăm sóc khách hàng</h4>
                            <p>Email: cskh.com.vn

                                Hotline: 0384 79 84 33

                                Thứ Hai đến Thứ Bảy, từ 8:00 đến 22:30</p>
                        </div>
                    </div>
                </div>

                <div className='left'>
                    <div className='form'>
                        <h3 className="page-title">Email đến HaiDang</h3>
                        <p className='py-7'>
                            Chúng tôi ở đây để giúp đỡ và trả lời bất kỳ câu hỏi nào bạn có thể
                            có. Hãy cho chúng tôi biết về vấn đề của bạn để chúng tôi có thể giúp bạn nhiều hơn
                            nhanh. Chúng tôi mong nhận được phản hồi từ bạn.
                        </p>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)} action="" className='grid grid-cols-2 gap-10 pt-20 pb-7 max-sm:block max-lg:block'>
                                <div className='flex border border-[#E7E8E9] p-10 items-center rounded-tr-3xl rounded-bl-3xl'>
                                    <FiUser className='text-4xl text-[#57585a] mr-5 ' />
                                    <div className='w-full'>
                                        <Controller
                                            control={control}
                                            name='name'
                                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                                <input placeholder='Họ và tên' className=' w-full h-[45px] border rounded-tr-3xl rounded-bl-3xl border-[#E7E8E9] focus:outline-none p-2' type='text' value={value} onChange={onChange} ref={ref} />
                                            )}
                                        />{errors && <span className='text-red-800'>{errors.name?.message}</span>}
                                    </div>

                                </div>

                                <div className='flex border border-[#E7E8E9] p-10 items-center rounded-tr-3xl rounded-bl-3xl'>
                                    <FaPhone className='text-4xl text-[#57585a] mr-5' />
                                    <div className='w-full'>
                                        <Controller
                                            control={control}
                                            name='phoneNumber'
                                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                                <input placeholder='Điện thoại liên hệ' className='w-full h-[45px] border rounded-tr-3xl rounded-bl-3xl border-[#E7E8E9] focus:outline-none p-2' type='text' value={value} onChange={onChange} ref={ref} />
                                            )}
                                        />{errors && <span className='text-red-800'>{errors.phoneNumber?.message}</span>}
                                    </div>

                                </div>

                                <div className='flex border border-[#E7E8E9] p-10 items-center rounded-tr-3xl rounded-bl-3xl'>
                                    <TfiEmail className='text-4xl text-[#57585a] mr-5' />
                                    <div className='w-full'>
                                        <Controller
                                            control={control}
                                            name='email'
                                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                                <input placeholder='Email' className='w-full h-[45px] border rounded-tr-3xl rounded-bl-3xl border-[#E7E8E9] focus:outline-none p-2' type='email' value={value} onChange={onChange} ref={ref} />
                                            )}
                                        />{errors && <span className='text-red-800 '>{errors.email?.message}</span>}
                                    </div>

                                </div>

                                <div className='flex border border-[#E7E8E9] p-10 items-center rounded-tr-3xl rounded-bl-3xl'>
                                    <AiOutlineFileText className='text-4xl text-[#57585a] mr-5' />
                                    <div className='w-full'>
                                        <Controller
                                            control={control}
                                            name='topic'
                                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                                <input placeholder='Chủ đề' className='w-full h-[45px] border rounded-tr-3xl rounded-bl-3xl border-[#E7E8E9] focus:outline-none p-2' type='text' value={value} onChange={onChange} ref={ref} />
                                            )}
                                        />{errors && <span className='text-red-800'>{errors.topic?.message}</span>}
                                    </div>

                                </div>

                                <div className='flex border border-[#E7E8E9] p-10 items-center rounded-tr-3xl rounded-bl-3xl'>
                                    <AiOutlineMessage className='text-4xl text-[#57585a] mr-5' />
                                    <div className='w-full'>
                                        <Controller
                                            control={control}
                                            name='note'
                                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                                <input placeholder='Ghi chú' className='w-full h-[45px] border rounded-tr-3xl rounded-bl-3xl border-[#E7E8E9] focus:outline-none p-2' type='text' value={value} onChange={onChange} ref={ref} />
                                            )}
                                        />{errors && <span className='text-red-800 '>{errors.note?.message}</span>}
                                    </div>

                                </div>
                                <ButotnComponent css={cssBtn} title='Gửi' />
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default ContactComponent;
const Contacts_css = css`
max-width: 1140px;
box-sizing: border-box;
margin:auto;
justify-content:center;

.img{
    display: block;
    width: 100%;    
    overflow: hidden;
    border-radius: 80px 0px;            
}
.contact{
    display: flex;
    flex-wrap: wrap;
}
.right{
    width:35%;
    margin-right:30px;
}
.item{
    display:flex;    
    padding: 18px 40px;
    display: flex;
    align-items: center;
    border: 1px solid #e7e8e9;
    min-height: 118px;
    margin-top:40px;    
}
.icon{
    height: 70px;
    flex: 0 0 70px;
    max-width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f8f9;
    border-radius: 50%;
    font-size: 24px;
    color: #221f20;
    margin:38px 50px 38px 0px;
}
.text h4{
    margin-bottom: 8px;
    font-size: 20px;
    line-height: 24px;
    color: #221f20;
}
p{
    margin-bottom: 0;
    display: block;
    font-size: 20px;
    line-height: 24px;
    color:#57585a;    
}
.left{
    width:62%;    
    margin-top:40px;
}
.form{
    border: 1px solid #e7e8e9;
    border-radius: 32px 0px;
    width:100%;
    padding: 20px;
}
.page-title{
    font-weight: 550;
    font-size: 30px;
    line-height: 32px;
    color: #221f20;
    letter-spacing: 2px;

}
.input{
   width:100%;
   border: 1px solid #e7e8e9;
   border-radius:10px;
   padding:20px;
   display:flex;
}

@media (min-width: 0) and (max-width: 739px) {
    .img{
        width:100%;        
        border-radius: 60px 0px;           
        padding:10px; 
    }
    .contact{
        display:block;
    }
    .right{
        width:100%;
    }
    .item{
        padding: 5px 20px;
    }
    .icon{
        font-size: 20px;            
    }
    .text h4{
        font-size: 15px;
        line-height: 19px;
    }
    p{
        font-size: 15px;
        line-height: 19px;
    }
    .left{
        width:100%;
    }
    .input{
        margin-bottom:20px;
    }
}
@media (min-width: 740px) and (max-width: 1023px) {
    .img{
        width:100%;        
        border-radius: 60px 0px;           
        padding:10px; 
    }
    .contact{
        display:block;
    }
    .right{
        width:100%;
    }
    .item{
        padding: 5px 20px;
    }
    .icon{
        font-size: 20px;            
    }
    .text h4{
        font-size: 15px;
        line-height: 19px;
    }
    p{
        font-size: 15px;
        line-height: 19px;
    }
    .left{
        width:100%;
    }
    .input{
        margin-bottom:20px;
    }
}
`
const cssBtn = css`
  width: 100%;
  height: 50px;
  padding: 8px 24px;
  border-radius: 16px 0px;
  font-size: 20px;
  line-height: 24px;
  margin:auto;
`