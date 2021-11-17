import "./App.css";
import Index from "./components/LoginPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterPage from "./components/LoginPage/RegisterPage";
import ChatPage from "./components/Chat/ChatPage";
import { AuthProvider } from "./Context/Auth";
import { MessageProvider } from "./Context/Message";

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <Router>
          <div className="w-full h-screen bg-gray-50 ">
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/chat">
                <ChatPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;
