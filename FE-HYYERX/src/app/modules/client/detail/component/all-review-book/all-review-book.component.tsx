import { useState } from 'react'
import ButotnComponent from '~/app/component/parts/button/button.component'
import { Modal, Rate } from 'antd';
import { createComment } from '~/app/api/comment/comment.api';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useCommentRedux } from '../../../redux/hook/useCommentReducer';
import { useProductRedux } from '../../../redux/hook/useProductReducer';
const AllReviewBook = () => {
    let { id } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentText, setCommentText] = useState('')
    const { actions } = useCommentRedux()
    const [value, setValue] = useState(5);
    const desc = ['không tốt', 'trung bình', 'bình thường', 'tốt', 'rất tốt'];

    const { data: { product } } = useProductRedux()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleTextAreaChange = (event: any) => {
        setCommentText(event.target.value)
    };


    const handelSubmitComment = () => {
        const userId: any = localStorage.getItem("userId")
        const email: any = localStorage.getItem("emailUser")
        createComment({ comment: commentText, productId: { _id: id, name: product.name }, star: value, userId: { _id: userId, name: email } }).then((res) => {
            if (res) {
                toast.success("bình luận thành công")
                setIsModalOpen(false);
                actions.getAllComments(id)
            }
        }, (err) => {
            toast.error(err.response.data)
        })
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className='sm:flex justify-between items-center my-5 max-sm:text-center'>
                <div>
                    <h2 className='text-[16px] font-semibold text-gray-600'>Tất cả bình luận đánh giá</h2>
                </div>

                <div className='sm:flex items-center'>
                    <div className='px-8'>
                        <select name="" id="" className='w-[250px] rounded-sm h-[40px] text-center'>
                            <option value="0">lọc tất cả đánh giá</option>
                            <option value="1">5 sao</option>
                            <option value="2">4 sao</option>
                            <option value="3">3 sao</option>
                            <option value="4">2 sao</option>
                            <option value="5">1 sao</option>
                        </select>
                    </div>
                    <div>
                        <h2 className='text-[16px] font-semibold text-gray-600 mb-2 text-center'>
                            chia sẻ cảm nghĩ của bạn tại đây
                        </h2>

                        <ButotnComponent handelColor className="w-[200px] font-semibold" title={"bình luận đánh giá tại đây"} onClick={showModal} />
                        <div>
                            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} footer={null}>
                                <div className='flex'>
                                    <div>
                                        <img src={product?.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} alt="" className='w-[200px]' />
                                        {/* <h2 className='text-[15px] font-semibold py-2'>T</h2>
                                        <p className='text-[14px] text-gray-600 font-semibold'>by Kristin Hannah</p> */}
                                    </div>

                                    <div className='px-4 w-[650px]'>
                                        <h1 className='text-[22px] font-semibold'>Chia sẻ suy nghĩ</h1>
                                        <p className='text-[14px] text-gray-600 font-semibold'>bạn hãy cho shop nhưng ý kiến để chúng tôi sẽ cố gắng phát triển hơn</p>
                                        <div className='flex justify-between items-center'>
                                            <div className='text-[16px] text-gray-600 font-semibold'>
                                                Đánh giá
                                            </div>
                                            <div className='flex'>
                                                <span>
                                                    <Rate tooltips={desc} onChange={setValue} value={value} />
                                                    {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                                                </span>
                                            </div>
                                        </div>
                                        <hr />

                                        <h2 className='text-[15px] my-4 font-semibold'>Viết bình luận</h2>

                                        <textarea placeholder='bình luận tại đây' className='w-full border border-gray-600 px-2' onChange={handleTextAreaChange}></textarea>

                                        <div className='flex items-center mt-3 float-right'>
                                            <div className=''>
                                                <ButotnComponent title={"Thoát"} onClick={handleOk} className="w-[100px]" />
                                            </div>
                                            <div>
                                                <ButotnComponent type="submit" handelColor title={"Nhận"} className="w-[100px]" onClick={handelSubmitComment} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>


                </div>
            </div>
            <hr className='my-5' />
        </>

    )
}

export default AllReviewBook