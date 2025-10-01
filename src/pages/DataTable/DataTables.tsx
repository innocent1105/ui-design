import useSystemAuth from '../Auth/FrontendAuth'
import { Table, FormInputIcon, ToggleLeftIcon,Plus, TypeIcon,FolderPlus,Sparkle,Copy,Share,Reply, LayoutDashboard, ChevronDown, ChevronUp, LogIn, UserPlus, KeyRound, DiamondPlus, RotateCcw, HelpCircle, Calendar, Target } from 'lucide-react';

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
import ReactMarkdown from 'react-markdown';
import { useEffect, useState, useRef } from 'react';
import Localbase from 'localbase';
import axios from 'axios';







const DataTables = () => {
	const user_id = localStorage.getItem("user_id");
	
    console.log(user_id)
	const BASE_URL = "http://localhost/precision-v2/UI-DESIGN/backend/";
	const db = new Localbase('precisionDB');
	const navigate = useNavigate();

    const bottomRef = useRef(null);
	
	

    const [data, setData] = useState<DataPoint[]>([]);
    const [fetchingData, setFetching] = useState(true);

    useEffect(() => {
      async function getUserData() {
        if (user_id && user_id.length > 0) {
          const res = await axios.post(`${BASE_URL}dataset.php`, {
            data: { user_id: user_id },
          });
          try {
            const parsed = JSON.parse(res.data);
            setData(parsed);

            console.log(parsed)
            setFetching(false);
          } catch {
            console.error("Invalid dataset format", res.data);
          }
        }
      }
  
      getUserData();
    }, [user_id]);

    
	return (
		<>
			
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Training Dataset</h2>
                {fetchingData ? (
                    <div className=" animate-pulse text-sm font-semibold text-accent-foreground text-center w-full mt-4">Fetching data ... </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl shadow">
                        <table className="min-w-full border border-border">
                        <thead className=" bg-accent">
                            <tr>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Value</th>
                            </tr>
                        </thead>
                            <tbody>
                                {data.length > 0 ? (
                                data.map((row, idx) => (
                                    <tr key={idx} className=" cursor-pointer transition-all active:scale-95 odd:bg-background even:bg-accent hover:bg-secondary hover:text-accent">
                                    <td className="px-4 py-2 border">{row.ds}</td>
                                    <td className="px-4 py-2 border">{row.y}</td>
                                    </tr>
                                ))
                                ) : (
                                <tr>
                                    <td className="px-4 py-2 border text-center" colSpan={2}>
                                        No data available
                                    </td>
                                </tr>
                                )}
                            </tbody>

                    
                        </table>
                    </div>
                )}
              
            </div>
			
			
		</>
	);
};

export default DataTables;
