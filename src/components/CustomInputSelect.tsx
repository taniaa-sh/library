'use client';

import { ChangeEvent } from "react";
import { motion } from "framer-motion";

type PropsType = {
    label?: string;
    placeholder?: string;
    onChange: (value: string | number, option?: Array<string | number>) => void;
    option?: Array<string | number>;
    name: string;
    value: string | number;
    containerClassName?: string;
    errors: Array<string>;
    Values: Array<string>;
    width?: string;
    disabled?: boolean;
    shakeTrigger?: number;
};

const CustomInputSelect: React.FC<PropsType> = ({
    width,
    label,
    placeholder = "Select an option",
    onChange,
    option,
    name,
    value,
    containerClassName,
    errors,
    Values,
    shakeTrigger = 0,
    disabled = false,
}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        option ? onChange(selectedValue, option) : onChange(selectedValue);
    };

    return (
        <div
            className={`flex flex-col ${containerClassName || ""}`}
            style={{ width: width ? `${width}px` : "100%" }}
        >
            {label && (
                <label
                    htmlFor={`input-${name}`}
                    className="mb-1 text-xs sm:text-sm font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>
            )}

            <motion.select
                id={`input-${name}`}
                name={name}
                value={value || ""} 
                onChange={onChangeHandler}
                key={shakeTrigger}
                animate={errors.length > 0 ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                disabled={disabled}
                className={`
                w-full rounded-lg border !p-3
                text-sm sm:text-base font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-500
                bg-light-600 dark:bg-dark-400
                ${!value ? "text-gray-400" : "text-gray-700 dark:text-white"}
            `}
            >
                {/* Placeholder */}
                <option value="" className="text-gray-400">
                    {placeholder}
                </option>

                {/* Options */}
                {Values.map((item, index) => (
                    <option
                        key={index}
                        value={item}
                        className="text-gray-800 dark:text-white font-semibold"
                    >
                        {item}
                    </option>
                ))}
            </motion.select>

        </div>
    );
};

export default CustomInputSelect;
