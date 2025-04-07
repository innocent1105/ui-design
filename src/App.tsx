import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashborad/Dashboard';
import AppLayout from './layout/AppLayout';
import FormView from './pages/FormView/FormView';
import Typography from './pages/Typography/Typography';
import Buttons from './pages/Buttons/Buttons';
import Tables from './pages/Tables/Tables';

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<AppLayout />}>
					<Route index path="/" element={<Dashboard />} />
					<Route path="/form-view" element={<FormView />} />
					<Route path="/typography" element={<Typography />} />
					<Route path="/buttons" element={<Buttons />} />
					<Route path="/tables" element={<Tables />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
