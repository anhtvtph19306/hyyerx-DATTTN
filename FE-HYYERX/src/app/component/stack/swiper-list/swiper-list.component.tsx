import { Swiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { FunctionComponent } from 'react';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { css } from '@emotion/react';
import useWindowSizeLayout from '~/app/hook/useWindow';
interface ISwiperList {
    children?: any
    title?: any
}
const SwiperList: FunctionComponent<ISwiperList> = ({ children, title }) => {
    const windowSize = useWindowSizeLayout()
    return (

        <div css={cssSwiper} className='sm:h-[410px]'>
            <div>
                <span className='name-book'>product</span>
                <h2 className='title'>{title}</h2>
            </div>
            <Swiper
                slidesPerView={windowSize.width < 739 ? 2 : 6}
                spaceBetween={60}
                pagination={true}
                modules={[Navigation]}
                className="mySwiper"
                navigation={true}
            >
                {children}
            </Swiper>
        </div>
    )
}

export default SwiperList
const cssSwiper = css`
.swiper-button-next{
    color:gray;
}
.swiper-button-next:hover{
    color:#BF0000;
}
.swiper-button-prev{
    color:gray;

}
.swiper-button-prev:hover{
    color:#BF0000;
}

.name-book{
    background-color: #006265;
    border-radius: 3px;
    padding: 3px 6px;
    color: #fff
}

.title{
    font-family: "Trebuchet MS",Trebuchet,Arial,Helvetica,sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size:1.2rem;
    padding-top:10px;
    padding-bottom:30px;
}
.title:hover:{
    color:#BF0000; 
}
`
