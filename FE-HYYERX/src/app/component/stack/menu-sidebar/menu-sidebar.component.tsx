import { css } from '@emotion/react'
import { FunctionComponent } from 'react'
import { BiSupport } from "react-icons/bi"
import { RiLuggageCartFill } from 'react-icons/ri'
import { BiSolidUserBadge } from "react-icons/bi"
import { Link } from 'react-router-dom'

interface MenuSideBarProps {
    props?: any
}

const MenuSideBar: FunctionComponent<MenuSideBarProps> = () => {
    return (
        <div css={cssMenuSideBar} className='sm:w-[200px] w-full'>
            <div className='flex items-center flex-col sm:flex-row'>
                <div className='mb-4 sm:mb-0'>
                    <img src="https://vsm.vn/wp-content/uploads/2022/04/cach-thay-the-anh-dai-dien-facebook-don-gian-nhat-cho-nguoi-dung-1.png" alt="" className='w-[50px]' />
                </div>
                <div>
                    <p className='font-semibold text-[17px] sm:px-4 text-center sm:text-left'>Xin Chào</p>
                </div>
            </div>
            <div>
                <ul className='text-center sm:text-left'>
                    <Link to={'/manage-account'}>
                        <li className='flex justify-center items-center'>
                            <p><BiSolidUserBadge className='text-[22px]' /></p> <p className='px-3'>Quản lý tài khoản</p>
                        </li>
                    </Link>
                    <Link to={"/manage-order"}>
                        <li className='flex justify-center items-center'>
                            <p><RiLuggageCartFill className='text-[22px]' /></p> <p className='px-3'>Quản lý đơn hàng</p>
                        </li>
                    </Link>

                    <li className='flex justify-center items-center'>
                        <p><BiSupport className='text-[22px]' /></p><p className='px-3'>Hỗ trợ khách hàng</p>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default MenuSideBar

const cssMenuSideBar = css`
border-right:1px solid gray;
li{
    padding:10px 0px;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: black;
}

@media (min-width: 0) and (max-width: 739px) {
    border-right:none;
    .w-full {
        max-width: 100%;
    }
    .text-center {
        text-align: center;
    }
    .text-left {
        text-align: left;
    }
}`
