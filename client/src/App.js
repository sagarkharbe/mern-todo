import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import store from "./store";
import { Provider } from "react-redux";
import ShoppingList from "./components/ShoppingList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ItemModal from "./components/ItemModal";
import { loadUser } from "./actions/authAction";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <ItemModal />
            <ShoppingList />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
