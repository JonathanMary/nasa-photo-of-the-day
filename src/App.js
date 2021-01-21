import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BASE_URL, API_KEY } from "./constants";
import styled, { keyframes } from 'styled-components';

//material UI is designed with Roboto in mind.
import '@fontsource/roboto';
import { Box, Button, TextField } from "@material-ui/core";




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

  let newDate = [];
  function newImg() {
    axios.get(`${BASE_URL}/planetary/apod?api_key=${API_KEY}&date=${newDate}`)
    .then(result =>{
      console.log("API result:", result);
      console.log("newDate: ", newDate);
      setData(result.data);
          })
        .catch(err => console.log(err))
  }

  return (
    <Box>
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
          <form id="form" noValidate>
            <TextField
              id="date"
              label="Select another day?"
              type="date"
              defaultValue={data.date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={evt => newDate.push(evt.target.value)}
              />
            <Button onClick={newImg}>Get Picture!</Button>
          </form>
          </section>
          <footer>
            <p>Copyright &copy; 2021 All Rights Reserved by <a href="https://www.nasa.gov">Nasa</a></p>
          </footer>
          
        </div>
      </DayTwoStyle>
    </Box>
  );
}

export default App;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const DayTwoStyle = styled.div`
  font-family: 'Roboto', sans-serif;
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
  #form {
    display: flex;
    align-items: baseline;
    margin-top: 8px;
  }
`;