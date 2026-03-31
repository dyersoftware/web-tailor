import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSceen from "./modules/auth/screen/login.screen";
import RegisterScreen from "./modules/auth/screen/register.screen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSceen />} />
        <Route path="/register" element={<RegisterScreen />} />

        {/* Nested route */}
        {/* <Route path="/users" element={<RegisterScreen />}>
          <Route path=":id" element={<LoginSceen />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
