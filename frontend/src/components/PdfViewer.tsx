interface PdfViewerProps {
    src: string;
    width?: string;
    height?: string;
}

const PdfViewer = (props: PdfViewerProps) => {
    const {src, width, height} = props;
    return (
        <iframe title="pdf"
                src={`${src}#page=1&zoom=100`}
                width={width ?? "100%"}
                height={height ?? "100%"}/>
    )
}

export default PdfViewer;