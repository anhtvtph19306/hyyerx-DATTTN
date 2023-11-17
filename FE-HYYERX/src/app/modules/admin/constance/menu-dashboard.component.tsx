import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { SiAdminer } from 'react-icons/si';
export const menuDashBoard = [
    {
        key: '/admin',
        icon: <SiAdminer />,
        label: 'Bảng Điều Khiển'
    },
    {
        key: '/admin/product',
        icon: <UserOutlined />,
        label: 'Sản Phẩm',
    },
    {
        key: '/admin/category',
        icon: <VideoCameraOutlined />,
        label: 'Danh Mục',
    },
    {
        key: '/admin/comment',
        icon: <VideoCameraOutlined />,
        label: 'Bình Luận & Đánh giá',
    },
    {
        key: '/admin/order',
        icon: <UploadOutlined />,
        label: 'Đơn Hàng',
    },
    {
        key: '/admin/user',
        icon: <UploadOutlined />,
        label: 'Người Dùng',
    },
    {
        key: '/admin/statictis',
        icon: <UploadOutlined />,
        label: 'Thống Kê',
    },
    {
        key: '/admin/vorcher',
        icon: <UploadOutlined />,
        label: 'Mã Khuyến Mãi',
    },
    {
        key: '/admin/content',
        icon: <UploadOutlined />,
        label: 'Nội Dung',
    },
    {
        key: '/admin/contact',
        icon: <UploadOutlined />,
        label: 'Thư Liên Hệ',
    },
    {
        key: '/',
        icon: <UploadOutlined />,
        label: 'Trở lại Trang Chủ',
    }
]