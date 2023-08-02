import { Modal } from 'antd'
import React, { useState , createContext } from 'react'

const DelBtn: React.FunctionComponent = () => {
    const ReachableContext = createContext<string | null>(null);
    // const UnreachableContext = createContext<string | null>(null);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('确定要删除该节点吗？该操作不可逆!');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    function delFunction() {
        console.log("删除按钮");
        showModal();
    }
    return (
        // <Button onClick={delFunction} size='small' style={{maxHeight:'24.5px'}}>
        //     <svg t="1690866109838" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4124" width="16" height="16"><path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m183.466667 362.666666c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H349.866667a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334h345.6z" fill="#333333" p-id="4125"></path></svg>
        // </Button>
        <span style={{display:"inline"}} onClick={delFunction}>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4418" width="24.5" height="24.5"><path d="M512 42.667C771.2 42.667 981.333 252.8 981.333 512S771.2 981.333 512 981.333 42.667 771.2 42.667 512 252.8 42.667 512 42.667z m0 64c-223.85 0-405.333 181.482-405.333 405.333S288.149 917.333 512 917.333 917.333 735.851 917.333 512 735.851 106.667 512 106.667z m183.467 362.666c4.693 0 8.533 3.84 8.533 8.534V524.8a8.533 8.533 0 0 1-8.533 8.533h-345.6a8.533 8.533 0 0 1-8.534-8.533v-46.933c0-4.694 3.84-8.534 8.534-8.534h345.6z" fill="#333333" p-id="4419"></path></svg>
            <Modal
                    title="删除该节点"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    {
                        (
                            <div>
                                <ReachableContext.Consumer>{() => modalText}</ReachableContext.Consumer>
                            </div>
                        )
                    }
            </Modal>
        </span>
    )
}

export default DelBtn