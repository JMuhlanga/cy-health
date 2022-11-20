import React, {useEffect, useState} from "react";
import BarChart from 'react-bar-chart';
// import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [statObj , setStatObj] = useState([]);
  
  const tData =statObj.map((cStat) => {
    return(
      <>
        <tr>
          <td className="col-xs-6"><b>{cStat.country}</b></td>
          <td className="col-xs-6">{cStat.population}</td>
          <td className="col-xs-6">{cStat.tests.total}</td>
          <td className="col-xs-6">{cStat.cases.total}</td>
          <td className="col-xs-6">{cStat.deaths.total}</td>
        </tr>        
      </>              
    );
  });

  useEffect(() => {         
    fetch('http://localhost:3001/statistics')
      .then(response => response.json())
      .then(rObj => setStatObj(rObj))
      }, [setStatObj]);

  function handleSearch (e){
    setSearch(e.target.value);
  }

  const margin = {top: 20, right: 20, bottom: 30, left: 40};

  function handleBarClick(element, id){ 
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }

   const plotData = [
    {text: "Population" ,value: 1448471400},
    {text: "Tests" ,value: 160000000},
    {text: "Cases" ,value: 286197},
    {text: "Deaths" ,value: 5227}
   ];
  

  return (
    // Header Section
    <div className="App">
      <div className="container">
          <div>
            <header className="App-header">
              <center><h1>Cy-Health Covid-19 Research Analysis</h1></center>
            </header>
          </div>
          

        {/* Search Section */}

        <div className="mb-3">
            <input 
              type="text" 
              className="form-control form-control-lg"
              placeholder="Search Country" 
              onChange={handleSearch} 
            />

        </div>

        {/* Table Section */}

        <div className="container">
          <div className = "table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-fixed">
              <thead className="table-dark">
                <tr>
                  <th className="col-xs-6">Country</th>
                  <th className="col-xs-6">Population</th>
                  <th className="col-xs-6">Tests</th>
                  <th className="col-xs-6">Cases</th>
                  <th className="col-xs-6">Deaths</th>            
                </tr>
              </thead>
              <tbody>
                {tData}
                
              </tbody>
            </table>          
          </div>
          
        </div>

        {/* Graph Section */}
        <div className="container">
          <center><h4>Country:China</h4></center>
          <div style={{width: '50%'}}> 
            <BarChart ylabel='Population'
                    
                    height={500}
                    margin={margin}
                    data={plotData}
                    
              />
          </div>

        </div>

      </div>
      
      
    </div>
  );
}

export default App;
