import { useState } from 'react'
import './App.css'
import Navigation from './Components/Navigation/Navigation';
import ContactHeader from './Components/ContactHeader/ContactHeader';
import ContactForm from './Components/ContactForm/ContactForm';

const App=()=>{
  const [count,setCount]=useState(0);

  return(
    <div>
      <Navigation/>
      <div className='main_con'>
      <ContactHeader/>
      <ContactForm/>
      </div>
      
    </div>
  )
}

export default App