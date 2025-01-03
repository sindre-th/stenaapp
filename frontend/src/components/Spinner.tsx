interface SpinnerProps {
    variant?: "primary" | "secondary" | "success" | "info";
    size?: "lg" | "md" | "sm";
    type: "border" | "grow"
}

const Spinner = (props: SpinnerProps) => {
    const {type, variant, size} = props;

    const renderSize = () => {
        switch (size) {
            case "lg":
                return `spinner-${type}-lg`;
            case "md":
                return `spinner-${type}-md`;
            case "sm":
                return `spinner-${type}-sm`
            default:
                return "";
        }
    }

    const renderVariant = () => {
        if(variant) {
            return `text-${variant}`;
        }
        return "";
    }
    return (
        <div className={`spinner-${type} ${renderVariant()} ${renderSize()} `} role="status">
            <span className="visually-hidden">Laster...</span>
        </div>
    )
}

export default Spinner;