import Footer from "~/app/component/stack/footer/footer.component"
import Header from "~/app/component/stack/header/header.component"
import { Outlet } from "react-router-dom"

const DefaultHome = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <Outlet />

            <div>
                <Footer />
            </div>

        </>
    )
}

export default DefaultHome