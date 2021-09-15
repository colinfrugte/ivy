import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { useSelector } from "react-redux";

function pad(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

function App() {
  const { liveSeconds, liveMinutes, liveHours } = useSelector(
    (state) => state.timer
  );

  if (liveHours > 0) {
    document.title =
      "Ivy: " + liveHours + ":" + pad(liveMinutes) + ":" + pad(liveSeconds);
  } else {
    document.title = "Ivy: " + pad(liveMinutes) + ":" + pad(liveSeconds);
  }

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="bg-gray-100 h-screen p-1 pt-4">
          <Switch>
            <Route path="/signup">
              <Signup />;
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
