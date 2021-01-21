import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BASE_URL, API_KEY } from "./constants";
import styled, { keyframes } from 'styled-components';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/planetary/apod?api_key=${API_KEY}`)
         .then(res => {
           //console.log(res.data);
           setData(res.data);
         })
         .catch(err => console.log(err))
  },[]);

  function listDays(number){
    //return an array with the 'number' previous days' date in string format
    let d = new Date();
    let datesArray = [];
    for(let i=0; i<number; i++){
      //each loop will get a new date
      d.setDate(d.getDate()-i);
      //format the date to API's format
      datesArray.push(d.toLocaleString("fr-CA", {minimumIntegerDigits: 2}).substring(0, 9).replaceAll("/", "-"));
    }
    return datesArray;
  }

  return (
    <DayTwoStyle>
      <div className="App container">
        <header>
          <h1>Astronomy Picture of the Day</h1>
        </header>
        <section>
          <img id="image" src={data.url} alt="astronomy"></img>
        <div id="explanation-text">
        <p>{data.explanation}</p>
        <p>{data.title + " / " + data.date}</p>
        </div>
        </section>
        <footer>
          <p>Copyright &copy; 2021 All Rights Reserved by <a href="https://www.nasa.gov">Nasa</a></p>
        </footer>
        
      </div>
    </DayTwoStyle>
  );
}

export default App;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const DayTwoStyle = styled.div`
  #image{
    border-radius: 50%;
    animation: ${rotate} 120s linear infinite;
  }
  h1{
    color: ${props => props.theme.primaryColor};
  }
  #explanation-text{
    border: 4px solid ${props => props.theme.ctaColor};
  }
`;