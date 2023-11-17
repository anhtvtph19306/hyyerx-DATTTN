import { css } from '@emotion/react'
import { BsSearch, BsHeart } from 'react-icons/bs'
import { GiShoppingCart } from 'react-icons/gi'
import { VscAccount } from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom'
import { BiLogOut } from "react-icons/bi"
import { GrUserManager } from 'react-icons/gr'
import ButotnComponent from '../../parts/button/button.component'
import { useCartRedux } from '~/app/modules/client/redux/hook/useCartReducer'
import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { Badge } from 'antd'
import { getAllContent } from '~/app/api/content/content.api'

const Header = () => {
  const [content, setContent] = useState<any>([])
  useEffect(() => {
    getAllContent().then((res) => {
      setContent(res)
    })
  }, [])
  const accsetToken = localStorage.getItem("accessToken")
  const roloUser = localStorage.getItem('roleUser')
  const [searchItem, setSearchItem] = useState('')
  const handelSearch = (event: any) => {
    setSearchItem(event.target.value)

  }

  const handelSearchProduct = () => {
    navigate(`product?q=${searchItem}`)
    location.reload()
  }
  const navigate = useNavigate()
  const handelLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userId")
    localStorage.removeItem("emailUser")
    localStorage.removeItem("roleUser")
    navigate("/login")
    location.reload()
  }
  const { data: { carts }, actions } = useCartRedux()
  useEffect(() => {
    actions.getAllcarts()
  }, [])
  return (
    <div css={cssHeader} className='max-sm:px-2'>
      <div className='bg-[#f5f5f5]'>
        <div className='flex justify-between sm:w-[1140px] m-auto pb-2 pt-2 text-xs'>
          <div className=' '>
            <h2>Earn Rewards</h2>
          </div>

          <div className='flex'>
            <div className='px-3'>English</div>
            <a href="#" className='px-3'>Gift Cards</a>
            <a href="#" className='px-3'>Blog</a>
            <a href="#" className='px-3'>Help</a>
          </div>
        </div>
      </div>
      <div className='sm:flex justify-between m-auto sm:w-[1140px] mt-6'>
        <div className='sm:flex items-center '>
          <Link to={"/"}>
            <img src="https://res.cloudinary.com/dqqk62wk1/image/upload/v1700231570/z4890548876231_1ab4ceb769dd85687dbcc54a90cf87f9_r70wcw.jpg" alt="" className='w-[200px] max-sm:m-auto' />
          </Link>

          <div className='flex max-sm:mt-3'>
            <input
              onChange={handelSearch}
              type='text'
              className='px-8 sm:w-[448px] max-sm:w-full border border-[#D8D8D8] py-3 text-[11px]'
              placeholder='Tìm kiếm sản phẩm tại đây'
            />
            <button className='bg-black text-white px-[10px] py-[10px]' onClick={handelSearchProduct}>
              <BsSearch size={22} />
            </button>
          </div>

        </div>
        <div className='flex items-center max-sm:mt-4 max-sm:float-right'>
          <Link to={"/cart"}>
            <button className='px-3'>
              <div className='max-sm:mt-[-110px] mt-[-26px]'>
                <Badge count={carts?.length > 0 ? (carts?.length) : (0)} />

                <GiShoppingCart size={37} />
                <a href="#" className='text-[15px]'>giỏ hàng</a>
              </div>

            </button>
          </Link>

          {accsetToken ? (
            <div className='title'>
              <button className='px-3 '>
                <VscAccount size={30} />
                <span >
                  <p className='text-[15px] mt-2'>
                    Tài khoản của tôi
                  </p>
                  <ul className='links sm:w-[150px]'>
                    <li>
                      <button >
                        <p className='hover:text-red-700 font-normal text-[15px] flex items-center' onClick={handelLogout}>Đăng xuất <p className='px-2'><BiLogOut className='text-[20px]' /></p></p>
                        <Link to={"/manage-order"}>  <p className='hover:text-red-700 font-normal text-[15px] flex items-center py-2'>Quản lý <p className='px-2'><GrUserManager className='text-[20px]' /> </p></p></Link>
                      </button>
                    </li>
                  </ul>
                </span>

              </button>
            </div>
          ) : (
            <div className='px-3 pt-3'>
              <Link to={"/register"}><ButotnComponent title={"Tạo tài khoản"} handelColor className=' w-[180px]' /></Link>
              <p className='text-xs mt-2'>Bạn đã có tài khoản chưa? <Link to={"/login"}><a href="#" className='text-[#BF0000] text-[15px] font-semibold '>Đăng nhập</a></Link></p>
            </div>
          )}

        </div>
      </div>
      <div className='sm:flex justify-between items-center m-auto sm:w-[1140px]'>
        <div className=' mt-2'>
          <ul className='w-[300px] flex justify-between max-sm:m-auto max-sm:py-3'>
            <li><Link to={"/"}><a href="#">Trang chủ</a></Link></li>
            <li><Link to={"/product"}><a href="#">Sản Phẩm</a></Link></li>
            <li><Link to={"/contact"}><a href="#">Liên hệ</a></Link></li>
          </ul>
        </div>
        <div className='max-sm:text-center '>
          {accsetToken && roloUser == "ADMIN" ? (
            <div className='text-[22px] font-semibold text-[#BF0000]'><Link to={"/admin"}>Quản lý website</Link></div>
          ) : ("")}
        </div>
      </div>


      <div className='sm:w-[1140px] m-auto'>
        {content?.length > 0 && content.some((item: any) => item.hidden === "Hiển thị") && (
          <Marquee direction="left" className='py-1 my-5 z-0 rounded-md' style={{ backgroundColor: "#BF0000" }}>
            {content?.map((item: any) => {
              if (item.hidden === "Hiển thị") {
                return (
                  <p style={{ padding: "0px 300px" }} className='text-[20px] text-white italic flex' >
                    <img className='w-auto h-[30px] px-3' src="https://thuannam.ninhthuan.gov.vn/chinhquyen/thuannam/Pictures/iconloathongbao59983935.gif" alt="Logo" />
                    {item.content}
                  </p>
                );
              }
              return null;
            })}
          </Marquee>
        )}

      </div>


    </div>
  )
}

export default Header

const cssHeader = css`
li a{
  font-weight: 600;
  font-size: 1.2rem;
}

.links {
  list-style: none;
  background-color: white;
  box-shadow: 0 0 7px gray;
  position: absolute;
  top: 100%;
 
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  z-index: 1;
  visibility: hidden;
}

.title:hover .links {
  visibility: visible;
}
.title{
  cursor: pointer;
  position: relative;
}
`