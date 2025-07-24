import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Loader2, BrainCircuit } from 'lucide-react';
import PageHeader from '@/components/navigation/page-header';
import CardWrapper from '@/components/card-wrapper';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import Localbase from 'localbase';

const TrainingScreen = () => {
	const db = new Localbase('precisionDB');
	const navigate = useNavigate();

	
	const SystemAuth = async (db) =>{
		const [user] = await db.collection('user').get();

		console.log(user);
		if(user.status != "success"){
			navigate('/login');
		}else{
			console.log("online auth here!");
		}
	}

	useEffect(() => {
		SystemAuth(db);
	}, []);

	
	const location = useLocation();
	const { data } = location.state;

	const BASE_URL : any = "http://localhost/precision-v2/ui-design/backend/";
	const [targetColumn] = useState(data.targetColumn.data || []);
	const [dates] = useState(data.import_data.data.data[data.datetime.id]);
	const [features] = useState(
		data.import_data.data.data.filter(
			(item, index) => index !== data.datetime.id && index !== data.targetColumn.id
		)
	);
	const dataset = [targetColumn, dates];

	const headers = dataset.map(col => col[0]);
	const rowCount = dataset[0].length - 1;
	const transformedData = Array.from({ length: rowCount }).map((_, i) => {
		const row = {};
		headers.forEach((header, colIdx) => {
			row[header] = dataset[colIdx][i + 1];
		});
		return row;
	});

	// State
	const [dotCount, setDotCount] = useState(0);
	const [isTraining, setIsTraining] = useState(false);
	const [doneTraining, setDone] = useState(false) 
	const [error, setError] = useState('');
	const [response, setResponse] = useState("empty");
	const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

	const [trainingPercentage, setTrainingPercentage] = useState(0);

	const animationStarted = useRef(false); 



	

	






	const updatePercentage = ( tdata, index)=>{
		let percent = Math.floor((index/tdata) * 100);
		if(percent > 95){
			setTrainingPercentage(98);
		}else{
			setTrainingPercentage(percent);
		}
	}

	const rowRefs = useRef<Array<HTMLTableRowElement | null>>([]);

	const [isLastIndex, setLastIndex] = useState(false);
	const scanDataset = ()=>{
		if (!animationStarted.current && transformedData.length > 0) {
			animationStarted.current = true; // ⚠️ prevent multiple loops`
			let currentIndex = 0;


			const interval = setInterval(() => {
				setHighlightedIndex(currentIndex);
				currentIndex++;
				
				updatePercentage(transformedData.length, currentIndex);

				const currentRow = rowRefs.current[currentIndex];
				// if (currentRow) {
				// 	currentRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
				// }
				if (currentIndex >= transformedData.length) {
					clearInterval(interval);
					setTimeout(() => setHighlightedIndex(null), 500); // Clear last highlight
					
				}
			}, 700); // Adjust speed
		}
	}

	const [showPredictButton, setShowPBtn] = useState(false);
	const [model_data, set_model_data] = useState(null);
	const trainModel = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		scanDataset();
		setIsTraining(true);
	
		try {
			const res = await axios.post(`${BASE_URL}train.php`, data);
			console.log(res.data);
		
			if(res.data.status == "success"){
				setIsTraining(false);
				setDone(true);

				set_model_data(res.data);

				console.log(res.data);
				setShowPBtn(true)
			}else{
				setIsTraining(true);
			}
		} catch (err) {
			setError('Training failed. Please try again.');
			setIsTraining(false);
		}
	};

	
	const goToPredictingScreen = ()=>{
		navigate("/predictions", { state : {
			data : model_data
		}});
	}


	return (
		<>
			<div className="md:flex md:justify-between">
				<div className=" w-full ">
					<PageHeader
						className=" w-full"
						items={[
							{ label: 'Home', href: '/' },
							{ label: 'Settings', href: '/project-settings' },
						]}
						heading="Model Training"
					/>
				</div>


				

				<div className="w-full p-4 md:flex md:justify-end">
					{isTraining ? (
						<button
							onClick={(e) => {}}
							className="flex items-center h-10 gap-2 cursor-pointeractive:scale-95 transition-all p-2 rounded-md bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 font-medium px-4"
						>
							<Loader2 className="animate-spin w-5 h-5 text-gray-400" />
						</button>
					) : (
						<div className=" flex flex-row gap-2">
							{showPredictButton ? (
								<button
									onClick={() => goToPredictingScreen()}
									className="flex items-center h-10 gap-2 cursor-pointer active:scale-95 transition-all p-2 rounded-md text-blue-700 font-medium px-4"
								>
									Start Predicting
								</button>
							) : (
								<button
									onClick={(e) => trainModel(e)}
									className="flex items-center h-10 gap-2 cursor-pointer hover:bg-blue-900 active:scale-95 transition-all p-2 rounded-md bg-blue-700 text-white font-medium px-4"
								>
									Start Training
								</button>
							)}
						</div>
					)}
		
				</div>

			</div>

			{isTraining ? (
				<div className="fixed w-full left-0 right-0 top-20 flex justify-center">
					<div className=" bg-white dark:bg-slate-950 shadow border border-gray-100 dark:border-slate-900 rounded-3xl p-2 px-6">
						<div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600">
							Training in progress -
							{` ` + trainingPercentage}%
						</div>
					</div>
				</div>
			) : (
				<div className=""></div>
			)}

			<div className="flex flex-col md:flex-row flex-wrap">
				{/* Left: Training status */}
				<div className="w-full md:w-1/3 p-2">
					<CardWrapper title="">
						<div className="flex flex-col items-center text-center space-y-4 p-6">
							<BrainCircuit className="w-10 h-10 text-blue-600 animate-pulse" />
							{isTraining ? (
								<>
									<div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
										{trainingPercentage == 98 ? (
											<div className="">Prepairing your Model for predictions</div>
										) : (
											<div className="">Model Training</div>
										)}
									</div>
									<div className="text-xs text-gray-600 dark:text-gray-400">
										This may take a few seconds depending on your dataset size.
									</div>
									<div className="flex items-center justify-center gap-2 mt-4">
										<Loader2 className="animate-spin w-5 h-5 text-blue-600" />
										<span className="text-sm text-gray-600 dark:text-gray-300">
											Training in progress...
										</span>
									</div>
								</>
							) : error ? (
								<div className="text-sm text-red-500">{error}</div>
							) : (
								<div className="">
									{doneTraining ? (
										<div className="text-sm text-green-600 font-medium">
											Model trained successfully!
										</div>
									) : (
										<div className=""></div>
									)}
								</div>
							)}
						</div>
					</CardWrapper>
				</div>

				{/* Right: Table */}
				<div className="w-full md:max-h-screen overflow-y-scroll rounded-md border md:w-2/3 p-2">
					<CardWrapper title="Dataset">
						{transformedData.length ? (
							<div className="overflow-x-auto">
								<table className="min-w-full table-auto text-left text-sm">
									<thead>
										<tr className="text-gray-700 dark:text-gray-300 border-b">
											{headers.map(header => (
												<th key={header} className="p-2">{header}</th>
											))}
										</tr>
									</thead>
									<tbody>
										{transformedData.map((row, idx) => (
											
											<tr
											ref={(el) => (rowRefs.current[idx] = el)}
											key={idx}
											
											
											className={`border-t transition-all duration-500 ease-in-out ${
												highlightedIndex === idx
												? 'bg-gradient-to-r from-green-100 via-blue-100 to-blue-50 dark:from-green-900 dark:via-blue-800 dark:to-blue-900 font-semibold dark:text-gray-200 text-gray-800 rounded-md'
												: 'text-gray-800 dark:text-gray-500'
											}`}
											>
											{headers.map(header => {
												const value = row[header];
												const isNumber = !isNaN(parseFloat(value)) && isFinite(value);
												const shouldRound = highlightedIndex === idx && isNumber;
												
										

												

												let randomNum = Math.floor(Math.random() * 0.20);
												return (
												<td key={header} className="p-2">
													{shouldRound ? parseFloat(value).toFixed(1) + randomNum : value}
												</td>
												);
											})}
											</tr>
										))}
									</tbody>

								</table>
							</div>
						) : (
							<p className="text-gray-500 text-sm">No dataset found.</p>
						)}
					</CardWrapper>
				</div>
			</div>
		</>
	);
};

export default TrainingScreen;
