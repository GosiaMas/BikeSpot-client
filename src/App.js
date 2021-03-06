import React from "react";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import ProtectedPage from "./pages/ProtectedPage";
import Signup from "./pages/Signup";
import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import Profile from "./pages/Profile";
import AddSpot from "./pages/AddSpot";
import "./App.css";
import Payment from "./pages/Payment.jsx";
import DeleteAccount from "./pages/DeleteAccount.jsx";
import ChangeSpot from "./pages/ChangeSpot";
import QRcode from "./pages/QRcode";

class App extends React.Component {
  state = {
    user: null,
    isLoading: true,
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return this.setState({
        isLoading: false,
      });
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        console.log("RES IN CASE OF FAILURE", res);
        // deal with failed backend call
        return this.setState({
          isLoading: false,
        });
      }
      this.setState({
        user: res.data.user,
        isLoading: false,
      });
    });
  };

  handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return this.setState({
        user: null,
        isLoading: false,
      });
    }
    this.setState(
      {
        isLoading: true,
      },
      () => {
        logout(accessToken).then((res) => {
          if (!res.status) {
            // deal with error here
            console.log("SOMETHING HAPPENED", res);
          }

          localStorage.removeItem("accessToken");
          return this.setState({
            isLoading: false,
            user: null,
          });
        });
      }
    );
  };

  authenticate = (user) => {
    this.setState({
      user,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    }

    return (
      <div className="App">
        <Navbar handleLogout={this.handleLogout} user={this.state.user} />
        <Switch>
          <NormalRoute exact path={PATHS.HOMEPAGE} component={HomePage} />
          <NormalRoute
            exact
            path={PATHS.SIGNUPPAGE}
            authenticate={this.authenticate}
            component={Signup}
          />
          <NormalRoute
            exact
            path={PATHS.LOGINPAGE}
            authenticate={this.authenticate}
            component={LogIn}
          />
          <ProtectedRoute
            exact
            path={PATHS.PROTECTEDPAGE}
            component={ProtectedPage}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={PATHS.PROFILEPAGE}
            component={Profile}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={PATHS.ADDSPOTPAGE}
            component={AddSpot}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={PATHS.PAYMENTPAGE}
            component={Payment}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={PATHS.DELETEACCOUNT}
            component={DeleteAccount}
            user={this.state.user}
            authenticate={this.authenticate}
          />
          <ProtectedRoute
            exact
            path={PATHS.CHANGESPOT}
            component={ChangeSpot}
            user={this.state.user}
            authenticate={this.authenticate}
          />
          <ProtectedRoute
            exact
            path={PATHS.QRCODE}
            component={QRcode}
            user={this.state.user}
            authenticate={this.authenticate}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
