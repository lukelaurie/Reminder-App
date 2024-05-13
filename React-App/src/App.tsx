import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import ViewAppointments from "./components/pages/ViewAppointments";
import PrivateRoutes from "./utils/auth";

function App() {
  return (
    <BrowserRouter>
      {/* Switches to correct route based on the url */}
      <Routes>
        {/* Only allows access when user is vlaidated */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<ViewAppointments />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;