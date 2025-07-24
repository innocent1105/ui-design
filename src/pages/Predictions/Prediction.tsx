import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PageHeader from '@/components/navigation/page-header';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Localbase from 'localbase';
import axios from 'axios';

const BASE_URL : any = "http://localhost/precision-v2/ui-design/backend/";


const PredictionScreen = () => {
	const db = new Localbase('precisionDB');
	const navigate = useNavigate();



    const location = useLocation();
	const { data } = location.state;

    const model_name = data.model_name;
    const model_id = data.model_id;
    const accuracy = data.accuracy;


    const [predictions, setPredictions] = useState([]);



    const [user_id, setUserId] = useState(null);
	const SystemAuth = async () => {
		const [user] = await db.collection('user').get();
        setUserId(user.user_id);
		if (user?.status !== 'success') {
			navigate('/login');
		}
	};

	useEffect(() => {
		SystemAuth();
	}, []);

    const [hover, setHover] = useState(false);
    const [forecastInterval, setforecastInterval] = useState(3);

    const predict = async () => {
        let payload = {
            "model_name": "timeseries_6889.pkl",
            "user_id": "7"
        };
    
        console.log(payload);
        try {
            console.log("Sending prediction with:");
            console.log("Model Name:", payload.model_name);
            console.log("User ID:", payload.user_id);
    
            const res = await axios.post(`${BASE_URL}predictions.php`, payload);
            console.log(res.data);
    
        } catch (e) {
            console.error("Failed to predict, an error occurred:", e.message);
        }
    };
    
	return (
		<div className="space-y-6">
			<PageHeader
				heading="Predictions"
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Settings', href: '/project-settings' },
				]}
			/>

            <div className="grid md:grid-cols-3 gap-4">
            {/* Forecast Controls */}
            <div className="md:col-span-1 col-span-2">
                <div className="border bg-white dark:bg-gray-900 dark:border-gray-800 p-4 rounded-2xl shadow self-start">
                <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Forecast Controls</h2>
                <div className="space-y-3">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Forecast Interval (Days)
                    </label>

                    <Input
                        type="number"
                        placeholder="e.g. 30"
                        value={forecastInterval}
                        onChange={(e) => setforecastInterval(e.target.value)}
                    />
                    </div>

                    <div
                    style={{ backgroundColor: hover ? '#1f5bb4' : '#2C73D2' }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => predict()}
                    className="w-full text-white font-semibold text-center 
                                p-2 shadow cursor-pointer rounded-full transition-all
                                active:scale-95"
                    >
                    Predict
                    </div>
                </div>
                </div>

                {/* AI Summary */}
                <div className="mt-2 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800 p-5 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">AI Summary</h2>

                <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Dataset Overview</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                    Historical sales data from Jan to July 2025 shows a gradual upward trend, with consistent spikes during weekends.
                    Sales are mostly stable, but seasonal effects are visible.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Forecast Insights</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                    Sales are projected to rise by 8–12% in the next 30 days. The forecast suggests steady growth with high confidence,
                    especially around promotional periods.
                    </p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                    ⚠️ A slight dip is expected mid-August. Consider adjusting inventory or promotions accordingly.
                    </p>
                </div>
                </div>
            </div>

            {/* Forecast Results Table */}
            <div className="col-span-2 bg-white dark:bg-gray-900 p-0 rounded-2xl shadow max-h-[500px] flex flex-col">
                <div className="p-4 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Forecast Results</h2>
                </div>

                <div className="overflow-auto px-4 py-2">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="dark:text-gray-300">Date</TableHead>
                        <TableHead className="dark:text-gray-300">Forecast</TableHead>
                        <TableHead className="dark:text-gray-300">Lower Bound</TableHead>
                        <TableHead className="dark:text-gray-300">Upper Bound</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {predictions?.forecasts?.map((item, index) => {
                        const value = item.yhat;
                        const lowerBound = value - value * 0.10;
                        const upperBound = value + value * 0.10;
                        const formattedDate = new Date(item.ds).toLocaleDateString();

                        return (
                            <TableRow key={index}>
                                <TableCell className="dark:text-gray-200">{formattedDate}</TableCell>
                                <TableCell className="dark:text-gray-200">{value}</TableCell>
                                <TableCell className="dark:text-gray-200">{lowerBound.toFixed(2)}</TableCell>
                                <TableCell className="dark:text-gray-200">{upperBound.toFixed(2)}</TableCell>
                            </TableRow>
                        );
                    })}

                    </TableBody>
                </Table>
                </div>
            </div>
            </div>

		</div>
	);
};

export default PredictionScreen;
