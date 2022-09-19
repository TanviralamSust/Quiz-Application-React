import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/App.css"
import Layout from "./Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import {AuthProvider} from "../contexts/AuthContext";
import PublicOutlet from "./PublicOutlet";
import PrivateOutlet from "./PrivateOutlet";

function App() {
  return (
      <Router>
          <AuthProvider>
              <Layout>
                  <Routes>
                      <Route path="/" element={<Home/>} />
                      <Route path="/*" element={<PublicOutlet></PublicOutlet>}>
                          <Route path="signup" element={<Signup/>}/>
                          <Route path="login" element={<Login/>}/>
                      </Route>

                      <Route path="/*" element={<PrivateOutlet></PrivateOutlet>}>
                        <Route path="quiz/:id" element={<Quiz/>}/>
                        <Route path="result/:id" element={<Result/>}/>
                      </Route>
                  </Routes>
              </Layout>
          </AuthProvider>
      </Router>
  );
}

export default App;
