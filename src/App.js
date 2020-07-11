import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Header from "./pages/ach_Header";
import Footer from "./pages/ach_Footer";
import Container from "./containers/Container"
function App() {
  return (
    <div>
      <Header />
      {/* <Test />*/}
      {/* <Home />  */}
      {/* <AddMouton/> */}
      {/* <HomeCommande /> */}
      {/* <DetailsCommande /> */}
      {/* <HomeEleveur /> */}
      {/* <AddEleveur /> */}
      {/* <DetailsEleveur /> */}
      <Container />
      <Footer />
    </div>
  );
}

export default App;
