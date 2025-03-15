import React, { useEffect, useState } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from 'axios'
import LoginForm from './LoginForm';

import { ClientSideRowModelModule, ValidationModule, ModuleRegistry } from "ag-grid-community"; // ✅ Import modules
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MantineProvider, Group, Text, Button } from "@mantine/core";

// ✅ Register required AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

// ✅ Custom Header Component with Mantine UI
const MaHd = (props) => {
  return (
    <Group position="apart" px="xs" py="xs" w="100%">
      <Button size="xs" variant="outline" onClick={() => alert(`Clicked on ${props.displayName}`)}>
        Click
      </Button>
    </Group>
  );
};


const HeaderMan = ({url}) => {
    //const [rowData, setRowData] = useState([]);
    // ✅ Column definitions with Mantine header
     const [columnDefs, setColumnDefs] = useState([]);
  
    // ✅ Sample row data
    const [rowData, setRowData] = useState([]); 
  
    useEffect(() => {
        async function fetchData() {
          try {
            const { data } = await axios.get("http://localhost:1337/api/" + url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token_login")}`,
              },
            });
            const target = Object.keys(data.data[0])
            setColumnDefs(target.map((tar)=> {
                return {headerName: tar, field: tar, headerComponentFramework:MaHd}
            }))
            

            setRowData(data.data.map((no) => {
                let exeFor = "{"
                for(let i = 0; i < target.length; i++) {
                    exeFor +='"'+ target[i].toString()+'": "'+no[target[i]]+'",' 
                }
                let newStr = exeFor.slice(0, -1)
                newStr = newStr + "}"
                const dataGot = JSON.parse(newStr)
                console.log(dataGot)
                return dataGot}))


              
        }
    catch(error){
        console.error("Error fetching data:", error);
    }
}
fetchData()
}, []);
        
  
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div style={{ padding: "20px" }}>
          <h2>AG Grid with Mantine Headers & Buttons</h2>
          <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
            <AgGridReact rowData={rowData} columnDefs={columnDefs} />
          </div>
        </div>
      </MantineProvider>
    );
  };
  
  export default HeaderMan;