import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import { Router } from "./routes";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
