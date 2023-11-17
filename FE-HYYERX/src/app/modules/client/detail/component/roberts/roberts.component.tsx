import SwiperList from '~/app/component/stack/swiper-list/swiper-list.component'
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import ItemProductNoBuy from '~/app/component/parts/item-products/item-product-no-buy.component';
import { useProductRedux } from '../../../redux/hook/useProductReducer';
import { useEffect } from 'react';

const RobertsComponent = () => {
    const {
        data: { products },
        actions
    } = useProductRedux()

    useEffect(() => {
        actions.getAllProducts()
    }, [])
    return (
        <div className='mt-16'>
            <SwiperList title={"More by Nora Roberts"}>
                {products?.map((item: any, index: any) => (
                    <SwiperSlide key={index + 1}>
                        <Link to={`/detail/${item._id}`}>
                            <ItemProductNoBuy itemproduct={item} />
                        </Link>

                    </SwiperSlide>
                ))}
            </SwiperList>
        </div>
    )
}

export default RobertsComponent