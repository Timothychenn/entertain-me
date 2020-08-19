import React from "react";
import "./style.css";
import HomeImage from '../assets/home.svg'

export default function Home() {
  
  return (
    <>
      <section className="container" style={{width: "100%"}}>
        <h1 className="display-4">Discover new movies and TV shows.</h1>
        <img src={HomeImage} alt="home" style={{width: "400px", marginBottom: "50px"}}></img>
      </section>
    </>
  );
}
