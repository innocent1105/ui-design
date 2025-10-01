import useSystemAuth from '../Auth/FrontendAuth'

import PageHeader from '@/components/navigation/page-header';
import MetricsCard from '@/components/dashboard/metrics-card';
import BarChartComponent from '@/components/dashboard/bar-chart-component';
import PieChartComponent from '@/components/dashboard/pie-chart-component';
import CardWrapper from '@/components/card-wrapper';
import AreaChartComponent from '@/components/dashboard/area-chart-component';
import RevenueCard from '@/components/dashboard/revenue-card';
import SubscriptionOverviewCard from '@/components/dashboard/subscription-overview-card';
import CreditScoreCard from '@/components/dashboard/credit-score-chart';
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from 'react';
import Localbase from 'localbase';
import axios from 'axios';







const Dashboard = () => {
	const user_id = localStorage.getItem("user_id");
	
	const [noProject, setNoProject] = useState(true);
	const BASE_URL = "http://localhost/precision-v2/UI-DESIGN/backend/";
	const db = new Localbase('precisionDB');
	const navigate = useNavigate();

	
	useEffect(() =>{
		if(!noProject){
			navigate("/import-excel-data");
		}
	}, [noProject])

	useEffect(() => {
		async function getUserData(){
			const res = await axios.post(`${BASE_URL}user_data.php`, { data: {  user_id : user_id } });

			console.log(res.data)
			if(res.data.active_project != "none"){
				setNoProject(true);
			}else{
				setNoProject(false);
			}
		}

		getUserData();
	}, []);

	const [summary, setSummary] = useState("");


	const openAIChat = () =>{
		navigate("/precision");
	}
	
	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Dashboard', href: '/' }
				]}
				heading="Hello, Innocent"
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<MetricsCard />
			</div>

			
			<CardWrapper className=" " title="Overall Revenue">
				<div className=' w-full flex flex-row gap-2'>
					<div className=' w-full h-94'>
						<AreaChartComponent />
					</div>
					<div className="w-6/12 p-2">
						<div className="flex flex-col justify-between h-full  p-6 rounded-2xl border border-sidebar-accent ">
							
					
							<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-accent rounded-lg"></div>
								<div className=" text-accent-foreground font-semibold text-lg">
									Precision AI
								</div>
							</div>


							{summary.length < 0 ? (
								<div className="border">
									<div className="mt-4 space-y-2">
										<p className="text-accent-background text-sm leading-relaxed">
											{summary.slice(0, 420)} ...
										</p>
									</div>

									<div className="flex justify-end mt-4">
										<button onClick={()=> openAIChat()} className="px-4 py-2 text-white text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 hover:from-blue-600 hover:to-blue-400 cursor-pointer transition-all duration-300 active:scale-95">
											Open summary
										</button>
									</div>
								</div>

							) : (
								<div className="bord">
									<div className=" text-sm text-gray-400 pb-32">
										Fetching data ... 
									</div>

									<div className="flex justify-end mt-24">
								
									</div>

								</div>

							)}


							

						</div>
						</div>

				</div>
			</CardWrapper>


			<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
				<CardWrapper className="col-span-1 lg:col-span-4" title="Monthly Target">
					<CreditScoreCard score={77} />
				</CardWrapper>

				<CardWrapper className="col-span-1 lg:col-span-4" title="Total Revenue">
					<RevenueCard />
				</CardWrapper>

				<CardWrapper className="col-span-1 lg:col-span-4" title="Subscription Overview">
					<SubscriptionOverviewCard />
				</CardWrapper>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
				<CardWrapper className="col-span-1 lg:col-span-4" title="Gross Monthly Revenue">
					<BarChartComponent />
				</CardWrapper>

				<CardWrapper className="col-span-1 lg:col-span-3" title="Visitors">
					<PieChartComponent />
				</CardWrapper>
			</div>

		</>
	);
};

export default Dashboard;
