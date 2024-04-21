import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Todoo from './Components/Todoo';
import Addtodo from './Components/Addtodo';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
     
      

     
      <Route path="/" element={<Todoo/>}/>
      <Route path="/addtodo" element={<Addtodo/>}/>
      
      

      



          

      </Routes>
      </BrowserRouter>

    
     
    </div>
  );
}

export default App;