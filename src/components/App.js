import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { DoneList } from "./DoneList";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/signup">
            <Signup />;
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/donelist">
            <DoneList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
