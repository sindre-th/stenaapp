import {useEffect, useState} from "react";
import {testApi} from "./api/testApi.ts";
import "./App.css"
import Header from "./components/Header.tsx";
import PdfViewer from "./components/PdfViewer.tsx";
import Spinner from "./components/Spinner.tsx";

const App = () => {
    // const [testObject, setTestObject] = useState<Test>();
    const [pdfUrl, setPdfUrl] = useState<string>();
    useEffect(() => {
        testApi.get()
            .then(URL.createObjectURL)
            .then(setPdfUrl);
    }, []);
    return (
        <>
            <Header/>
            {/*{testObject && <TestForm testObject={testObject}/>}*/}
            {!pdfUrl && <Spinner type="border" variant="primary" size="lg"/>}
            {pdfUrl && <PdfViewer src={pdfUrl} width="100%" height="100vh"/>}
        </>
    )
}

export default App;
