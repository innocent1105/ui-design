import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard/Dashboard';
import AppLayout from './layout/AppLayout';
import FormView from './pages/FormView/FormView';
import Typography from './pages/Typography/Typography';
import Buttons from './pages/Buttons/Buttons';
import Tables from './pages/Tables/Tables';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import RecoverPassword from './pages/RecoverPassword';
import FAQPage from './pages/Faq/Faq';
import Profile from './pages/Profile/Profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/form-view" element={<FormView />} />
          <Route path="/typography" element={<Typography />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
