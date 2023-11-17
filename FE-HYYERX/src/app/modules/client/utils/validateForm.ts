import * as yup from "yup";

export const schemaRegister = yup.object().shape({
    fullname: yup.string().required("không được để trống"),
    email: yup.string().required("không được để trống"),
    password: yup.string().required("không được để trống")
});

export const schemaLogin = yup.object().shape({
    email: yup.string().required("không được để trống"),
    password: yup.string().required("không được để trống")
});

export const schemaForgotPassword = yup.object().shape({
    email: yup.string().required("không được để trống")
});

export const schemaShiping = yup.object().shape({
    fullname: yup.string().required("không được để trống"),
    phoneNumber: yup.string().required("không được để trống"),
    city: yup.string().required("không được để trống"),
    district: yup.string().required("không được để trống"),
    commune: yup.string().required("không được để trống"),
    detailAddress: yup.string().required("không được để trống")
});

export const validateContact = yup.object().shape({
    name: yup.string().required('Bạn cần nhập đầy đủ thông tin'),
    phoneNumber: yup.string().required('Bạn cần nhập đầy đủ thông tin'),
    email: yup.string().required('Bạn cần nhập đầy đủ thông tin'),
    topic: yup.string().required('Bạn cần nhập đầy đủ thông tin'),
    note: yup.string().required('Bạn cần nhập đầy đủ thông tin')
})