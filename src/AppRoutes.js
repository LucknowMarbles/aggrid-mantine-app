import {React, useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './LoginForm'
import App from './App'
import HeaderMan from  './Appm'
import axios from "axios";




export default function AppRoutes() {

    const [apiUrls, setApiUrls] = useState([]);
    useEffect(() => {
    async function fetchRoutes() {
        try {
          const { data } = await axios.get("http://localhost:1337/content-type-builder/content-types", {headers: {
            Authorization: `Bearer ${localStorage.getItem("token_login")}`,
          },});
          console.log(data)
          return data.path

        } catch (error) {
          console.error("Error fetching routes:", error);
        }
      }
    setApiUrls(fetchRoutes());
    console.log(fetchRoutes())
    },[]) 

    return (
        <Routes>
            <Route path="/" element={<HeaderMan />}/>
            <Route path="/login" element={<LoginForm />} />
             {/*apiUrls.map((urlData) => (
                <Route
                    key={urlData.route}
                    path={urlData.route}
                    element={<HeaderMan url={urlData.url} />}
                />
            ))*/} 
        </Routes>
    )
}
