import {Fragment, useRef, ReactNode} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import Button from "../Button";
import {classNames} from "../../utils";

interface ModalProps {
    open?: boolean;
    setOpen: (open: boolean) => void;
    onSubmit?(...args: unknown[]): unknown;
    children?: ReactNode[] | ReactNode;
    sizeClassName?: string;
    submitBtn: {
        title: string | ReactNode[] | ReactNode | JSX.Element;
    };
    cancelBtn: {
        title: string | ReactNode[] | ReactNode | JSX.Element;
    }
};

const Modal = ({open, setOpen, children, onSubmit, sizeClassName, submitBtn, cancelBtn}: ModalProps) => {
    const cancelButtonRef = useRef(null)
    const {title: submitBtnTitle, ...submitBtnProps} = submitBtn || {};
    const {title: cancelBtnTitle, ...cancelBtnProps} = cancelBtn || {};

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={classNames("relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full", sizeClassName ? sizeClassName : "sm:max-w-lg")}>
                                <form onSubmit={onSubmit}>
                                    {children}
                                    <div className="bg-gray-50 px-4 py-3 flex justify-end sm:px-6 sm:space-x-2">
                                        <Button
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                            {...cancelBtnProps}
                                        >
                                            {cancelBtnTitle || 'Cancel'}
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            {...submitBtnProps}
                                        >
                                            {submitBtnTitle || 'Save'}
                                        </Button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal;