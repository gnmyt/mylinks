import {LoginProvider} from "@/common/contexts/Login";
import "@/common/styles/fonts.sass";
import './App.sass';
import {LinkProvider} from "@/common/contexts/Link";
import Home from "@/pages/Home";
import {ModuleProvider} from "@/common/contexts/Module";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {UserProvider} from "@/common/contexts/User";

library.add(fas);

const App = () => (
    <LoginProvider>
        <UserProvider>
            <ModuleProvider>
                <LinkProvider>
                    <Home/>
                </LinkProvider>
            </ModuleProvider>
        </UserProvider>
    </LoginProvider>
)

export default App;