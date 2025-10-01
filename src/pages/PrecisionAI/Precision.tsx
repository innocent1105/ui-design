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







const Precision = () => {
	const user_id = localStorage.getItem("user_id");
	
	const [noProject, setNoProject] = useState(true);
	const BASE_URL = "http://localhost/precision-v2/UI-DESIGN/backend/";
	const db = new Localbase('precisionDB');
	const navigate = useNavigate();

    const bottomRef = useRef(null);
	
	

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

    const [selectModel, setSelectModel] = useState(false);
    const [activeModel, setActiveModel] = useState("Gemini Flash 1.5");

    const [model2, setModel2] = useState("Gemini 2.5");
    const [model3, setModel3] = useState("Meta AI 3.5");

    const SelectActiveModel = (modelname : any)=>{
        setActiveModel(modelname);

        if(modelname == "Gemini 2.5"){
            setModel2("Gemini Flash 1.5");
            setModel3("Meta AI");
        }else if(modelname == "Gemini Flash 1.5"){
            setModel2("Gemini 2.5");
            setModel3("Meta AI 3.5");
        }else{
            setModel2("Gemini Flash 1.5");
            setModel3("Gemini 2.5");
        }
    }

	const openModelTab = ()=>{
        setSelectModel(true);
    }

    const [chat, setChat] = useState([]);

    const [message, setMessage] = useState("");
    const [thinking, setThinking] = useState(false);


    const saveToLocalStorage = (chats : any) => {
    
        localStorage.setItem("chat-base", JSON.stringify(chats));
    }

    

    useEffect(() => {
        const getFromLocalStorage = () => {
            const chats = localStorage.getItem("chat-base");
            
            if(chats != null){
                setChat(JSON.parse(chats));
            }

        }

        getFromLocalStorage();
    }, [true])



   
    useEffect(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
    }, [chat]);
      

    const formatAIResponse = (text) => {
        return text.split('\n').map((line, idx) => {
         
          if (line.trim().startsWith('*')) {
            return <li key={idx} className="ml-4 list-disc">{line.replace(/^\*\s?/, '')}</li>;
          }
  
          return <p key={idx} className="mb-2">{line}</p>;
        });
      };
      


    const sendMessage = async (message, active_model) => {
        setThinking(true);
        

        setChat(
           chat => [
                ...chat, {
                    sender : "user",
                    message : message,
                    model_name : active_model,
                }
           ]
        )

        saveToLocalStorage(chat);

        setMessage("");

        const conversations : any = localStorage.getItem("chat-base");
        try{
            const res = await axios.post(`${BASE_URL}precision_ai.php`, { data: {  
                    user_id : user_id,
                    message : message,
                    conversations : conversations,
                    model_name : active_model 
                } 
            });

            console.log(conversations)

            if(res.data.status == 200){
                setThinking(false);
                setChat(
                    chat => [
                        ...chat, 
                        res.data
                    ]
                )

                saveToLocalStorage(chat);
            }else{
                setThinking(false);
              
                setChat(
                    chat => [
                        ...chat, {
                            sender : "system",
                            message : "Please check your internet connection",
                            model_name : active_model,
                        }
                    ]
                )
            }
        }catch(error){
            setChat(
                chat => [
                    ...chat, {
                        sender : "system",
                        message : "Please check your internet connection",
                        model_name : active_model,
                    }
                ]
            )
        }
	
    }

    
	return (
		<>
			<div className=' p-2 pt-0 flex flex-row fc-theme-standard justify-center'>
                <div className=' p-4 pt-0 w-3xl ai-chat-box overflow-y-scroll scrollbar-custom fc-theme-standard '>
                   
                   {chat.length == 0 ? (
                        <div className="">
                            <div className=" heading text-center pt-28 text-3xl font-medium">
                                Precision AI
                            </div>

                            <div className=' flex flex-row justify-center gap-2 pt-10 text-md font-medium'>
                                <div onClick={()=> setMessage("How accurate are the predictions?")} className="border border-border active:scale-95 transition-all cursor-pointer hover:bg-secondary hover:text-accent text-ring p-2 px-4 rounded-full">
                                    How accurate are the predictions?
                                </div>
                                <div onClick={()=> setMessage("Explain the dataset")} className="border border-border active:scale-95 transition-all cursor-pointer hover:bg-secondary hover:text-accent text-ring p-2 px-4 rounded-full">
                                    Explain the dataset
                                </div>
                            </div>

                            <div className=' flex flex-row justify-center gap-2 pt-2 mb-20 text-md font-medium'>
                                <div onClick={()=> setMessage("What should I do ?")} className="border border-border active:scale-95 transition-all cursor-pointer hover:bg-secondary hover:text-accent text-ring p-2 px-4 rounded-full">
                                    What should I do ?
                                </div>
                                <div onClick={()=> setMessage("What do you think about my business?")} className="border border-border active:scale-95 transition-all cursor-pointer hover:bg-secondary hover:text-accent text-ring p-2 px-4 rounded-full">
                                    What do you think about my business?
                                </div>
                            </div>

                        
                        </div>
                   ):(
                    <>
                        <div className="pt-20"></div>
                    </>
                   )}
                    



                    {chat.length > 0 ? (
                        chat.map((message, index) => (
                            <div className="">
                                <div ref={bottomRef} className=' mt-4'></div>

                                {message.sender != "user" ? (
                                    <>
                                        {message.sender == "system" ? (
                                            <div className=' border-1 text-orange-400 border-orange-200 rounded-sm p-4 font-semibold ai-text w-4/6 text-sm'>
                                                {message.message}
                                            </div>
                                        ) : (
                                            <div className='ai-text w-4/6 text-card-foreground text-sm cursor-pointer whitespace-pre-wrap rounded-2xl active:scale-95 transition-all'>
                                                <ReactMarkdown>{message.message}</ReactMarkdown>
                                            </div>
                                        )}
                                    </>
                                ) : (

                                    <div className="b">
                                        <div className='w-full flex flex-row justify-end'>
                                            <div className=" w-1/2 flex flex-row justify-end">
                                                <div  className=' cursor-pointer active:scale-95 transition-all w-auto whitespace-pre-wrap p-2 px-4 rounded-md bg-border my-1 text-sm'>
                                                    {message.message}
                                                </div>
                                            </div>

                                            
                                        </div>
                                      
                                    </div>
                                    
                                )}

                                
                            </div>
                        ))
                    ) : (
                        <></>
                    )}

                    {thinking && (
                        <div className=" mt-4 animate-pulse flex flex-row gap-4">
                            <div className="h-4 w-4 ">
                                <Sparkle className=' text-secondary' size={20}/>
                            </div>
                            <span className=' text-secondary text-sm'>Thinking ...</span>
                        </div>
                    )}
                            
                    

                        <div className="py-20"></div>
                </div>


                <div className=' fixed bottom-4 border w-3xl p-2 bg-accent rounded-2xl shadow'>
                <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    name=""
                    id=""
                    className="w-full rounded-lg resize-none p-2 px-4 transition-all border border-border outline-0 focus:outline-none focus:ring-2 focus:ring-border "
                    placeholder="Ask me anything"
                />

                    
                    <div className=' flex flex-row justify-between'>
                       <div className=" flex flex-row gap-2">
                            <div className="border active:scale-95 transition-all p-2 rounded-lg cursor-pointer">
                                <Plus />
                            </div>
                            
                            {selectModel ? (
                                <div onMouseLeave={()=> {setSelectModel(false)}} className=" absolute bg-background ml-20 bottom-14 shadow-md border text-sm p-2 rounded-lg">
                                <div className="text-sm text-gray-500 border-b pb-2 px-3 mb-2">Select Model</div>
                                <div onClick={()=> SelectActiveModel(activeModel)} className=" p-2 my-1 hover:bg-border active:scale-95 transition-all flex flex-row rounded-lg cursor-pointer">
                                    <Sparkle className=' text-secondary' size={20}/>
                                    <span className = " text-sm px-2">{activeModel}</span>
                                </div>

                                <div onClick={()=> SelectActiveModel(model2)} className=" p-2 my-1 hover:bg-border active:scale-95 transition-all flex flex-row rounded-lg cursor-pointer">
                                    <span className = " text-sm px-2">{model2}</span>
                                </div>

                                <div onClick={()=> SelectActiveModel(model3)} className=" p-2 my-1 hover:bg-border active:scale-95 transition-all flex flex-row rounded-lg cursor-pointer">
                                    <span className = " text-sm px-2">{model3}</span>
                                </div>

                                </div>
                            ) : (
                                <div className=""></div>
                            )}
                           


                            <div onClick={()=> openModelTab()} className="border active:scale-95 transition-all flex flex-row p-2 rounded-lg cursor-pointer">
                                <Sparkle className=' text-secondary' size={20}/>
                                <span className = " text-sm px-2">{activeModel}</span>
                                <ChevronDown className=' ml-4 text-xs'/>
                            </div>
                       </div>

                       <div className=" flex flex-row gap-2">
                                {message.length == 0 ? (
                                    <>
                                         <div className=" p-2 border border-border rounded-lg active:scale-95 transition-all cursor-no-drop bg-accent shadow">
                                            <ChevronUp className=' text-gray-500'/>
                                        </div>
                                    </>
                                ) : (
                                    <div onClick={()=> sendMessage(message, activeModel)} className=" p-2 rounded-lg active:scale-95 transition-all cursor-pointer bg-accent-foreground shadow">
                                        <ChevronUp className=' text-accent'/>
                                    </div>
                                )}
                            
                       </div>
                    </div>
                </div>
                
            </div>
		

			
			
		</>
	);
};

export default Precision;
