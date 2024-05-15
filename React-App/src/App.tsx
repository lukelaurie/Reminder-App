import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Pages/Login";
import CreateAccount from "./components/Pages/CreateAccount";
import ViewAppointments from "./components/Pages/ViewAppointments";
import Help from "./components/Pages/Help";
import Home from "./components/Pages/Home";
import PrivateRoutes from "./utils/Auth";

function App() {
  return (
    <BrowserRouter>
      {/* Switches to correct route based on the url */}
      <Routes>
        {/* Only allows access when user is vlaidated */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<ViewAppointments />} />
          <Route path="/help" element={<Help />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;