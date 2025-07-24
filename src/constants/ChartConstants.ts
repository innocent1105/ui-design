import { IStatCard } from '@/types/IStatsCard';
import { ISubscriptionData } from '@/types/ISubscriptionData';
import { Activity, DollarSign, ShoppingCart, Users, BarChart2, TrendingUp, LineChart, Briefcase  } from 'lucide-react';

export const areaChartData = [
	{ date: '2024-06-06', desktop: 294, mobile: 0 },
	{ date: '2024-06-07', desktop: 323, mobile: 0 },
	{ date: '2024-06-08', desktop: 385, mobile: 0 },
	{ date: '2024-06-09', desktop: 438, mobile: 0 },
	{ date: '2024-06-10', desktop: 155, mobile: 0 },
	{ date: '2024-06-11', desktop: 92, mobile: 0 },
	{ date: '2024-06-12', desktop: 492, mobile: 0 },
	{ date: '2024-06-13', desktop: 81, mobile: 0 },
	{ date: '2024-06-14', desktop: 426, mobile: 0 },
	{ date: '2024-06-15', desktop: 307, mobile: 0 },
	{ date: '2024-06-16', desktop: 371, mobile: 0 },
	{ date: '2024-06-17', desktop: 475, mobile: 0 },
	{ date: '2024-06-18', desktop: 0, mobile: 170 },
	{ date: '2024-06-19', desktop: 0, mobile: 290 },
	{ date: '2024-06-20', desktop: 0, mobile: 450 },
	{ date: '2024-06-21', desktop: 0, mobile: 210 },
	{ date: '2024-06-22', desktop: 0, mobile: 270 },
];

export const pieChartData = [
	{ browser: 'Chrome', visitors: 275, fill: 'var(--chart-1)' },
	{ browser: 'safari', visitors: 200, fill: 'var(--chart-2)' },
	{ browser: 'Edge', visitors: 173, fill: 'var(--chart-3)' },
	{ browser: 'Other', visitors: 190, fill: 'var(--chart-4)' }
];

export const barChartData = [
	{ month: 'January', desktop: 1800 },
	{ month: 'February', desktop: 3050 },
	{ month: 'March', desktop: 2370 },
	{ month: 'April', desktop: 730 },
	{ month: 'May', desktop: 2090 },
	{ month: 'June', desktop: 940 },
	{ month: 'July', desktop: 1140 },
	{ month: 'August', desktop: 3140 },
	{ month: 'September', desktop: 800 },
	{ month: 'October', desktop: 2040 },
	{ month: 'November', desktop: 1140 },
	{ month: 'December', desktop: 2140 }
];


export const statsData: IStatCard[] = [
	{
		title: 'Forecasted Revenue',
		value: 'K65,300.00',
		change: '+12.4%',
		message: " Growth trend expected",
		icon: TrendingUp
	},
	{
		title: 'Model Accuracy',
		value: '87%',
		change: '23',
		message: " MAPE analysis",
		icon: Briefcase
	},
	{
		title: 'Active Period',
		value: '15',
		change: '15',
		message: " months of active sales",
		icon: LineChart
	},
	{
		title: 'Active Forecasts',
		value: '4',
		change: '4',
		message: " Precdictions from December, 2024",
		icon: BarChart2
	}
];

export const subscriptionData: ISubscriptionData[] = [
	{
		country: 'USA',
		code: 'us',
		customers: 2379,
		percentage: 79
	},
	{
		country: 'France',
		code: 'fr',
		customers: 589,
		percentage: 23
	},
	{
		country: 'Germany',
		code: 'de',
		customers: 345,
		percentage: 12
	}
];

export const revenueChartData = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100
	}
];
