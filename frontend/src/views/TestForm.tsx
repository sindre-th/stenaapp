import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import {Test} from "../types/test.ts";
import {useForm} from "react-hook-form";
import {testApi} from "../api/testApi.ts";

interface formProps {
    testObject: Test
}

const TestForm = (props: formProps) => {
    const {testObject} = props;
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Test>({
        mode: "onSubmit",
        defaultValues: testObject
    })
    return (
        <form onSubmit={handleSubmit(testApi.update)}>
            <div className="mb-3">
                <Input name="name"
                       label="Navn"
                       className="mb-3"
                       register={register}
                       required
                       errors={errors}/>
                <Input name="age"
                       type="number"
                       label="Alder"
                       className="mb-3"
                       register={register}
                       required
                       errors={errors}/>
            </div>
            <Button variant="primary" type="submit">Send inn</Button>
        </form>
    );
}

export default TestForm;