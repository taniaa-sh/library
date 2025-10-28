import Image from "next/image";

type PropsType = {
    text: string;
    size: "medium" | "small";
    color: "blue" | "red" | "yellow" | "lightYellow" | "lightGreen" | "green" | "gray" | "purple" | "orange" | "darkBlue" | "pink";
    width?: string;
    containerClassName?: string;
    icon?: string
    iconClass?: string
    iconClick?: () => void
};

const CustomStatus: React.FC<PropsType> = ({
    text,
    size,
    color,
    width,
    containerClassName,
    icon,
    iconClass,
    iconClick
}) => {
    let newClass1 = "";
    let newClass2 = "";
    if (color === "blue") {
        newClass1 = "text-[#026AA2] bg-[#F0F9FF]";
        newClass2 = "bg-[#026AA2]";
    } else if (color === "red") {
        newClass1 = "text-[#C01048] bg-[#FFF1F3]";
        newClass2 = "bg-[#C01048]";
    } else if (color === "yellow") {
        newClass1 = "text-warning600 bg-warning50 dark:bg-[#43320f] dark:text-[#dc6803]";
        newClass2 = "bg-warning600 dark:bg-[#dc6803]";
    } else if (color === "green") {
        newClass1 = "text-success600 bg-success50 dark:bg-[#0e312a] dark:text-[#32d583]";
        newClass2 = "bg-success600 dark:bg-[#32d583]";
    } else if (color === "gray") {
        newClass1 = "text-gray600 bg-gray50 dark:bg-[#1d2939] dark:text-[#eaecf0]";
        newClass2 = "bg-gray600 dark:bg-[#eaecf0]";
    } else if (color === "purple") {
        newClass1 = "text-[#6941C6] bg-[#F9F5FF]";
        newClass2 = "bg-[#6941C6]";
    } else if (color === "orange") {
        newClass1 = "text-orange600 bg-orange50 dark:bg-[#fff4eb] dark:text-[#dc5d03]";
        newClass2 = "bg-orange600 dark:bg-[#dc5d03]";
    } else if (color === "lightYellow") {
        newClass1 = "text-lightYellow600 bg-lightYellow50 dark:bg-[#43320f] dark:text-[#fec84b]";
        newClass2 = "bg-lightYellow600 dark:bg-[#fec84b]";
    } else if (color === "darkBlue") {
        newClass1 = "text-blue600 bg-blue50";
        newClass2 = "bg-blue600";
    } else if (color === "pink") {
        newClass1 = "!text-[#C11574] !bg-[#FDF2FA]";
        newClass2 = "bg-[#C11574]";
    } else if (color === "lightGreen") {
        newClass1 = "!text-[#027A48] !bg-[#ECFDF3]";
        newClass2 = "bg-[#027A48]";
    }
    return (
        <div
            className={`whitespace-nowrap gap-[6px] flex items-start rounded-[16px] py-1 ${size === "medium" ? "px-4" : size === "small" ? "px-3" : ""
                } ${newClass1} ${containerClassName !== undefined ? containerClassName : ""}`}
            style={{ width: width !== undefined ? width : "" }}
        >
            {
                icon ? (
                    <Image
                        src={icon}
                        alt="icon"
                        width={12}
                        height={12}
                        className={`${iconClass} self-center`}
                        onClick={() => iconClick && iconClick()}
                    />
                ) : (
                    <div className={`w-[6px] h-[6px] mt-2 rounded ${newClass2}`} />
                )
            }
            <p className="whitespace-nowrap leading-6 text-xs font-medium">{text}</p>
        </div>
    );
};

export default CustomStatus;
