import { useEffect } from "react";
import { useProductRedux } from "../redux/hook/useProductReducer";
import BannerComponent from "./component/banner/banner.component"
import Fantastic from "./component/fantastic/fantastic.component"
import NewReleases from "./component/new-releases/new-releases.component"
import TrenddingComponent from "./component/trendding/trendding.component"
import { Skeleton } from 'antd';

const Home = () => {
    const {
        data: { products },
        actions
    } = useProductRedux()
    useEffect(() => {
        actions.getAllProducts()
    }, [])
    return (
        <div className="sm:w-[1140px] m-auto max-sm:px-3">
            <div>
                <BannerComponent />
            </div>
            {products.length == 0 ? (
                <Skeleton />
            ) : (<div>
                <div>
                    <TrenddingComponent />
                </div>

                <div>
                    <NewReleases />
                </div>
                <div>
                    <Fantastic />
                </div>
            </div>)}
        </div>
    )
}

export default Home