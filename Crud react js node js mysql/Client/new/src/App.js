import { useState, useEffect } from "react";


import "./App.css";
import Axios from "axios";

export default function App() {
  let modal = {
    movieName: "",
    ReviewName: "",
  };

  const [allState, setAllState] = useState([
    {
      movieList: "",
      refresh:false,
      updateInput:"",
      deleteRefresh:""
    },
  ]);
  const [state, setState] = useState(modal);



 
  const getResult=()=>{
    console.log("new thing test ")
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log("Response", response);
      setAllState((prevState) => ({
        ...prevState,
        movieList: response.data,
      }));
    });
  }

  const Submit = () => {
   
    Axios.post("http://localhost:3001/api/insert", state).then(() => {
      alert("SUCCESS");
      

    });

   
  };
  useEffect(() => {
    getResult()
    
  
    
  }, [allState.refresh])
 
  
  
 

  const handler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    if(name=="updateInput")
    {
      setAllState((prevState)=>({
        ...prevState,
        [name]:value

      }))


      return
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      [name]: value,

    }));
  };
  const deleteRveiw=(movie)=>{
   

  
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  
  }
  const updateReview=(movie_reviews)=>{
    setAllState((prevState)=>({
      ...prevState,
      updateInput:"",
    

    }))

    console.log("ccvcvcv")
    Axios.put('http://localhost:3001/api/update',{
      movieName:movie_reviews,
      movieReviews:allState.updateInput
    })
    
  }
  console.log("All State,",allState.movieList)
  return (
    <>
      <div className="form">
        <label>Movie Name</label>
        <input name="movieName" onChange={handler} />
        <label>Review Name</label>

        <input name="ReviewName" onChange={handler} />
        <button onClick={Submit}> Submit</button>
        <span>{state.movieName}</span>
      </div>
   
       {allState.movieList ? allState.movieList.map((el) => {

return(
  <div className="card">
    <h1>
      {el?.movieName}

    </h1>
    <p>{el?.movieReviews}</p>
  
  <button onClick={()=>deleteRveiw(el?.movieName)}>Delete</button>
 <input type="text" name="updateInput" onChange={handler} id="updateInput"></input>
 <button onClick={()=>updateReview(el?.movieName)}>Update</button>
  </div>
)
  
}):null}
    </>
  );
}
