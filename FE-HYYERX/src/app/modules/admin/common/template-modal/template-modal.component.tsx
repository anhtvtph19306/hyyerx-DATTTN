import { FC } from 'react';
import { Modal } from 'antd';

interface ITempalteModel {
    isModelOpen: boolean
    handleOk(): void
    handleCancel(): void
    children?: any
}
const TemplateModal: FC<ITempalteModel> = ({ isModelOpen, handleOk, handleCancel, children }) => {

    return (
        <>
            <Modal title="FORM" open={isModelOpen} onOk={handleOk} onCancel={handleCancel}>
                {children}
            </Modal>
        </>
    );
};

export default TemplateModal;