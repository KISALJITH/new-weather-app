import "./App.css";
import Homepage from "./pages/Homepage";
import Weatherdetails from "./pages/Weatherdetails";
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
   <div>
      <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/description" element={<Weatherdetails />} />
      </Routes>
      </BrowserRouter>
   </div>
       
  );
}

export default App;