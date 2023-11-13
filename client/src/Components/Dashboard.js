import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Stocks from "./Stocks";
import { CryptoState } from "./CryptoContext";

const Dashboard = (props) => {

  const apiKey = '3b31ded8bd58e51ae49d584cc911c0fc';
  const { currency, symbol } = CryptoState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const apiUrl = `https://open.er-api.com/v6/latest/${cookies.currency}?apikey=${apiKey}`;
  let stage="dashboard";
  const profileImageURL = cookies.pic;
  const name = cookies.name;
  const maxsalary = cookies.maxsalary;
  const minsalary = cookies.minsalary;
  const maxexpense = cookies.maxexpense;
  const minexpense = cookies.minexpense;
  console.log(profileImageURL);
  const navigate = useNavigate();

  const deletecache = async () => {
    props.setforlogin2();
    try {
      removeCookie("AuthToken");
      removeCookie("UserId");
      removeCookie("email");
      removeCookie("name");
      removeCookie("pic");
      removeCookie("maxexpense");
      removeCookie("minexpense");
      removeCookie("maxsalary");
      removeCookie("minsalary");
      
      navigate("/");
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  };

  useEffect

  return (
    <div class="flex h-screen bg-gray-100 font-poppins antialiased">
      <div
        id="sidebar"
        class="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
        x-show="sidenav"
      >
        <div class="space-y-6 md:space-y-10 mt-10">
          <h1 class="font-bold text-4xl text-center md:hidden">
            D<span class="text-teal-600">.</span>
          </h1>
          <h1 class="hidden md:block font-bold text-sm md:text-xl text-center">
            Dashwind<span class="text-teal-600">.</span>
          </h1>
          <div id="profile" class="space-y-3">
            <img
              src={profileImageURL}
              alt="Avatar user"
              class="w-10 md:w-16 rounded-full mx-auto"
            />
            <div>
              <h2 class="font-medium text-xs md:text-sm text-center text-teal-500">
                Eduard Pantazi
              </h2>
              <p class="text-xs text-gray-500 text-center">Administrator</p>
            </div>
          </div>
          <div class="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
            <input
              type="text"
              class="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="Search"
            />
            <button class="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block">
              <svg
                class="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div id="menu" class="flex flex-col space-y-2">
            <a
              href="/"
              class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
            >
              <svg
                class="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span class="">Dashboard</span>
            </a>
            <a
              href="/stocks"
              class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                class="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
              </svg>
              <span class="">Stocks/cryptos</span>
            </a>
            <a
              href="/income"
              class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                class="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="">Income</span>
            </a>
            <a
              href="/expenses"
              class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                class="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
              </svg>
              <span class="">Expenses</span>
            </a>
            <a
              href=""
              class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                class="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="">Chats</span>
            </a>
            <a
              href=""
              class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                class="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="">Groups</span>
            </a>
            <a
              href=""
              class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                class="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"></path>
              </svg>
              <span class="">Settings</span>
            </a>
            <button
              class="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg"
              onClick={deletecache}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="w-3/4 p-6">
        {stage == "dashboard" && (
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Applicant Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    maxincome
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {maxsalary}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    minincome
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {minsalary}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    maxexpense
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {maxexpense}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    minexpense
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {minexpense}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
        {stage == "stocks" && <Stocks />}
      </div>
    </div>
    //     <div className="flex h-screen bg-gray-100">
    //     {/* Left Sidebar */}
    //     <div className="w-1/4 bg-gray-800 p-6">
    //       <div className="mb-4">
    //         <img
    //           src={profileImageURL}
    //           alt="Profile"
    //           className="rounded-full w-16 h-16 mx-auto"
    //         />
    //       </div>
    //       <ul className="text-white">
    //         <li className="mb-2">Dashboard</li>
    //         <li className="mb-2">Analytics</li>
    //         <li className="mb-2">Settings</li>
    //       </ul>
    //     </div>

    //     {/* Main Content */}
    //     <div className="w-3/4 p-6">
    //     <div>
    //       <div className="px-4 sm:px-0">
    //         <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
    //         <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
    //       </div>
    //       <div className="mt-6 border-t border-gray-100">
    //         <dl className="divide-y divide-gray-100">
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name}</dd>
    //           </div>
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">maxincome</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{maxsalary}</dd>
    //           </div>
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">minincome</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{minsalary}</dd>
    //           </div>
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">maxexpense</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{maxexpense}</dd>
    //           </div>
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">minexpense</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{minexpense}</dd>
    //           </div>
    //         </dl>
    //       </div>
    //     </div>
    //     </div>
    //   </div>
  );
};

export default Dashboard;
