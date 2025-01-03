import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    disabled?: boolean;
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    size?: "sm" | "md" | "lg";
    type?: "submit" | "button" | "reset";
    outline?: boolean;
    children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    const {disabled, className, variant, outline, size, type, children, ...rest} = props
    const _className = `btn btn-${outline ? "outline-" : ""}${variant ?? "primary"} btn-${size ?? "md"} ${className}`
    return (
        <button disabled={disabled}
                className={_className}
                type={type || "button"}
                {...rest}>
            {children}
        </button>
    );
}

export default Button;