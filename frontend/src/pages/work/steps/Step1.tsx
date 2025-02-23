import {testApi} from "@api/testApi.ts";
import PdfViewer from "@components/PdfViewer.tsx";
import Spinner from "@components/Spinner.tsx";
import {useEffect, useState} from "react";

const Step1 = () => {
    // const [testObject, setTestObject] = useState<Test>();
    const [pdfUrl, setPdfUrl] = useState<string>();
    useEffect(() => {
        testApi.get()
            .then(URL.createObjectURL)
            .then(setPdfUrl);
    }, []);
    return (
        <>
            {/*{testObject && <TestForm testObject={testObject}/>}*/}
            {!pdfUrl && <Spinner type="border" variant="secondary" className="mt-5" size="lg"/>}
            {pdfUrl && <PdfViewer src={pdfUrl}/>}
        </>
    )
};

export default Step1;