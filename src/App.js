import React, { Component } from "react";
import "./App.css";
import Home from "./containers/Home/Home";
import FAQs from "./containers/FAQs/FAQs";
import HelpfulLinks from "./containers/HelpfulLinks";

import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/faqs" component={FAQs} />
            <Route path="/helpful-links" component={HelpfulLinks} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
