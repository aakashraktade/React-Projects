import styled  from "styled-components"
import StartPage from "./Components/StartPage";
import { useState } from "react";
import GamePlay from "./Components/GamePlay";


const Button=styled.button`
background-color:black;
color:white;
padding:10px;

`;

function App() {

  const [isGameStarted,setGameStrated]=useState(false);

  const toggleGamePlay=()=>{
    setGameStrated((prev)=>!prev);
  }

  return (
   <>
   {

    isGameStarted ?<GamePlay/>:<StartPage toggle={toggleGamePlay}/>
   }
   
   </>
  )
}

export default App
