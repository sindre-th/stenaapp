import {Step} from "@interfaces/step.ts";
import Button from "./Button.tsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Sidebar = (/*steps: Step[]*/) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const navigate = useNavigate();

    const steps: Step[] = [
        {id: "Step1", name: "Step1", path: "step1"},
        {id: "Step2", name: "Step2", path: "step2"},
        {id: "Step3", name: "Step3", path: "step3"},
        {id: "Step4", name: "Step4", path: "step4"},
        {id: "Step5", name: "Step5", path: "step5"},
    ];

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                     index: number,
                     path: string) => {
        event.preventDefault();
        setActiveStep(index);
        navigate(path);
    }

    return (
        <aside>
            {steps.map((step, index) =>
                <div key={step.id}>
                    <div className="col">
                        <Button variant="custom-secondary"
                                size="md"
                                onClick={event => onClick(event, index, step.path)}
                                active={activeStep == index}
                                className="mb-2 p-2">
                            {step.name}
                        </Button>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;