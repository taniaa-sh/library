import React, { useEffect, useState } from 'react'
import CustomStatus from '../../components/CustomStatus'

interface PropsType {
    state: number,
    isColor?: boolean
}

const CustomStatusBorrowReq = (props: PropsType) => {
    const [text, setText] = useState("")
    const [color, setColor] = useState<"blue" | "red" | "yellow" | "green" | "gray" | "pink" | "lightGreen" | "purple">("gray")

    useEffect(() => {
        switch (props.state) {
            case 1:
                setText("Borrowed")
                break;
            case 2:
                setText("Late Return")
                break;
            case 3:
                setText("Returned")
            default:
                break;
        }
    }, [props.state])

    useEffect(() => {
        switch (props.state) {
            case 1:
                setColor("purple")
                break;
            case 2:
                setColor("red")
                break;
            case 3:
                setColor("blue")
            default:
                break;
        }
    }, [props.state])

    return (
        <>
            {
                props?.isColor ? (
                    <CustomStatus
                        text={text}
                        color={color}
                        size='medium'
                        width=''
                        containerClassName='w-fit'
                    />
                ) : (
                    <p>
                        {text}
                    </p>
                )
            }
        </>
    )
}

export default CustomStatusBorrowReq