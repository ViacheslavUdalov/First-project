import React from "react";
type InputProps = {
    label: string
    placeholder: string
    register: any
    required: boolean
};
export const Input = ({label, register, required, placeholder }: InputProps) => (
    <>
        <label>{label} : gogogo</label>
        <input placeholder={placeholder} {...register(label, { required })}  />
    </>
);
type TextProps = {
    label: string
    placeholder: string | null
    register: any
    required: boolean
};
export const TextArea = ({ label, placeholder, register, required,}: TextProps) => (
    <>
        <textarea placeholder={placeholder} {...register(label, { required })} />
    </>
);