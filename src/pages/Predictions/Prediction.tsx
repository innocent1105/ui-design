import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PageHeader from '@/components/navigation/page-header';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { parse, format,isValid, set } from 'date-fns';
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
    const [interval, setInterval] = useState(3);


    const [user_id, setUserId] = useState(null);
	const SystemAuth = async () => {
		const [user] = await db.collection('user').get();
        setUserId(user.user_id);
        console.log(user_id);
		if (user?.status !== 'success') {
			navigate('/login');
		}
	};

	useEffect(() => {
		SystemAuth();
	}, []);



    const [hover, setHover] = useState(false);

    const [predicting, setPredicting] = useState(false);
    const [predicted, setPredicted] = useState(false);
    const predict = async () => {
        setPredicting(true);
        let payload = {
            "interval" : interval,
            "model_id" : model_id, 
            "model_name": `${model_name}.pkl`,
            "user_id": user_id
        };
    
        console.log(payload);
        try {
            console.log("Sending prediction with:");
            console.log("Model Name:", payload.model_name);
            console.log("User ID:", payload.user_id);
    
            const res = await axios.post(`${BASE_URL}predictions.php`, payload);
            console.log(res.data);
            setPredicting(false);
            setPredictions(res.data.forecast)
        } catch (e) {
            console.error("Failed to predict, an error occurred:", e.message);
            setPredicting(false);
        }
    };

    const [saving, setSaving] = useState(false);
    const savePredictions = async () => {
        setSaving(true);
        let data = {
            user_id : user_id,
            model_id : model_id,
            model_name : model_name,
            interval : interval,
            predictions : JSON.stringify(predictions)
        }
        try{
            const res = await axios.post(`${BASE_URL}save_predictions.php`, data);
			console.log(res.data);
            setSaving(false);
            setPredicted(true);
        }catch(error){
            console.log("error : failed to save predictions", error);
            setSaving(false);
        }
    }


    
	return (
		<div className="space-y-6">
            	
                <div className="md:flex md:justify-between">
				    <div className=" md:w-1/2 w-auto">
                        <PageHeader
                            heading="Predictions"
                            items={[
                                { label: 'Home', href: '/' },
                                { label: 'Predictions', href: '/project-settings' },
                            ]}
                        />
                    </div>
                    <div className="w-1/2 p-2 pt-4">
                        <div className=" flex flex-row justify-end gap-2">
                            
                            <div
                                onClick={() => {}}
                                className=" text-gray-500 dark:text-gray-300 text-center font-medium p-2 cursor-pointer rounded-full transition-all active:scale-95 "
                            >
                                Export
                            </div>
                   
                            {saving ? (
                                <div className="w-16 border border-gray-200 dark:border-gray-700 rounded-full flex justify-center items-center">
                                    <div className="animate-spin h-4 w-4 border-2 rounded-full border-blue-700 border-r-gray-200 dark:border-r-gray-800"></div>
                                </div>
                                ) : (
                                <div
                                    onClick={() => savePredictions()}
                                    className=" w-16 font-semibold text-center p-2 cursor-pointer rounded-full transition-all active:scale-95"
                                >
                                    <span className="bg-gradient-to-r from-purple-500 to-blue-700 bg-clip-text text-transparent">
                                        Save
                                    </span>
                                </div>
                            )}
                           
                        </div>
                    </div>

                </div>
			

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
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                    />
                    </div>
                    {predicting ? (
                        <div className="w-full bg-gray-200 dark:bg-gray-800 dark:text-gray-500 text-gray-400 font-semibold text-center p-2 rounded-full flex flex-row justify-center gap-2">
                            <div className="flex justify-center items-center">
                                <div className="animate-spin h-4 w-4 border-2 rounded-full border-gray-400 border-r-gray-200"></div>
                            </div>

                            <span>Predicting...</span>
                        </div>
                    ) : (
                        <div
                            style={{ backgroundColor: hover ? '#1f5bb4' : '#1034A6' }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            onClick={() => predict()}
                            className="w-full text-white font-semibold text-center 
                                        p-2 shadow cursor-pointer rounded-full transition-all
                                        active:scale-95"
                        >
                            Predict
                        </div>
                    )}
                  
                </div>
                </div>

                {/* AI Summary */}
                <div className="mt-2 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800 p-5 shadow-sm space-y-4">
                
                </div>


            </div>

            {/* Forecast Results Table */}
            <div className="col-span-2 bg-white dark:bg-gray-900 p-0 rounded-2xl shadow max-h-[500px] flex flex-col">
                <div className="p-4 block md:flex flex-row gap-2 border-b dark:border-gray-700">
                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Forecast Results</h2>
                    </div>
                    {predicted ? (
                        <div className=" md:w-10/12 flex flex-row justify-between gap-2">
                            <div className="border px-4 rounded-full bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400 font-semibold">
                                saved
                            </div>
                            <div className=" px-4 rounded-full bg-blue-700 text-white font-semibold cursor-pointer transition-all active:scale-95">
                                Open dashboard
                            </div>
                        </div>
                    ):(
                        <div className=""></div>
                    )}
                    
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
                    {predictions.map((item, index) => {
                        const value = item.yhat;
                        const lowerBound = value - value * 0.10;
                        const upperBound = value + value * 0.10;
                        
                        let formattedDate = item.ds;

                        if (item.ds) {
                            const [day, month, year] = item.ds.split('/');
                            const jsDate = new Date(`${year}-${month}-${day}`);
                            formattedDate = !isNaN(jsDate.getTime())
                                ? jsDate.toLocaleDateString('en-GB', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                : 'Invalid Date';
                        }
                                

                        return (
                            <TableRow key={index}>
                                <TableCell className="dark:text-gray-200">{formattedDate}</TableCell>
                                <TableCell className="text-blue-700 dark:text-blue-400">{value.toFixed(2)}</TableCell>
                                <TableCell className="dark:text-gray-400">{lowerBound.toFixed(2)}</TableCell>
                                <TableCell className="dark:text-gray-400">{upperBound.toFixed(2)}</TableCell>
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
