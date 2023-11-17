import { RouteObject } from "react-router-dom";
import Home from "./home/home.component";
import DetailComponent from "./detail/detail.component";
import CartComponent from "./cart/cart.component";
import CheckoutComponent from "./checkout/checkout.component";
import LoginComponent from "./login/login.componennt";
import RegisterComponent from "./register/register.component";
import ManageComponent from "./manage/manage.component";
import ProductComponent from "./product/product.component";
import ContactComponent from "./contact/contact.component";
import ThankCustomers from "./thankyou-custommer/thanhyou-custommer.component";
import ForgotPassword from "./forgot-password/forgot-password.component";
import ManageAccounts from "./manage-account/manage-account.component";

export const clientRouter: RouteObject[] = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/detail/:id",
        element: <DetailComponent />
    },
    {
        path: "/cart",
        element: <CartComponent />
    },
    {
        path: "/checkout",
        element: <CheckoutComponent />
    },
    {
        path: "/login",
        element: <LoginComponent />
    },
    {
        path: "/register",
        element: <RegisterComponent />
    },
    {
        path: "/manage-order",
        element: <ManageComponent />
    },
    {
        path: "/manage-account",
        element: < ManageAccounts />
    },
    {
        path: "/product",
        element: <ProductComponent />
    },
    {
        path: "/contact",
        element: <ContactComponent />
    },
    {
        path: "/thankyou",
        element: <ThankCustomers />
    },
    {
        path: "/forgotpassword",
        element: <ForgotPassword />
    }
]