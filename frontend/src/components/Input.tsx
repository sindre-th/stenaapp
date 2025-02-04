import React from "react";
import {FieldErrors, FieldPath, FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps<T extends FieldValues> extends React.ComponentPropsWithoutRef<"input"> {
    label: string;
    disabled?: boolean;
    register: UseFormRegister<T>;
    name: string;
    required?: boolean;
    errors?: FieldErrors;
    type?: "text" | "email" | "password" | "checkbox" | "number";
}

const Input = <T extends FieldValues>(props: InputProps<T>) => {
    const {
        label,
        disabled,
        placeholder,
        type,
        register,
        name,
        required,
        errors,
        className,
        ...rest
    } = props
    return (
        <>

            <label className="form-label" htmlFor={name}>
                {label}{required && <span style={{color: 'red'}}>*</span>}
            </label>
            <input id={name}
                   {...register(name as FieldPath<T>, {required: required && `${label} må fylles ut`})}
                   placeholder={placeholder}
                   disabled={disabled}
                   required={required}
                   className={`form-control ${className}`}
                   type={type || 'text'}
                   {...rest}/>
            {errors?.[name] && <div className="alert alert-danger p-0" role="alert">{`${errors[name].message}`}</div>}
        </>
    );
}

export default Input;