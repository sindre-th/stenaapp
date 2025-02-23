import {testApi} from "@api/testApi.ts";
import Button from "@components/Button.tsx";
import Input from "@components/Input.tsx";
import {Test} from "@interfaces/test.ts";
import {useForm} from "react-hook-form";

interface FormProps {
    testObject: Test
}

const TestForm = (props: FormProps) => {
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