import {LoginProvider} from "@/common/contexts/Login";
import "@/common/styles/fonts.sass";
import './App.sass';
import Home from "@/pages/Home";

const App = () => (
    <LoginProvider>
        <Home/>
    </LoginProvider>
)

export default App;