import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashborad/Dashboard';
import AppLayout from './layout/AppLayout';

function App() {
	return (
		<Router>
			<Routes>
				{/* Dashboard Layout */}
				<Route element={<AppLayout />}>
					<Route index path="/" element={<Dashboard />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
