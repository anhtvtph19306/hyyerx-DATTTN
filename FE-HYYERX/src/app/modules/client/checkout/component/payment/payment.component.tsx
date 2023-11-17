import { css } from '@emotion/react'
import { Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { FaMoneyCheckAlt } from "react-icons/fa"
interface IPaymentComponent {
    control: any,
    errors: any
}

const PaymentComponent: FC<IPaymentComponent> = ({ control, errors }) => {
    const [citis, setCitis] = useState<any>([])
    const [districts, setDistricts] = useState<any>([])
    const [communs, setCommuns] = useState<any>([])
    const [selectedCity, setSelectedCity] = useState<any>([])
    const [selecteddistricts, setSelectedDistricts] = useState<any>([])
    const [selectedCommuns, setSelectedCommuns] = useState<any>([])

    const loadCitis = async () => {
        const res = await fetch(`https://provinces.open-api.vn/api/`)
        const data = await res.json()
        setCitis(data)
    }

    const loadDistricts = async (dataCiti: any) => {
        const selectedCity = citis.find((city: any) => city.name == dataCiti)
        if (selectedCity) {
            const res = await fetch(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
            const data = await res.json()
            setDistricts(data.districts)
        }
    }

    const loadCommuns = async (districName: any) => {
        const seletedDistrict = districts.find((district: any) => district.name == districName)
        if (seletedDistrict) {
            const res = await fetch(`https://provinces.open-api.vn/api/d/${seletedDistrict.code}?depth=2`)
            const data = await res.json()
            setCommuns(data.wards)
        }
    }

    useEffect(() => {
        loadCitis()
    }, [])

    useEffect(() => {
        if (selectedCity) {
            loadDistricts(selectedCity)
            setSelectedDistricts('')
            setSelectedCommuns('')
        }
    }, [selectedCity])

    useEffect(() => {
        if (selecteddistricts) {
            loadCommuns(selecteddistricts)
            setSelectedCommuns('')
        }
    }, [selecteddistricts])
    return (
        <div css={cssPayment}>
            <div className='sm:flex justify-between'>
                <h2 className='text-[17px] font-semibold text-red-700'>Thanh toán</h2>
                <em className='text-gray-400'>* Lựa chọn các phương thức thanh toán</em>
            </div>
            <div className='sm:flex justify-between '>
                <div>
                    <form action="" className='w-[300px]'>
                        <div>
                            <Controller
                                control={control}
                                name="fullname"
                                render={({
                                    field: { onChange, value, ref },
                                    fieldState: { error } }) => (
                                    <input type="text" value={value} placeholder='Họ và tên' onChange={onChange} ref={ref} />
                                )}
                            />
                            {errors && <span className="text-red-800 font-semibold">{errors.fullname?.message}</span>}
                        </div> <br />

                        <div>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({
                                    field: { onChange, value, ref },
                                    fieldState: { error } }) => (
                                    <input type="text" value={value} placeholder='Số điện thoại' onChange={onChange} ref={ref} />
                                )}
                            />
                            {errors && <span className="text-red-800 font-semibold">{errors.phoneNumber?.message}</span>}
                        </div><br />
                        <div>
                            <Controller
                                control={control}
                                name="city"
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <div>
                                        <Select
                                            placeholder="Chọn Tỉnh/Thành Phố"
                                            className='w-[330px]'
                                            onChange={(value: string) => {
                                                setSelectedCity(value);
                                                setSelectedDistricts('');
                                                setSelectedCommuns('');
                                                onChange(value);
                                            }}
                                            value={value}
                                        >
                                            {citis?.map((item: any) => (
                                                <Select.Option key={item.code} value={item.name}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {error && <span className='text-red-800 font-semibold'>{error.message}</span>}
                                    </div>
                                )}
                            />
                        </div>
                        <br />
                        <div>
                            <Controller
                                control={control}
                                name="district"
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <div>
                                        <Select
                                            placeholder="Chọn Quận/Huyện"
                                            className='w-[330px]'
                                            onChange={(value: string) => {
                                                setSelectedDistricts(value);
                                                setSelectedCommuns('');
                                                onChange(value);
                                            }}
                                            value={value}
                                        >
                                            {districts?.map((item: any) => (
                                                <Select.Option key={item.code} value={item.name}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {error && <span className='text-red-800 font-semibold'>{error.message}</span>}
                                    </div>
                                )}
                            />
                        </div><br />

                        <div >
                            <Controller
                                control={control}
                                name="commune"
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <div>
                                        <Select
                                            placeholder="Chọn Phường/Xã"
                                            className='w-[330px]'
                                            onChange={(value: string) => {
                                                setSelectedCommuns(value);
                                                onChange(value);
                                            }}
                                            value={value}
                                        >
                                            {communs?.map((item: any) => (
                                                <Select.Option key={item.code} value={item.name}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {error && <span className='text-red-800 font-semibold'>{error.message}</span>}
                                    </div>
                                )}
                            />

                        </div> <br />
                        <div>
                            <Controller
                                control={control}
                                name="detailAddress"
                                render={({
                                    field: { onChange, value, ref },
                                    fieldState: { error } }) => (
                                    <input type="text" value={value} placeholder='Địa chỉ chi tiết' onChange={onChange} ref={ref} />
                                )}
                            />
                            {errors && <span className="text-red-800 font-semibold">{errors.detailAddress?.message}</span>}
                        </div> <br />
                    </form>
                </div>
                <div>
                    <div className='flex mt-9 '>
                        <p className='px-4'><FaMoneyCheckAlt className='text-red-800 text-[30px]' /></p> <p>Thanh toán bằng vnPay</p>
                    </div>
                    <div className='flex mt-3'>
                        <p className='px-4'><FaMoneyCheckAlt className='text-red-800 text-[30px]' /></p> <p>Thanh toán khi khi giao hàng</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentComponent

const cssPayment = css`
form {
    margin: 20px auto;
}
span {
    font-weight: bold;
}

input[type="text"] {
    width: 330px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
}
@media (min-width: 0) and (max-width: 739px) {
    input[type="text"] {
        width: 100%;
       
    }
  }
`