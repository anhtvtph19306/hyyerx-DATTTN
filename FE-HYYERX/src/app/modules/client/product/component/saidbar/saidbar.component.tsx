import { css } from "@emotion/react";
import { useCategoryRedux } from "../../../redux/hook/useCategoryReducer";
import { FC, useEffect, useState } from "react";
import { FaBars } from 'react-icons/fa';
import { GiCrossMark } from "react-icons/gi";
interface ISaidBarComponent {
    selectedCategory?: any;
    onSelectCategory?: any;
    onSelectPriceRange?: any;
    selectedPriceRange?: any;
}
const SaidBarComponent: FC<ISaidBarComponent> = ({ selectedCategory, selectedPriceRange, onSelectCategory, onSelectPriceRange }) => {
    const [checkFilter, setCheckFilter] = useState(false);
    const [showMenuIcon, setShowMenuIcon] = useState(true);

    const {
        data: { categorys },
        actions
    } = useCategoryRedux();
    useEffect(() => {
        actions.getAllCategorys()
    }, [])
    const handelSelectCategory = (dataId: any) => {
        onSelectCategory(dataId)
        console.log(dataId)
    }

    const handleShowAll = () => {
        onSelectCategory(null);
        onSelectPriceRange(null)
    };

    const handleSelectPriceRange = (priceRange: any) => {
        onSelectPriceRange(priceRange);
    };
    const toggle = () => {
        setCheckFilter(!checkFilter);
        setShowMenuIcon(!showMenuIcon);
    };
    return (
        <div css={cssSaidbar}>
            {showMenuIcon && (
                <button onClick={toggle} className={`sm:hidden float-left mt-[-130px]`}>
                    <FaBars className='text-[30px] float-left text-black top-[-200px]' />
                </button>
            )}
            <div className={checkFilter ? 'menu-open' : 'menu-closed'}>
                <div>
                    <GiCrossMark className='text-[25px] text-black ' onClick={toggle} />
                    <h3 className="bg-[#ededed] py-2 font-semibold px-3 ">Category</h3>
                    <div>
                        <p onClick={handleShowAll}>Hiện thị tất cả</p>
                        {categorys?.map((item: any, index: any) => (
                            <p key={index + 1} onClick={() => handelSelectCategory(item._id)}>
                                {item?.name}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="bg-[#ededed] py-2 font-semibold px-3 mt-2">price filter</h3>
                    <div>
                        <p onClick={handleShowAll}>Hiện thị tất cả</p>
                        <p onClick={() => handleSelectPriceRange("10000-50000")}>10.000đ đến 50.000đ</p>
                        <p onClick={() => handleSelectPriceRange("51000-200000")}>51.000đ đến 200.000đ</p>
                        <p onClick={() => handleSelectPriceRange("210000-400000")}>210.000đ đến 400.000đ</p>
                        <p onClick={() => handleSelectPriceRange("410000-600000")}>410.000đ đến 600.000đ</p>
                        <p onClick={() => handleSelectPriceRange("610000-800000")}>610.000đ đến 800.000đ</p>
                        <p onClick={() => handleSelectPriceRange("810000-1000000")}>810.000đ đến 1.000.000đ</p>
                    </div>
                </div>
                <div>
                    <h3 className="bg-[#ededed] py-2 font-semibold px-3 mt-2">Khác</h3>
                    <div>
                        <p>Sản phẩm yêu thích</p>
                        <p>Sắp xếp giá từ cao đến thấp</p>
                        <p>Sắp xếp giá từ thấp đến cao</p>
                        <p>Sản phẩm mới nhất</p>
                        <p>Sản phẩm được mua nhiều nhất</p>
                    </div>
                </div>
            </div>
            <div className="max-sm:hidden">
                <div>
                    <h3 className="bg-[#ededed] py-2 font-semibold px-3 ">Tìm theo danh mục</h3>
                    <div>
                        <p onClick={handleShowAll}>Hiện thị tất cả</p>
                        {categorys?.map((item: any, index: any) => (
                            <p key={index + 1} onClick={() => handelSelectCategory(item._id)}>
                                {item?.name}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="bg-[#ededed] py-2 font-semibold px-3 mt-2">Tìm theo giá</h3>
                    <div>
                        <p onClick={handleShowAll}>Hiện thị tất cả</p>
                        <p onClick={() => handleSelectPriceRange("10000-50000")}>10.000đ đến 50.000đ</p>
                        <p onClick={() => handleSelectPriceRange("51000-200000")}>51.000đ đến 200.000đ</p>
                        <p onClick={() => handleSelectPriceRange("210000-400000")}>210.000đ đến 400.000đ</p>
                        <p onClick={() => handleSelectPriceRange("410000-600000")}>410.000đ đến 600.000đ</p>
                        <p onClick={() => handleSelectPriceRange("610000-800000")}>610.000đ đến 800.000đ</p>
                        <p onClick={() => handleSelectPriceRange("810000-1000000")}>810.000đ đến 1.000.000đ</p>
                    </div>
                </div>

                <div>
                    <h3 className="bg-[#ededed] py-2 font-semibold px-3 mt-2">Khác</h3>
                    <div>
                        <p>Sản phẩm yêu thích</p>
                        <p>Sắp xếp giá từ cao đến thấp</p>
                        <p>Sắp xếp giá từ thấp đến cao</p>
                        <p>Sản phẩm mới nhất</p>
                        <p>Sản phẩm được mua nhiều nhất</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SaidBarComponent;

const cssSaidbar = css`
  p {
    padding: 5px 7px;
    font-size: 15px;
  }
  p:hover {
    color: #BF0000;
    background: #ededed;
  }

  .menu-open {
    width: 70%;
    background-color: white;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    transition: all 0.3s;
  }

  .menu-closed {
    width: 0;
    background-color: transparent;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    transition: all 0.3s;
  }
`;
