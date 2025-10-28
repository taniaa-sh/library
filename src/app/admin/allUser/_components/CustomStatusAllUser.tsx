import React, { useEffect, useState } from 'react'
import CustomStatus from '../../components/CustomStatus'

interface PropsType {
    state: number,
    isColor?: boolean
}

const CustomStatusAllUser = (props: PropsType) => {
    const [text, setText] = useState("")
    const [color, setColor] = useState<"blue" | "red" | "yellow" | "green" | "gray" | "pink" | "lightGreen">("gray")

    useEffect(() => {
        switch (props.state) {
            case 1:
                setText("User")
                break;
            case 2:
                setText("Admin")
                break;
            default:
                break;
        }
    }, [props.state])

    useEffect(() => {
        switch (props.state) {
            case 1:
                setColor("pink")
                break;
            case 2:
                setColor("lightGreen")
                break;
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

export default CustomStatusAllUser