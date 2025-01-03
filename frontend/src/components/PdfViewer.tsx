interface PdfViewerProps {
    src: string;
    width: string;
    height: string;
}

const PdfViewer = (props: PdfViewerProps) => {
    const {src, width, height} = props;
    return (
        <iframe src={src} width={width} height={height}></iframe>
    )
}

export default PdfViewer;