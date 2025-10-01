import { useEffect, useState } from 'react';
import PageHeader from '@/components/navigation/page-header';
import CardWrapper from '@/components/card-wrapper';
import { ArrowRight,Loader2, CalendarDays, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isNumberObject } from 'util/types';
import { isInt } from '@fullcalendar/core/internal';

import { useLocation } from 'react-router-dom';

import axios from 'axios';
import Localbase from 'localbase';

const ForecastTargetScreen = () => {
	const db = new Localbase('precisionDB');
	const navigate = useNavigate();

	const [user_data, setUserData] = useState({});
	
	const SystemAuth = async (db) =>{
		const [user] = await db.collection('user').get();
		setUserData(user);
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



	const [previewData, setPreviewData] = useState<any[]>([]);
	const [columnHeaders, setColumnHeaders] = useState<{ id: number; name: string }[]>([]);
	const [targetColumnId, setTargetColumnId] = useState('');
	const [dateColumnId, setDateColumnId] = useState('');
	const [dateHeaderIds, setDateHeaderIds] = useState<number[]>([]);

	const [process_data, setProcessedData] = useState([]);

	const [isProcessing, setIsProcessing] = useState(false);
	const [ columnError, setColumnError] = useState("");

    const saveData = () => {
        console.log("target cols",targetColumnId)
    }

	useEffect(() => {
        const fetchData = async () => {
            const import_id = localStorage.getItem('import_id');

            const projectData = JSON.parse(localStorage.getItem('projectData'));

            const allData = await db.collection('excel_data').get();
            let columns = await db.collection('process_data').get();
				columns = columns.find(entry => entry.import_id == import_id);
			setProcessedData(columns);

            const targetImport = allData.find(entry => entry.import_id == import_id);
    
            if (targetImport && targetImport.data.length > 0) {
                const rows = targetImport.data;
                setPreviewData(rows.slice(0, 5));
    
                const keys = Object.keys(rows[0]);
                const headers = keys.map((name, index) => ({ id: index, name }));
    
                setColumnHeaders(headers);
                setDateHeaderIds(headers.map(h => h.id));
            } else {
                console.warn("No data found with import_id.");
            }
        };
        fetchData();
    }, []);
    
	const processTargetCol = (tdata) => {
		let newCol = [];
		for (let index = 0; index < tdata.length; index++) {
			let num = tdata[index];
			
			if(true){
				if(num == 0 ){
					if(tdata.length > 1){
						num = (tdata[0] + tdata[1]) / 2; 
					}else{
						num = ((tdata[0] + tdata[0]) / 2.5) + 10; 
					}
				}
				newCol.push(num);
			}else{
				// if(num == 0 ){
				// 	if(tdata.length > 1){
				// 		num = (tdata[0] + tdata[1]) / 2; 
				// 	}else{
				// 		num = ((tdata[0] + tdata[0]) / 2.5) + 10; 
				// 	}
				// }
				newCol.push(0);
			}

		}

		// console.log(" td ", newCol);
	}

	const handleContinue = () => {
		setColumnError("");

        if (targetColumnId === '' || dateColumnId === '') {
            
			setColumnError("Error : Select the target column and the date/time column.");
			setIsProcessing(false);
            return;
        }
    
        const targetIndex = Number(targetColumnId);
        const dateIndex = Number(dateColumnId);
    
        const target = columnHeaders[targetIndex];
        const datetime = columnHeaders[dateIndex];
    
		const project_data = localStorage.getItem("projectData");
		let targetDataset = process_data.data[targetColumnId];


		const config = {
            target: {
                id: target.id,
                name: target.name,
            },
			targetColumn: {
				data : targetDataset
			},
            datetime: {
                id: datetime.id,
                name: datetime.name,
            },
			import_data : {
				data : process_data
			},
			project_data : {
				data : project_data
			},
			user_data : {
				data : user_data
			}
        };


		processTargetCol(targetDataset);

		navigate("/training", {state : {
			data : config
		}})
    };
    

	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Settings', href: '/project-settings' },
				]}
				heading="Select Forecast Target"
			/>

			{columnError.length > 0 ? (
				<div className=" rounded-xl mt-2 dark:bg-gray-800 dark:text-red-600 bg-red-100 text-red-600 font-semibold p-4">
					{columnError}
				</div>
			) : (
				<div>	
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<CardWrapper title="What do you want to forecast?">
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
							Select numeric column
						</label>
						<div className="relative">
							<select
								value={targetColumnId}
								onChange={(e) => setTargetColumnId(e.target.value)}
								className="block w-full cursor-pointer px-3 py-2 pr-10 border rounded-md text-sm shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:border-primary focus:ring-primary"
							>
								<option value="">-- Choose column --</option>
								{columnHeaders.map((col) => (
									<option key={col.id} value={col.id}>
										{col.name}
									</option>
								))}
							</select>
							<LineChart className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
						</div>
					</div>
				</CardWrapper>

				<CardWrapper title="Which column contains the dates?">
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
							Select date column
						</label>
						<div className="relative">
							<select
								value={dateColumnId}
								onChange={(e) => setDateColumnId(e.target.value)}
								className="block w-full cursor-pointer px-3 py-2 pr-10 border rounded-md text-sm shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:border-primary focus:ring-primary"
							>
								<option value="">-- Choose column --</option>
								{columnHeaders
									.filter(col => dateHeaderIds.includes(col.id))
									.map(col => (
										<option key={col.id} value={col.id}>
											{col.name}
										</option>
									))}
							</select>
							<CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
						</div>
					</div>
				</CardWrapper>
			</div>
			
			
			<div className="mt-6">
				<CardWrapper title="Sample Data Preview">
					{previewData.length > 0 ? (
						<div className="w-full overflow-x-auto rounded-md border mt-2">
							<table className="w-full min-w-[900px] text-sm text-left text-gray-700 dark:text-gray-300">
								<thead className="bg-gray-50 dark:bg-gray-800 text-xs font-semibold uppercase tracking-wider">
									<tr>
										{columnHeaders.map((col) => (
											<th key={col.id} className="px-4 py-2 whitespace-nowrap">
												{col.name}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="bg-white dark:bg-gray-900">
									{previewData.map((row, rowIndex) => (
										<tr key={rowIndex} className="border-t border-gray-200 dark:border-gray-700">
											{columnHeaders.map((col) => (
												<td key={col.id} className="px-4 py-2 whitespace-nowrap max-w-[200px] truncate">
													{String(row[col.name])}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p className="text-sm text-muted-foreground mt-2">No data found.</p>
					)}
				</CardWrapper>
			</div>

			<div className="flex justify-end mt-6">
				{isProcessing ? (
					<button
						onClick={() => {}}
						className="flex items-center gap-2 cursor-default p-2 rounded-md bg-gray-200 text-gray-700 font-medium px-4"
					>
						<Loader2 className="animate-spin w-5 h-5 text-gray-600" />
						Processing
					</button>
				) : (
					<button
						onClick={handleContinue}
						className="flex items-center gap-2 cursor-pointer hover:bg-blue-800 active:scale-95 transition-all transition-transform p-2 rounded-md bg-blue-700 text-white font-medium px-4"
					>

						Proceed
						<ArrowRight className="w-4 h-4" />
					</button>
				)}
				

				
			</div>
		</>
	);
};

export default ForecastTargetScreen;
