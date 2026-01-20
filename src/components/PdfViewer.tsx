import { Worker, Viewer } from '@react-pdf-viewer/core';

interface PropsType {
    fileUrl: string | undefined,
    className?: string
}

const PdfViewer = (props: PropsType) => {
    return (
        <div className={`rounded-lg ${props.className}`}>
            <Worker workerUrl={"/script/pdf.worker.min.js"}>
                {
                    props.fileUrl != undefined && (
                        <Viewer fileUrl={props.fileUrl} />
                    )
                }
            </Worker>
        </div>
    );
};

export default PdfViewer;