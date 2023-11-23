'use client'
//import Airtable from "airtable";
import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css"

export default function Input() {

    const [formData, setFormData] = useState({ email: '' });
    const [listOfCompanies, setListOfCompanies] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(false);
    const [company, setCompany] = useState();

    useEffect(() => {
        Aos.init({ duration: 2000, mirror: true });
        console.log(formData);
      }, [formData])

    async function onSubmit(event) {
        event.preventDefault();
        console.log(formData.email)
        setCurrentAddress(false)
        setCompany();

        fetch(`https://api.airtable.com/v0/appPEaWJdX2OxF89e/tblwBZOeEWeZuNkpX?filterByFormula={RepEmail}="${formData.email}"`, {
        headers: {Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}
        })
        .then(resp => resp.json())
        .then(json => {
                setListOfCompanies(json.records)
                setCurrentAddress(true)
        })
    }

    const selectCompany = (e) => {
        setCompany(listOfCompanies.filter(elem => elem.fields.company_name === e.target.value)[0].fields)
    }

    const companiesList = listOfCompanies.map((company) => (
        <option key={listOfCompanies.indexOf(company)} className="text-neutral-500 p-3 text-center bg-white/60 m-3 rounded-full" onClick={selectCompany}> 
            {company.fields['company_name']}
        </option>
    ))
    
  return (
    <div>
        <div className="flex flex-col items-center pt-10">
                <p className="text-[150px] text-neutral-700">Insert</p>
                <p className="tex text-[150px] text-neutral-700">Email</p>
        </div>

        <div className="flex flex-col items-center justify-center mb-20">
        <p className="p-14">---------------------</p>
        <br />
        <form data-aos="fade-right" onSubmit={onSubmit}>
            <input type="email" name="email" placeholder="insert email " className="border border-neutral-600  rounded-lg p-5 w-fit outline-none focus:border-neutral-300 focus:border-2 text-neutral-900 text-lg text-center placeholder-gray-800 opacity-50 m-12" onChange={e => { const targetName =  e.target.value; setFormData({formData, email: targetName}) }} value={ formData.email }/>
            <button type='submit' className="hidden">Submit</button>
        </form> 
        {
            currentAddress ?
            <div><label htmlFor="company-list"></label>
            <select name="company" id="company-list" className="border rounded-lg p-5 text-lg w-72 bg-slate-100/50 outline-none focus:border-neutral-300 focus:border text-neutral-900 text-center placeholder-neutral-300 opacity-50 m-12">
            <option value="" className="">choose company</option>
                {companiesList}
            </select></div>:<p></p>
        }
        <div className="p-10">
        {
            company?
            <ul className="flex flex-row bg-slate-600/10 rounded-xl p-8 justify-center items-start text-neutral-500 shadow-xl">
                <div>
                    <li className="p-2">-</li>
                    <li className="p-2">𖡡</li>
                    <li className="p-2">🏷</li>
                    <li className="p-2">🖨</li>
                    <li className="p-2">☎︎</li>
                    <li className="p-2">✉</li>
                    <li className="p-2">🔗</li>
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
