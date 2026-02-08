import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ToastType } from '@/utils/type'
import imagesAddresses from '@/utils/imageAddresses'


const Toast = (props: ToastType) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const isAdmin = props.isAdmin
    const containerClass =
        props.color === 'success'
            ? isAdmin
                ? 'border-green dark:border-green bg-green-100 dark:bg-[#4C7B62]'
                : 'border-green dark:border-green-500 bg-green-900 dark:bg-green-100'
            : isAdmin
                ? '!border-red-400 dark:!border-red !bg-red-100 dark:!bg-[#7c1f1f]'
                : '!border-red-400 dark:!border-red !bg-[#7c1f1f] dark:!bg-red-100'
    const textClass =
        props.color === 'success'
            ? isAdmin
                ? 'text-green-900 dark:text-green-600'
                : 'dark:text-green-600 text-white'
            : isAdmin
                ? 'text-red-400 dark:text-red-600'
                : 'dark:text-red-600 text-red-400'


    useEffect(() => {
        setIsVisible(true)

        if (!isHover) {
            const timer = setTimeout(() => {
                handleClose()
            }, props.timeWait || 6000)

            return () => clearTimeout(timer)
        }
    }, [props.onClose, isHover])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(props.onClose, 1000)
    }

    return (
        <div
            className={`
            fixed top-8 right-1 desktop:right-12 flex items-center gap-5
            ${containerClass}
            border border-solid rounded-2xl py-3 desktop:py-4 px-4 desktop:px-5
            z-[1005] transition-all duration-1000
            ${isVisible ? '' : 'translate-x-[999px]'}
        `}
            onMouseEnter={() => props.pauseOnHover && setIsHover(true)}
            onMouseLeave={() => props.pauseOnHover && setIsHover(false)}
        >
            <h4
                className={`w-[244px] tablet:w-[280px] ${textClass} text-sm desktop:text-base leading-8 font-medium`}
            >
                {props.text}
            </h4>

            <Image
                onClick={handleClose}
                className='cursor-pointer'
                src={
                    props.color === 'success'
                        ? imagesAddresses.icons.closeGreen
                        : imagesAddresses.icons.close
                }
                alt='close'
                width={24}
                height={24}
            />
        </div>

    )
}

export default Toast