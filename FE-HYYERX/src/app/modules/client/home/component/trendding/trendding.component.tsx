
import SwiperList from '~/app/component/stack/swiper-list/swiper-list.component'
import { SwiperSlide } from 'swiper/react';
import ItemProduct from '~/app/component/parts/item-products/item-product.component';
import { Link } from 'react-router-dom';
import { useProductRedux } from '../../../redux/hook/useProductReducer';
import { useEffect } from 'react';

const TrenddingComponent = () => {

    const {
        data: { products },
        actions
    } = useProductRedux()

    useEffect(() => {
        actions.getAllProducts()
    }, [])
    return (
        <div className='mt-16'>
            <SwiperList title={"Sản phẩm yêu thích nhất"}>
                {products?.map((item: any, index: any) => (
                    <SwiperSlide key={index + 1}>
                        <Link to={`/detail/${item._id}`}>
                            <ItemProduct itemproduct={item} />
                        </Link>
                    </SwiperSlide>
                ))}
            </SwiperList>
        </div>
    )
}

export default TrenddingComponent