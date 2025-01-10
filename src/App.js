
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from "./components/loginSignup/LoginSignup";
import Sidebar from "./components/dashboard/Sidebar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* Route Login */}
        <Route path='LoginSignup' element= {<LoginSignup /> } />
        {/* Route Sidebar avec le style flouté */}
        <Route
          path="/sidebar"
          element={
            <div className="AppGlass">
              <Sidebar />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
