import "../styles/App.css"
import Layout from "./Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

function App() {
  return (
      <Layout>
          {/*<Signup></Signup>*/}
          {/*<Login></Login>*/}
          {/*<Home/>*/}
          {/*<Quiz></Quiz>*/}
          <Result/>
      </Layout>
  );
}

export default App;
