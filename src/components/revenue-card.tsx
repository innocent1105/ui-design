'use client';

import { LineChart, Line } from 'recharts';

const chartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


export function RevenueCard() {
	return (
		<>
			<div className="space-y-2">
				<div className="flex items-baseline gap-2">
					<span className="text-3xl font-bold tracking-tight">$15,231.89</span>
				</div>
				<p className="text-sm text-muted-foreground">+20.1% from last month</p>
			</div>
			<div className="h-[120px] mt-10">
			 <LineChart width={300} height={120} data={chartData}>
					<Line type="monotone" dataKey="pv"  stroke="var(--primary)" strokeWidth={2} />
				</LineChart>
			</div>
		</>
	);
}
