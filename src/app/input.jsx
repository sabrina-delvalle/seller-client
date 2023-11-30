'use client'
import Aos from "aos";
import "aos/dist/aos.css"
import { useState, useEffect } from "react";
import Footer from "./footer";
import white_logo from '/public/white_logo.png'
import Image from "next/image";
import { ThreeDots } from  'react-loader-spinner'

export default function Home() {

  const [formData, setFormData] = useState({ email: '' });
  const [listOfCompanies, setListOfCompanies] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(false);
  const [company, setCompany] = useState();
  const [isCompany, setIsCompany] = useState(false)
  const [loading, setLoading] = useState(false)
  const emailList = ['jonjames@gmail.com', 'mariamercedes@gmail.com', 'papajohns@gmail.com', 'julioiglesias@gmail.com', 'leonelmessi@gmail.com']
  const [validEmail, setValidEmail]= useState(false);

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
                //console.log('new records: ', json.records)
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
    setIsCompany(false)
}

function selectCompany(e) {
  if(e.target.value!==''){
        //console.log('current company to appear:', e.target.value)
        setCompany(listOfCompanies.filter(elem => elem.fields.company_name === e.target.value)[0].fields);
        setIsCompany(true)
  }
}

const companiesList = listOfCompanies.map((company) => (
    <option key={listOfCompanies.indexOf(company)} className="flex items-center justify-center text-neutral-400 p-3 text-center bg-white/60 m-3 rounded-full focus:cursor-pointer hover:cursor-pointer hover:text-sky-300" onChange={selectCompany}> 
        {company.fields['company_name']}
    </option>
))

function backMain() {
  setFormData({ email: '' })
  setCurrentAddress(false)
}

    useEffect(() => {
        Aos.init({ duration: 2000, mirror: true });
        //console.log(formData);
      }, [])   //remember formData to handle the data...
    
  return (
    <div className="font-sans">
      {currentAddress ? 
      <div>
      <div className="grid grid-cols-12 h-screen max-sm:flex max-sm:flex-col">
      <div className="grid grid-rows-6 bg-neutral text-white col-span-2 max-lg:col-span-3 bg-building-bg bg-center bg-cover">
        <p className="grid justify-items-center content-center row-span-1 bg-neutral-300/30 max-sm:hidden"><a href="https://www.pieroliventi.com/" target="_blank"><Image
          src={white_logo}
          alt="css_profile"
          width={180}
          height={180}
          className={
            "z-10 hover:cursor-pointer max-md:p-2 max-md:items-center"
          }
        /></a></p>
        <div className="row-span-5 flex items-center justify-center bg-neutral-300/30 hover:bg-neutral-200/30 hover:cursor-pointer max-sm:bg-neutral-100/0" onClick={backMain}><svg className="h-16 w-16 text-white hover:cursor-pointer"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /></svg></div>
      </div>
      <div className="grid col-span-10 max-lg:col-span-9 grid-cols-1 grid-rows-6">
        <div className="flex items-center justify-center row-span-1 col-span-1 text-neutral-600  max-lg:w-full max-lg:text-center max-lg:flex max-lg:justify-center max-lg:items-center">   
        {/* //dropdown menu */}         
        <div>
              <label htmlFor="company-list"></label>
              <select name="company" id="company-list" className="h-14 mt-20 px-80 max-lg:px-28 max-lg:flex max-lg:items-center rounded-sm text-lg max-lg:text-lg shadow-xl outline-none focus:border-neutral-300 focus:border text-white text-center placeholder-neutral-300 hover:bg-sky-200 hover:cursor-pointer hover:text-white focus:text-white bg-building-bg bg-center opacity-90 max-sm:px-10 max-sm:mt-10 max-xl:px-40" onChange={selectCompany}>
              <option value="" className="hover:cursor-pointer">choose company</option>
              {companiesList}
              </select>
          </div>
        {/* //dropdown end */}
        </div>
        { isCompany ? 
        <div className="grid row-span-5 justify-items-center place-items-start mb-16 max-sm:mt-32 max-xl:mt-0">
        <h1 className="flex items-center justify-center row-span-3 max-lg:mt-3 max-xl:mt-0 text-neutral-900 text-5xl mt-16 opacity-80 font-semibold max-lg:text-3xl max-sm:text-2xl max-xl:text-3xl max-sm:hidden">{company.company_name}</h1>
        <div className="flex flex-col items-center -mt-20 max-lg:-mt-52 max-sm:-mt-20">
              <div className="flex flex-row items-center justify-center p-2 ml-6 w-36 h-36 bg-gray-100 rounded-full shadow-md hover:cursor-pointer"><svg className="h-16 w-16 text-sky-600"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg></div>
              <div className="flex items-start text-2xl font-light pl-8 text-sky-700">{company.first_name} {company.last_name}</div>
            </div>
          <div className="flex flex-col flex-start items-start text-gray-800 bg-gray-100 w-auto rounded-3xl px-9 shadow-xl opacity-70 max-sm:px-0 max-sm:mt-10">

            <div className="flex flex-row items-center justify-start p-2 ml-6">
              <div className="grid justify-items-center content-center col-span-1"><svg className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg></div>
              <div className="flex items-start text-xl font-light pl-10 max-sm:text-sm">{company.address}</div>
            </div>
            <div className="flex flex-row items-center justify-start p-2  ml-6">
              <div className="grid justify-items-center content-center col-span-1"><svg className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg></div>
              <div className="flex items-start text-xl font-light pl-10 max-sm:text-sm">{company.county} {company.city} {company.state}</div>
            </div>
            <div className="flex flex-row items-center justify-start p-2  ml-6">
              <div className="grid justify-items-center content-center col-span-1"><svg className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="18" y2="6.01" />  <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />  <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />  <line x1="9" y1="4" x2="9" y2="17" />  <line x1="15" y1="15" x2="15" y2="20" /></svg></div>
              <div className="flex items-start text-xl font-light pl-10 max-sm:text-sm">{company.zip}</div>
            </div>
            <div className="flex flex-row items-center justify-start p-2  ml-6">
              <div className="grid justify-items-center content-center col-span-1"><svg className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />  <line x1="12" y1="18" x2="12.01" y2="18" /></svg></div>
              <div className="flex items-start text-xl font-light pl-10 max-sm:text-sm">{company.phone1}/{company.phone2}</div>
            </div>
            <div className="flex flex-row items-center justify-start p-2  ml-6">
              <div className="grid justify-items-center content-center col-span-1"><svg className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />  <polyline points="22,6 12,13 2,6" /></svg></div>
              <div className="flex items-start text-xl font-light pl-10 max-sm:text-sm">{company.email}</div>
            </div>
            <div className="flex flex-row items-center justify-start p-2  ml-6">
              <div className="grid justify-items-center content-center col-span-1"><svg className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" /></svg></div>
              <div className="flex items-start text-xl font-light pl-10 max-sm:text-sm">{company.web}</div>
            </div>
          </div>
        </div>
        : 
        <div className="flex justify-center mt-10"> <div className="w-96 bg-cover rounded-3xl flex items-center justify-center"> 
          <p className="text w-96 h-46 text-center text-2xl text-neutral-400">Select Company</p>
        </div>
        </div>
      }
        
      
      
      </div>                
    </div>
   <Footer />
     </div>
       : 

       <div>
      <div className="font-sans overflow-hidden bg-building-bg bg-center bg-cover h-screen flex flex-col items-center justify-center">
                <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-96 lg:px-8 bg-white/95 w-96 rounded-lg mb-96">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          {/*           <img
                      className="mx-auto h-10 w-auto hue-rotate-0 grayscale"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
          */}{/*           <Image 
          src={piero_logo}
          alt="css_profile"
          width={120}
          height={120}
          className={
            "z-10 opacity-95 hover:cursor-pointer items-center -rotate-6"
          }
          /> */}
          <h1 className="font-serif text-5xl pb-3 bg-black text-white p-3 px-5">Liventi</h1>
          <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 w-60 m-1">
          Your Company&prime;s List
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          { validEmail ? 
            <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input type="email" name="email" placeholder="insert a valid email"
                  className="block w-full rounded-md border-2 outline-none py-1.5 placeholder-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-2 focus:placeholder-red-500 focus:border-red-500"
                  onChange={e => { const targetName =  e.target.value; setFormData({formData, email: targetName}) }} value={ formData.email }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-neutral-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Submit
              </button>
            </div>
          </form> :
          <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input type="email" name="email" placeholder="insert an email"
                className="block w-full rounded-md border-2 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-cyan-600 sm:text-sm sm:leading-6 p-2"
                onChange={e => { const targetName =  e.target.value; setFormData({formData, email: targetName}) }} value={ formData.email }
              />
            </div>
          </div>

          <div>
          {loading ? <div data-aos="zoom-in" className="flex items-center justify-center">
                        <ThreeDots 
                            height="37" 
                            width="37" 
                            radius="9"
                            color="gray" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> 
                    </div> : 
                                <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-neutral-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                              >
                                Submit
                              </button>}

          </div>
          
        </form>
        
          }

          <p className="mt-10 text-center text-sm text-gray-500">
                Company&prime;s Lists / {'  '}
            <a href="http://localhost:3000/seller-profile" className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500">
              Access
            </a>
          </p>
        </div>

      </div>
    </>
      </div>
      <Footer />
    </div>
      }

    </div>
      
  )
}