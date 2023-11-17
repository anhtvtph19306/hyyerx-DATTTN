import { Form, Input, DatePicker, Select } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component';
import { changeVorcher, createVocher, deleteVorcher, getAllVorcher, searchVorcher } from './service/vorcher.service';
import moment from 'moment-timezone';
const { Option } = Select

const VorcherAdmin = () => {
    const [column, setColumn] = useState([])
    const [reset, setReset] = useState<boolean>(true)
    const [dataVorcher, setDataVorcher] = useState<any>([])
    const convertToVietnamTime = (utcTime: any) => {
        return moment(utcTime).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    };
    useEffect(() => {
        getAllVorcher().then((res) => {
            setDataVorcher(res.data)
        })
    }, [reset])
    useEffect(() => {
        const columTemp: any = [];
        const title = ['', 'Tên', 'Giảm giá', 'Loại', 'Mã giảm giá', 'Ngày bắt đầu', 'Ngày kết thúc']
        if (dataVorcher.length > 0) {
            Object.keys(dataVorcher[0]).forEach((itemKey, key = 0) => {
                if (!['_id', '__v', 'createdAt', 'updatedAt', 'timeRemaining'].includes(itemKey)) {
                    if (itemKey === 'startday' || itemKey === 'endday') {
                        columTemp.push({
                            title: title[key++],
                            dataIndex: itemKey,
                            key: itemKey,
                            render: (text: any) => {
                                return convertToVietnamTime(text);
                            },
                        });
                    } else {
                        columTemp.push({
                            title: title[key++],
                            dataIndex: itemKey,
                            key: itemKey,
                            render: (text: any, record: any, index: any) => {
                                if (itemKey === 'discount') {
                                    return <div>{(record?.discount)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                }
                                return text
                            },
                        });
                    }
                }
            });

            columTemp.push({
                title: 'Thời gian còn lại',
                dataIndex: 'timeRemaining',
                key: 'timeRemaining',
                render: (text: any, record: any) => {
                    if (record.startday && record.endday) {
                        const startTime = moment(record.startday);
                        const endTime: any = moment(record.endday);
                        const now: any = moment();

                        if (now.isBefore(endTime)) {
                            const remainingTime = moment.duration(endTime - now);
                            const daysRemaining = remainingTime.days();
                            const hoursRemaining = remainingTime.hours();
                            const minutesRemaining = remainingTime.minutes();
                            const secondsRemaining = remainingTime.seconds();

                            return `${daysRemaining} ngày ${hoursRemaining} giờ ${minutesRemaining} phút ${secondsRemaining} giây còn lại`;
                        } else {
                            return 'Hết hạn';
                        }
                    }
                    return text;
                },
            });
        }

        setColumn(columTemp);
    }, [dataVorcher]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now: any = moment();
            const updatedDataVorcher = dataVorcher.map((voucher: any) => {
                if (now.isBefore(voucher.endday)) {
                    const remainingTime = moment.duration(voucher.endday - now);
                    const hoursRemaining = remainingTime.hours();
                    const minutesRemaining = remainingTime.minutes();
                    const secondsRemaining = remainingTime.seconds();
                    voucher.timeRemaining = `${hoursRemaining} giờ ${minutesRemaining} phút ${secondsRemaining} giây còn lại`;
                } else {
                    voucher.timeRemaining = 'Hết hạn';
                }
                return voucher;
            });
            const nonExpiredVouchers = updatedDataVorcher.filter((voucher: any) => voucher.timeRemaining !== 'Hết hạn');
            setDataVorcher(updatedDataVorcher);
            const allExpired = nonExpiredVouchers.every((voucher: any) => voucher.timeRemaining === 'Hết hạn');
            if (allExpired) {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [dataVorcher]);


    const handelGetList = () => {
        setReset(!reset)
    }
    return (
        <div>
            <TemplateTable searchFunc={searchVorcher} setNewData={setDataVorcher} dataTable={dataVorcher} changeFunc={changeVorcher} columsTable={column} handelGetlist={handelGetList} createFunc={createVocher} deleteFunc={deleteVorcher}
                formEdit={
                    <Fragment>
                        <Form.Item
                            label='Tên Vorcher'
                            name='name'
                            rules={[{ required: true, message: 'Vui lòng nhập Tên Vorcher!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Loại vorcher"
                            name="type"
                            rules={[{ required: true, message: 'Vui lòng nhập Loại vorcher!' }]}
                        >
                            <Select>
                                <Option value="Ngày lễ">Ngày lễ</Option>
                                {/* <Option value="Giới hạn">Giới hạn</Option> */}
                                <Option value="Mã Giảm giá">Mã Giảm giá</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Giảm giá'
                            name='discount'
                            rules={[{ required: true, message: 'Vui lòng nhập Giảm giá!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Mã code giảm giá'
                            name='code'
                            rules={[{ required: true, message: 'Vui lòng nhập Mã code giảm giá!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Ngày bắt đầu'
                            name='startday'
                            rules={[{ required: true, message: 'Vui lòng chọn Ngày bắt đầu!' }]}
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>

                        <Form.Item
                            label='Ngày kết thúc'
                            name='endday'
                            rules={[{ required: true, message: 'Vui lòng chọn Ngày kết thúc!' }]}
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>

                    </Fragment>
                }
            />
        </div>
    )
}


export default VorcherAdmin