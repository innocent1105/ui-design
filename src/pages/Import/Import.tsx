import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Localbase from 'localbase';
import * as XLSX from 'xlsx';
import PageHeader from '@/components/navigation/page-header';
import MetricsCard from '@/components/dashboard/metrics-card';
import BarChartComponent from '@/components/dashboard/bar-chart-component';
import PieChartComponent from '@/components/dashboard/pie-chart-component';
import CardWrapper from '@/components/card-wrapper';
import AreaChartComponent from '@/components/dashboard/area-chart-component';
import RevenueCard from '@/components/dashboard/revenue-card';
import SubscriptionOverviewCard from '@/components/dashboard/subscription-overview-card';
import CreditScoreCard from '@/components/dashboard/credit-score-chart';
import { Button } from '@/components/ui/button';
import useSystemAuth from '../Auth/FrontendAuth'


const ImportData = () => {
	useSystemAuth();

	const db = new Localbase('precisionDB');
	const navigate = useNavigate();
	const [excelData, setExcelData] = useState<any[]>([]);
    let processedColumns : Array<T> = [];
    const [processedData, setProcessedData] = useState([]);

	

	const handleExcelImport = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (evt) => {
			const data = evt.target?.result;
			const workbook = XLSX.read(data, { type: 'binary' });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet);
			setExcelData(jsonData);
            
            /////////////////////////////////////////////////////

            let keys = Object.keys(jsonData[0]);
            

            keys.forEach((key, index )=> {
                processedColumns.push([key]);
                for(let i = 0; i < jsonData.length; i++){
                    processedColumns[index].push(jsonData[i][key]);
                }
            })   
            setProcessedData(processedColumns)
		};
		reader.readAsBinaryString(file);
	};


    const [training, setTraining] = useState(false);

	const handleSaveToIndexedDB = async () => {
        setTraining(true)

        const import_id = Math.floor(Math.random() * 1700);

        localStorage.setItem('import_id', import_id);

        const res = await db.collection('excel_data').add({
            import_id : import_id,
            data : excelData
        });

        const delete_ = await db.collection('process_data').delete();

        console.log("delete_ ", delete_)

        if(delete_.success){
            await db.collection('process_data').add({
                import_id : import_id,
                data : processedData
            });
            
            navigate('/project-settings');
        }

        
	};

	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Import Dataset', href: '/import-excel-data' }
				]}
				heading="Hello, Innocent"
			/>

            <CardWrapper className="mt-2 p-4 px-2 shadow-md border border-muted rounded-2xl ">
               <div className="flex gap-4 justify-between w-full">
                    <h2 className="text-lg w-full font-semibold mb-4 text-foreground">Import Excel Data</h2>
                    {excelData.length > 0 && (
                        <div className="flex justify-end gap-4 w-full">
                            <div className="text-gray-800 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400 text-sm font-semibold cursor-pointer pt-2">
                                AI Summary
                            </div>
                            <div className="text-gray-800 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400 text-sm font-semibold cursor-pointer pt-2">
                                Save Dataset
                            </div>
                        

                        </div>
                    )}
                  
               </div>
                <label
                    htmlFor="excelUpload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-primary/50 rounded-xl cursor-pointer bg-muted hover:bg-muted/70 transition"
                >
                    <span className="text-sm text-muted-foreground mb-2">Click or drag & drop to upload</span>
                    <span className="text-base font-medium text-primary">Select Excel File (.xlsx / .xls)</span>
                    <input
                        id="excelUpload"
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleExcelImport}
                        className="hidden"
                    />
                </label>

                {excelData.length > 0 && (
                    <div className="mt-6">
                        <p className="text-sm text-muted-foreground mb-2">
                            Showing preview of <strong>{excelData.length}</strong> rows
                        </p>
                        <div className="overflow-auto max-h-64 border rounded-lg">
                            <table className="w-full text-sm table-auto border-collapse">
                                <thead className="bg-muted">
                                    <tr>
                                        {Object.keys(excelData[0]).map((key) => (
                                            <th key={key} className="px-4 py-2 border-b text-left font-medium text-foreground">
                                                {key}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {excelData.slice(0, 5).map((row, index) => (
                                        <tr key={index} className="hover:bg-muted/30">
                                            {Object.values(row).map((value, i) => (
                                                <td key={i} className="px-4 py-2 border-b text-foreground">
                                                    {String(value)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button
                                onClick={handleSaveToIndexedDB}
                                disabled={training}
                                className={`text-white font-medium py-2 px-6 rounded-md transition-all duration-200
                                    ${training
                                        ? 'bg-gray-900 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600'}
                                `}
                            >
                                {training ? (
                                    <div className="flex items-center gap-2 text-white">
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-45" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                     
                                    </div>
                                ) : (
                                    <div>Proceed</div>
                                )}
                            </Button>
                        </div>
                    </div>
                )}

            </CardWrapper>


			{/* Other Dashboard Cards */}
			
		</>
	);
};

export default ImportData;
