import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Localbase from 'localbase';
import PageHeader from '@/components/navigation/page-header';
import CardWrapper from '@/components/card-wrapper';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Brain,
  BarChart2,
  SlidersHorizontal,
  Wand2,
  Filter,
  ArrowRight,
  DivideSquare,
  Trash2,
  MessageSquareText
} from 'lucide-react';

const PreferenceRow = ({
  label,
  icon,
  checked,
  onChange
}: {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm dark:text-gray-400 text-gray-800">{label}</span>
      </div>
      <Switch className=' cursor-pointer' checked={checked} onCheckedChange={onChange} />
    </div>
  );
};

const ProjectSettingsScreen = () => {
  const db = new Localbase('precisionDB');
  const navigate = useNavigate();

  const [project_name, setProjectName] = useState('');
  const [projectDes, setProjectDes] = useState('');
  const [recordCat, setRecordCat] = useState('');
  const [formErrors, setFormErrors] = useState({
    project_name: '',
    projectDes: '',
    recordCat: ''
  });

  const [preferences, setPreferences] = useState({
    default: true,
    averages: false,
    zeroes: false,
    remove: false,
    auto_ml: true,
    timeseries: false,
    linear_regression: false,
    conversations: false
  });

  const SystemAuth = async (db: any) => {
    const [user] = await db.collection('user').get();
    if (!user || user.status !== 'success') {
      navigate('/login');
    }
  };

  useEffect(() => {
    SystemAuth(db);
  }, []);

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key]
    });
  };

  const saveData = () => {
    let errors = {
      project_name: '',
      projectDes: '',
      recordCat: ''
    };

    if (!project_name.trim()) errors.project_name = 'Project name is required.';
    if (!projectDes.trim()) errors.projectDes = 'Project description is required.';
    if (!recordCat.trim()) errors.recordCat = 'Please select a record category.';

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((e) => e !== '');
    if (hasErrors) return;

    let projectData = {
      projectDetails: {
        projectName: project_name,
        projectDes: projectDes,
        recordCat: recordCat
      },
      forecastSettings: {
        settings: preferences
      }
    };

    
    localStorage.setItem("projectData", JSON.stringify(projectData));



    navigate('/data-training');
    console.log(projectData);
  };

  return (
    <>
      <div className="flex justify-between w-full gap-4">
        <div className="">
            <PageHeader
            items={[
                { label: 'Home', href: '/' },
                { label: 'Import data', href: '/import-excel-data' }
            ]}
            heading="Project Settings"
            />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Forecast Settings */}
        <CardWrapper title="Forecast Settings">
          <div className="space-y-6 mb-6">
            <div>
              <h3 className="text-sm font-semibold dark:text-gray-200 text-gray-700 mb-2">
                Forecasting Algorithm
              </h3>
              <div className="space-y-4">
                <PreferenceRow
                  label="Precision ML"
                  icon={<Wand2 className="h-5 w-5 text-muted-foreground" />}
                  checked={preferences.auto_ml}
                  onChange={() => handleToggle('auto_ml')}
                />
                <PreferenceRow
                  label="Time Series Forecasting"
                  icon={<BarChart2 className="h-5 w-5 text-muted-foreground" />}
                  checked={preferences.timeseries}
                  onChange={() => handleToggle('timeseries')}
                />
                <PreferenceRow
                  label="Linear Regression"
                  icon={<DivideSquare className="h-5 w-5 text-muted-foreground" />}
                  checked={preferences.linear_regression}
                  onChange={() => handleToggle('linear_regression')}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold dark:text-gray-200 text-gray-700 mb-2">
                Data Cleaning
              </h3>
              <div className="space-y-4 dark:text-gray-200">
                <PreferenceRow
                  label="Default System Cleaning"
                  icon={<SlidersHorizontal className="h-5 w-5 text-muted-foreground" />}
                  checked={preferences.default}
                  onChange={() => handleToggle('default')}
                />
                <PreferenceRow
                  label="Fill Missing Values with Averages"
                  icon={<Brain className="h-5 w-5 text-muted-foreground" />}
                  checked={preferences.averages}
                  onChange={() => handleToggle('averages')}
                />
                <PreferenceRow
                  label="Replace Missing Values with Zero"
                  icon={<Filter className="h-5 w-5 text-muted-foreground" />}
                  checked={preferences.zeroes}
                  onChange={() => handleToggle('zeroes')}
                />
                <PreferenceRow
                  label="Remove All Missing Entries"
                  icon={<Trash2 className="h-5 w-5 text-muted-foreground" />}
                  checked={preferences.remove}
                  onChange={() => handleToggle('remove')}
                />
                <PreferenceRow
                  label="Enable Data Conversations"
                  icon={<MessageSquareText className="h-5 w-5 text-muted-foreground" />}
                  checked={preferences.conversations}
                  onChange={() => handleToggle('conversations')}
                />
              </div>
            </div>
          </div>
        </CardWrapper>

        {/* Project Details */}
        <CardWrapper title="Project Details">
          <div className="space-y-4">
            {/* Project Name */}
            <div>
              <label htmlFor="project_name" className="block text-sm font-medium dark:text-gray-200 text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                id="project_name"
                value={project_name}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Add a project name"
                className={`mt-1 block w-full rounded-sm border p-1 px-2 shadow text-sm focus:border-primary focus:ring-primary ${
                  formErrors.project_name ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'
                }`}
              />
              {formErrors.project_name && <p className="text-sm text-red-500 mt-1">{formErrors.project_name}</p>}
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="project_description" className="block text-sm font-medium dark:text-gray-200 text-gray-700">
                Project Description
              </label>
              <textarea
                id="project_description"
                value={projectDes}
                onChange={(e) => setProjectDes(e.target.value)}
                placeholder="Describe your project..."
                className={`mt-1 block w-full rounded-sm border p-1 px-2 shadow resize-none h-28 text-sm focus:border-primary focus:ring-primary ${
                  formErrors.projectDes ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'
                }`}
              ></textarea>
              {formErrors.projectDes && <p className="text-sm text-red-500 mt-1">{formErrors.projectDes}</p>}
            </div>

            {/* Record Category */}
            <div className="bg-white dark:bg-gray-900 rounded-md p-4 shadow-sm">
              <label htmlFor="record-type" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Record Category
              </label>
              <select
                id="record-type"
                name="record-type"
                value={recordCat}
                onChange={(e) => setRecordCat(e.target.value)}
                className={`block w-full cursor-pointer px-3 py-2 rounded-md shadow-sm text-sm focus:ring-primary focus:border-primary ${
                  formErrors.recordCat ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
              >
                <option value="">-- Select a category --</option>
                <option value="sales">Sales</option>
                <option value="expenses">Expenses</option>
                <option value="revenue">Revenue</option>
                <option value="inventory">Inventory</option>
                <option value="supply-chain">Supply Chain</option>
                <option value="website-traffic">Website Traffic</option>
                <option value="employee-performance">Employee Performance</option>
              </select>
              {formErrors.recordCat && <p className="text-sm text-red-500 mt-1">{formErrors.recordCat}</p>}
            </div>
          </div>
        </CardWrapper>
      </div>

        <div className="flex justify-end gap-4 mt-6">
            <button
                onClick={() => saveData()}
                className="flex items-center gap-2 cursor-pointer hover:bg-blue-800 active:scale-95 transition-all transition-transform p-2 rounded-md bg-blue-700 text-white font-medium px-4"
            >
                Proceed
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    </>
  );
};

export default ProjectSettingsScreen;
