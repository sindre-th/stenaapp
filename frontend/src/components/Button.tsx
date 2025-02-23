import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    disabled?: boolean;
    variant?: "primary" | "custom-primary" | "secondary" | "custom-secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    size?: "sm" | "md" | "lg";
    type?: "submit" | "button" | "reset";
    outline?: boolean;
    active?: boolean;
    children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    const {disabled, className, variant, outline, size, type, children, active, ...rest} = props
    const _className = `btn 
                        btn-${outline ? "outline-" : ""}${variant ?? "primary"} 
                        btn-${size ?? "md"} 
                        ${active ? "active" : ""} 
                        ${className}`
    return (
        <button disabled={disabled}
                aria-pressed={active}
                className={_className}
                type={type ?? "button"}
                {...rest}>
            {children}
        </button>
    );
}

export default Button;