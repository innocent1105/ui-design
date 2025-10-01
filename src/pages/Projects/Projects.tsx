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
import Spinner from '@/components/spinner/Spinner';
import { useEffect, useState } from 'react';
import Localbase from 'localbase';
import axios from 'axios';







const ProjectsScreen = () => {
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

    const [projects, setProjects] = useState([]);

	useEffect(() => {

		async function getUserData(){
			const res = await axios.post(`${BASE_URL}projects.php`, { data: {  user_id : user_id } });

			// console.log("user data 4:", res.data);

            if(res.data[0] != "error"){
                setProjects(res.data);
            }
		}

		getUserData();
	}, []);

    const [openingProject, setOpening] = useState(false);

    const openProject = async (project_id : any) => {
        setOpening(true);
		const res = await axios.post(`${BASE_URL}set_project.php`, { data: {  
            user_id : user_id,
            id : project_id
        } });

        if(res.data == "success"){
            navigate("/");
        }
    }

	
	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Dashboard', href: '/' }
				]}
				heading="Projects"
			/>
			

            <div className="mt-6">
                {projects.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="border rounded-2xl bg-accent shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col justify-between"
                        >
                       
                        <div className="flex justify-between items-start">
                            <div>
                            <h3 className="text-lg font-semibold ">{project.project_name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{project.project_des}</p>
                            </div>

                         
                            <div className="flex gap-2">
                            <button onClick={()=> openProject(project.id)} className="border border-gray-300 text-sm px-4 py-1.5 rounded-full cursor-pointer transition">
                                {openingProject ? <Spinner /> : <p>Open</p>}
                            </button>
                            <button className="border border-gray-300 text-sm px-4 py-1.5 rounded-full cursor-pointer transition">
                                Reports
                            </button>
                            </div>
                        </div>

                  
                        <div className="mt-4">
                            <span className="text-sm font-medium text-blue-600">
                            {project.model_name}
                            </span>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8 border rounded-lg">
                    No projects yet
                    </div>
                )}
            </div>


           
			

		</>
	);
};

export default ProjectsScreen;
