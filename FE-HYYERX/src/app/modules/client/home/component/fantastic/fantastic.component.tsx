
import SwiperList from '~/app/component/stack/swiper-list/swiper-list.component'
import { SwiperSlide } from 'swiper/react';
import ItemProduct from '~/app/component/parts/item-products/item-product.component';
import { useProductRedux } from '../../../redux/hook/useProductReducer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Fantastic = () => {
    const {
        data: { products },
        actions
    } = useProductRedux()

    useEffect(() => {
        actions.getAllProducts()
    }, [])
    return (
        <div className='mt-16'>
            <SwiperList title={"Sản phẩm mua nhiều nhất"}>
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

export default Fantastic