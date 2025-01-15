
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from "./components/loginSignup/LoginSignup";
import Sidebar from "./components/dashboard/Sidebar";
import Dash from './components/dashboard/Dash/Dash';
import Files from './components/dashboard/Files/Files';
import Analytics from './components/dashboard/Analytics/Analytics';
import Customers from './components/dashboard/Customers/Customers';
import Header from './components/Header/Header';
import DashboardLayout from './components/dashboard/Dashboardlayout';
import Profile from './components/Profile/Profile';
import EditorWrapper from './components/EditorWrapper';
import MainAnalytics from './components/mainAnalytics/MainAnalytics';




function App() {
  return (
   
      <div className="App">
        <BrowserRouter>
       
          <Routes>
            {/* Route Login */}
            <Route path='/login' element={<LoginSignup />} />

            {/* Route Dashboard avec des routes imbriquées */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Route pour le tableau de bord principal */}
              <Route path='maindash' element={<Dash />} />
              {/* Route pour les fichiers */}
              <Route path='files' element={<Files />} />
              {/* Route pour les clients */}
              <Route path='customers' element={<Customers />} />
              {/* Route pour les analyses */}
              <Route path='analytics' element={<Analytics />} />
              {/* Route par défaut pour /dashboard */}
              <Route index element={<Dash />} />
            </Route>

            <Route path='/profile' element={<Profile />} />

            <Route
            path='/editor'
            element={
              <>
                <Header />
                <EditorWrapper />
              </>
            }
          />
            {/* Route par défaut (redirige vers /login) */}
            <Route path="/" element={<LoginSignup />} />

            <Route path='/mainAnalytics' element={<MainAnalytics />} />
          </Routes>
        </BrowserRouter>
        </div >
   
   
  );
}

export default App;
