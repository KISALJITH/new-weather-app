import React, { useEffect } from "react";
import "./../styles/homepage.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import Searchbar from "../components/Searchbar";
import { useState } from "react";
// import axios from axios;
import citiesData from "./../cities.json";
import Cards from "../components/Cards";

function Homepage() {


  return (
    <div className="background">
      <Header />
      <Searchbar />
      <Cards />
      <Footer />
    </div>
  );
}

export default Homepage;
