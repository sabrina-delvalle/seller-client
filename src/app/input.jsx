'use client'
//import Airtable from "airtable";
import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css"
import { ThreeDots } from  'react-loader-spinner'

export default function Input() {

    const [formData, setFormData] = useState({ email: '' });
    const [listOfCompanies, setListOfCompanies] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(false);
    const [company, setCompany] = useState();
    const [isCompany, setIsCompany] = useState(false)
    const [loading, setLoading] = useState(false)
    const emailList = ['jonjames@gmail.com', 'mariamercedes@gmail.com', 'papajohns@gmail.com', 'julioiglesias@gmail.com', 'leonelmessi@gmail.com']
    const [validEmail, setValidEmail]= useState(false);

    useEffect(() => {
        Aos.init({ duration: 2000, mirror: true });
        console.log(formData);
      }, [formData])

    async function onSubmit(event) {
        event.preventDefault();
        setValidEmail(false)
        if(emailList.some((e)=>e===formData.email)){
            setLoading(true)
            //console.log(formData.email)
            setCurrentAddress(false)
            setCompany();
    
            fetch(`https://api.airtable.com/v0/appPEaWJdX2OxF89e/tblwBZOeEWeZuNkpX?filterByFormula={RepEmail}="${formData.email}"`, {
            headers: {Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}
            })
            .then(resp => resp.json())
            .then(json => {
                    setListOfCompanies(json.records)
                    setCurrentAddress(true)
                    setLoading(false)
            })
        }else{
            setFormData({ email: '' })
            setValidEmail(true)
            setLoading(false)
            setCurrentAddress(false)
            setCompany();
            
        }
        

    }

    function selectCompany(e) {
        if(e.target.value){
            console.log('current company to appear:', e.target.value)
            setCompany(listOfCompanies.filter(elem => elem.fields.company_name === e.target.value)[0].fields);
            setIsCompany(true)
        }
    }

    const companiesList = listOfCompanies.map((company) => (
        <option key={listOfCompanies.indexOf(company)} className="text-neutral-500 p-3 text-center bg-white/60 m-3 rounded-full" onChange={selectCompany}> 
            {company.fields['company_name']}
        </option>
    ))
    
  return (
    <div>
        <div className="flex flex-col items-center pt-56 max-md:pt-32">
                <p className="text-[75px] max-md:text-3xl max-md:mt-5 text-neutral-700">Your Company&prime;s List</p>
        </div>

        <div className="flex flex-col items-center justify-center mb-40">
        <p className="p-16 max-md:p-7">---------------------</p>
        <br />
        {
        validEmail ?         
        <form data-aos="fade-right" onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="insert a valid email " className="border border-neutral-600  rounded-lg p-4 w-80 outline-none focus:border-red-500 focus:border-2 text-neutral-900 text-lg text-center placeholder-gray-800 focus:placeholder-red-500 opacity-50 m-12" onChange={e => { const targetName =  e.target.value; setFormData({formData, email: targetName}) }} value={ formData.email }/>
        <button type='submit' className="hidden">Submit</button>
    </form>   :
        <form data-aos="fade-right" onSubmit={onSubmit}>
            <input type="email" name="email" placeholder="insert email " className="border border-neutral-600  rounded-lg p-4 w-80 outline-none focus:border-neutral-300 focus:border-2 text-neutral-900 text-lg text-center placeholder-gray-800 opacity-50 m-12" onChange={e => { const targetName =  e.target.value; setFormData({formData, email: targetName}) }} value={ formData.email }/>
            <button type='submit' className="hidden">Submit</button>
        </form> 
        }
        {
            currentAddress ?
            <div>
                <label htmlFor="company-list"></label>
                <select name="company" id="company-list" className="border rounded-lg p-5 text-lg w-80 bg-neutral-100/50 outline-none focus:border-neutral-300 focus:border text-neutral-500 text-center placeholder-neutral-300 opacity-50 m-12" data-aos="zoom-in" onChange={selectCompany}>
                <option value="" className="">choose company</option>
                {companiesList}
                </select>
            </div>:loading?<div>
                        <ThreeDots 
                            height="60" 
                            width="60" 
                            radius="9"
                            color="grey" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> 
                    </div>:<p></p>
        }
        <div className="p-10 hover:scale-105 ease-in duration-300">
        {
            isCompany?
            <ul data-aos="zoom-in" className="flex flex-row bg-slate-600/10 rounded-xl p-8 justify-center items-start text-neutral-500 shadow-xl cursor-pointer">
                <div className="pr-3">
                    <li className="p-2"><svg class="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg></li>
                    <li className="p-2"><svg class="h-6 w-6 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    </li>   
                    <li className="p-2"><svg class="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg></li>
                    <li className="p-2"><svg class="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="18" y2="6.01" />  <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />  <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />  <line x1="9" y1="4" x2="9" y2="17" />  <line x1="15" y1="15" x2="15" y2="20" /></svg></li>
                    <li className="p-2"><svg class="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg></li>
                    <li className="p-2"><svg class="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />  <polyline points="22,6 12,13 2,6" /></svg></li>
                    <li className="p-2"><svg class="h-6 w-6 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
                </li>
                </div>
                <div>
                    <li className="p-2">{company.first_name} {company.last_name}</li>
                    <li className="p-2">{company.address}</li>
                    <li className="p-2">{company.county} {company.city} {company.state}</li>
                    <li className="p-2">{company.zip}</li>
                    <li className="p-2">{company.phone1}/{company.phone2}</li>
                    <li className="p-2">{company.email}</li>
                    <li className="p-2">{company.web}</li>
                </div>
            </ul>
            :
            <p></p>
            }
        </div>
        </div>
    </div>
  );
}

