
import ItemProduct from '~/app/component/parts/item-products/item-product.component'
import { useProductRedux } from '../../../redux/hook/useProductReducer'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
interface IMainProduct {
    selectedCategory?: any
    selectedPriceRange?: any
}
const MainProduct: FC<IMainProduct> = ({ selectedCategory, selectedPriceRange }) => {
    const keyWords = new URLSearchParams(location.search).get('q')
    const {
        data: { products },
        actions
    } = useProductRedux()
    const filteredProducts = keyWords
        ? products.filter((item: any) => item.name.toLowerCase().includes(keyWords.toLowerCase()))
        : selectedCategory
            ? products.filter((item: any) => item.categoryId._id === selectedCategory)
            : selectedPriceRange
                ? products.filter((item: any) => {
                    const [min, max] = selectedPriceRange.split('-');
                    return item.newPrice >= parseInt(min, 10) && item.newPrice <= parseInt(max, 10);
                })
                : products;

    useEffect(() => {
        actions.getAllProducts()
    }, [keyWords])
    return (
        <div className='grid grid-cols-1 sm:grid-cols-5 max-sm:grid-cols-2 gap-10 justify-center items-center'>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((item: any, index: any) => (
                    <Link to={`/detail/${item._id}`} key={index}>
                        <ItemProduct itemproduct={item} />
                    </Link>
                ))
            ) : (
                <p className='text-center w-[300px] text-[18px] text-gray-600 font-semibold'>Không có sản phẩm</p>
            )}
        </div>

    )
}

export default MainProduct