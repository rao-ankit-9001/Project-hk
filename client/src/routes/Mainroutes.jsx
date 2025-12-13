import { Route, Routes } from "react-router-dom";
import Day1 from "../components/Day1";
import Whatsapp from "../components/navcomponents/Whatsapp"
import Snapchat from "../components/navcomponents/Snapchat"
import Instagram from "../components/navcomponents/Instagram"
import Music from "../components/navcomponents/Music"
import Specialmomets from "../components/navcomponents/Specialmomets"


function Mainroutes() {
  return (
   
      <Routes>
        
        <Route path="/" element={<Day1 />} />
        <Route path="/apps" element={<Whatsapp/>} />
        <Route path="/instagram" element={<Instagram/>} />
        <Route path="/snapchat" element={<Snapchat/>} />
        <Route path="/moments" element={<Specialmomets/>} />
        <Route path="/music" element={<Music/>} />
      </Routes>

  )
}   

export default Mainroutes;