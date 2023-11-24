import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { useCookies } from "react-cookie";
import Body from "./Body";
import Footer from "./Footer";
import BB from "./BB";
import HHH from "./HHH";
import Path from "./Path";
import { ToastContainer } from "react-toastify";
import WelcomeToaster from "./WelcomeToaster";
import logo from "./immg.jpeg";
import "./HomePageStyle.css";

import Timeline from "./TimeLine";
import { useToast } from "@chakra-ui/react";
const Signup = () => {
  const [credentials, setCredentials] = useState({ email: "" });
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const toast = useToast();
  let navigate = useNavigate();
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "504611249331-3l8vq2l7k662aof3rllqu4ldeo9cr535.apps.googleusercontent.com",
      });
    });
  }, []);
  const failure = (error) => {
    console.log(error);
  };
  const responseGoogle = async (response) => {
    console.log(response);
    navigate("/loading");
    const response1 = await fetch(
      "http://localhost:8000/api/auth/createusergoogle",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: response.profileObj.name,
          email: response.profileObj.email,
        }),
      }
    );
    const json = await response1.json();
    console.log(json);
    if (json.success) {
      setCookie("AuthToken", json.authtoken);
      setCookie("UserId", json.id);
      setCookie("email", response.profileObj.email);
      toast({
        title: "Welcome",
        description: "Google signup successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log(json.success1);
      if (json.success1) {
        setCookie("name", json.name);
        setCookie("pic", json.pic);
        navigate("/");
        window.location.reload();
      } else {
        navigate("/onboarding");
      }
    } else {
      toast({
        title: "Error Occured!",
        description: "Goggle signup unsuccessfull",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      navigate("/");
    }
  };

  return (
    <>
      <WelcomeToaster></WelcomeToaster>
      <ToastContainer />
      {/* <HHH></HHH> */}
      
        <div className=" dddt flex flex-col h-screen justify-end items-start">
          <div className=" flex justify-end items-end h-screen ">
            <button className="m-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link to="/emailcheck">Login</Link>
            </button>
            <button className="m-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link to="/authemail">Signup</Link>
            </button>
          </div>

          <div className="">
            <GoogleLogin
              clientId="504611249331-3l8vq2l7k662aof3rllqu4ldeo9cr535.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={responseGoogle}
              onFailure={failure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
    
      ;<Body></Body>
      <Path></Path>
      <Footer></Footer>
    </>
  );
};

export default Signup;
