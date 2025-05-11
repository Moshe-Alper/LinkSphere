import { Topbar } from "../cmps/common/Topbar/Topbar";
import Home from "../pages/Home";


export function HomeLayout() {
    return (
        <div>
            <Topbar />
            <Home />
        </div>
    )
}