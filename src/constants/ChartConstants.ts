import { IStatCard } from '@/types/IStatsCard';
import { ISubscriptionData } from '@/types/ISubscriptionData';
import { Activity, DollarSign, ShoppingCart, Users, BarChart2, TrendingUp, LineChart, Briefcase  } from 'lucide-react';
// import useSystemAuth from '@/pages/Auth/FrontendAuth';
import axios from 'axios';
import {useEffect, useState } from 'react';
import Localbase from 'localbase';











export const areaChartData = [
	{ date: '2024-06-06', dataset: 294, predictions: 0 },
	{ date: '2024-06-06', dataset: 234, predictions: 0 },
	{ date: '2024-06-06', dataset: 264, predictions: 0 },
	{ date: '2024-06-06', dataset: 254, predictions: 0 },
	{ date: '2024-06-06', dataset: 274, predictions: 0 },
	{ date: '2024-06-06', dataset: 344, predictions: 0 },
	{ date: '2024-06-06', dataset: 254, predictions: 0 },
	{ date: '2024-06-06', dataset: 214, predictions: 0 },
	{ date: '2024-06-06', dataset: 274, predictions: 0 },

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
		value: '-',
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
		uv: 200,
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
		pv: 500,
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
