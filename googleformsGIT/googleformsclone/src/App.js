
import { Switch } from '@chakra-ui/react';
import './App.css';
import Body from './components/body';
import CaptionCarousel from './components/carousel';
import Header from './components/header';
import {Route,Routes,BrowserRouter,Router} from 'react-router-dom'
import { Fragment } from 'react';
import Form_questions from './components/form_questions';
import Formresponse from './components/formresponse';
function App() {
  return (

  
 <Routes>
<Route path='/'  element={[<Header/>,<Body/>]}/>
<Route path='form-questions/:id' element={<Form_questions/>}/>
<Route path='form-preview/:id' element={<Formresponse/>}/>
 </Routes>
 
   
  
    
  );
}

export default App;
