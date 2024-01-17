
import Routers from "./components/routes/routes";
import { BrowserRouter } from "react-router-dom";
import 'flowbite'
function App() {
  return (
    <>
      
    <div className="h-screen w-full">
    <BrowserRouter>
    <Routers/>
    </BrowserRouter>
  
   
    </div>
   
    </>
  );
}

export default App;
