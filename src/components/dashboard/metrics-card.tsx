// import { statsData } from '@/constants/ChartConstants';
import CardWrapper from '../card-wrapper';
import { Button } from '../ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Localbase from 'localbase';
import { Activity, DollarSign, ShoppingCart, Users, BarChart2, TrendingUp, LineChart, Briefcase  } from 'lucide-react';
import dayjs from "dayjs";


const MetricsCard = () => {
	const BASE_URL : any = "http://localhost/precision-v2/UI-DESIGN/backend/";
	const user_id = localStorage.getItem("user_id");
	const [timeseries, setTimeseries] = useState([]);

	// const statsData: IStatCard[] = [
	// 	{
	// 		title: 'Forecasted Revenue',
	// 		value: '-',
	// 		change: '+12.4%',
	// 		message: " Growth trend expected",
	// 		icon: TrendingUp
	// 	},
	// 	{
	// 		title: 'Model Accuracy',
	// 		value: '87%',
	// 		change: '23',
	// 		message: " MAPE analysis",
	// 		icon: Briefcase
	// 	},
	// 	{
	// 		title: 'Active Period',
	// 		value: '15',
	// 		change: '15',
	// 		message: " months of active sales",
	// 		icon: LineChart
	// 	},
	// 	{
	// 		title: 'Active Forecasts',
	// 		value: '4',
	// 		change: '4',
	// 		message: " Precdictions from December, 2024",
	// 		icon: BarChart2
	// 	}
	// ];

	const [statsData, setStatsData] = useState([]);
	


	async function fetchPredictions(){
		const data = {
			user_id : user_id
		}
		const res : any = await axios.post(`${BASE_URL}fetch_predictions.php`, {data});

		const projectName = res.data.project_name;
		const dataset = JSON.parse(res.data.dataset);
		const lastDate =  dayjs(dataset[dataset.length - 1].ds).format("MMM DD");

		const predictions = JSON.parse(res.data.predictions);
		const firstPred = predictions[0];
		const firstPredYhat = Math.floor(firstPred.yhat);
	
		const sizeOfDataset = JSON.parse(res.data.dataset).length;

		const tab1 = {
			title: 'Model Accuracy',
			value: `${res.data.accuracy}%`,
			change: `${res.data.metric} Error metric`,
			message: " Forecast error analysis",
			icon: Activity
		}

		const tab2 = {
			title: 'First Prediction',
			value: `K${firstPredYhat}`,
			change: `K${firstPredYhat} predicted for ${firstPred.ds}`,
			message: `${sizeOfDataset} records used`,
			icon: Activity
		}

		const tab3 = {
			title: 'Predictions Period',
			value: `${res.data.interval}`,
			change: `${res.data.interval} from ${lastDate} (last date)`,
			message: " Predictions generated",
			icon: LineChart
		}
		
		const tab4 = {
			title: 'Size of dataset',
			value: `${sizeOfDataset}`,
			change: `${sizeOfDataset} records used for training`,
			message: `${sizeOfDataset} records used`,
			icon: LineChart
		}

		


		setStatsData([tab1, tab2, tab3, tab4])



	
	}

	fetchPredictions();

	return (
		<>
			{statsData.map((item) => (
				<CardWrapper key={item.title}>
					<div className="flex items-start justify-between space-y-2">
						<div>
							<p className="text-muted-foreground mb-2 text-sm font-medium">{item.title}</p>
							<p className="mb-2 text-2xl font-bold">{item.value}</p>
							<p className=" text-muted-foreground text-sm">
								<span className={`${Number(item.change) < 0 ? 'text-red-500' : ' text-green-500'}`}>
									{item.change}
								</span>{' '}
								<div>{item.message}</div>
							</p>
						</div>
						<Button variant="default" size="icon" variantClassName={'primary'}>
							<item.icon className="h-6 w-6" />
						</Button>
					</div>
				</CardWrapper>
			))}
		</>
	);
};

export default MetricsCard;
