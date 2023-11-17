import SaidBarComponent from './component/saidbar/saidbar.component'
import MainProduct from './component/main-product/main-product.component'
import { useState } from 'react'

const ProductComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    return (
        <div className='max-sm:px-3 sm:flex sm:w-[1140px] m-auto justify-between mt-3'>
            <div className='sm:w-[20%]'>
                <SaidBarComponent
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    selectedPriceRange={selectedPriceRange}
                    onSelectPriceRange={setSelectedPriceRange} />
            </div>
            <div className='sm:w-[75%]'>
                <MainProduct selectedCategory={selectedCategory} selectedPriceRange={selectedPriceRange} />
            </div>
        </div>
    )
}

export default ProductComponent