import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BASE_URL, API_KEY } from "./constants";


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

  console.log(data);

  return (
    <div className="App container">
      <header>
        <h1>{data["title"]}</h1>
      </header>
      <section>
        <img src={data.url} alt="astronomy"></img>
      <p>{data.explanation}</p>
      <p>{data.date}</p>
      </section>
      <footer>
        <p>Copyright &copy; 2021 All Rights Reserved by <a href="https://api.nasa.gov">Nasa</a></p>
      </footer>
      
    </div>
  );
}

export default App;
