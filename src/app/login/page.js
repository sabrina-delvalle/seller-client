'use client'
import Aos from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";
import Footer from "../footer";
//import piero_logo from '../piero-logo.png'
//import Image from "next/image";

export default function Home() {

    useEffect(() => {
        Aos.init({ duration: 2000, mirror: true });
        //console.log(formData);
      }, [])   //remember formData to handle the data...
    
  return (
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
            Sign in to your Company's Lists
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="insert email"
                  required
                  className="block w-full rounded-md border-2 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-cyan-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-neutral-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
                Company's Lists / {'  '}
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
      
  )
}