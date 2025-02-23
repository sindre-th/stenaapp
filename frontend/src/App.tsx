import "./App.css"
import Home from "@pages/Home.tsx";
import Layout from "@pages/Layout.tsx";
import NoPage from "@pages/NoPage.tsx";
import Step1 from "@pages/work/steps/Step1.tsx";
import Step2 from "@pages/work/steps/Step2.tsx";
import Work from "@pages/work/Work.tsx";
import {Route, Routes} from "react-router-dom";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="work" element={<Work/>}>
                    <Route index element={<Step1/>}/>
                    <Route path="step1" element={<Step1/>}/>
                    <Route path="step2" element={<Step2/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
                <Route path="*" element={<NoPage/>}/>
            </Route>
        </Routes>
    )
}

export default App;
