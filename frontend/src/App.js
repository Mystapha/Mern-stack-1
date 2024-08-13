import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbara from "./components/Navbara";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbara/>
        <div className="pages">

          <Routes>
              <Route path="/" element={<Home/>}/>
                
          </Routes>

        </div>


      </BrowserRouter>
    </div>
  );
}

export default App;
