import Button from "@components/Button.tsx";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return <>
        <div>HOME</div>
        <Button variant="primary" onClick={() => navigate("work")}>Start</Button>
    </>
};

export default Home;