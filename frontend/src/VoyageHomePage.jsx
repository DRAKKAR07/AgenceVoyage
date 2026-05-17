import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function VoyageHomePage() {

  const [voyages, setVoyages] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3001/api/voyages")
      .then((res) => res.json())
      .then((data) => setVoyages(data))
      .catch((err) => console.error(err));

  }, []);

  return (

    <div className="homepage-wrapper">

      {/* HEADER */}
      <header className="top-navbar">

        <div className="logo">
          Travel Agency
        </div>

      </header>

      {/* BANNER */}
      <div className="banner-top">

        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600"
          alt="banner"
        />

      </div>

      {/* CONTENT */}
      <div className="content-container">

        {/* TITLES */}
        <div className="header-flex">

          <div>

            <h1 className="main-title">
              Explorez le Monde
            </h1>

            <h2 className="sub-title">
              Voyages Disponibles
            </h2>

          </div>

          <Link
            to="/ajouter-voyage"
            className="btn-add"
          >

            + Nouveau Voyage

          </Link>

        </div>

        {/* CARDS */}
        <div className="cards-grid">

          {voyages.map((v) => (

            <div
              key={v._id}
              className="card-voyage"
            >

              {/* IMAGE */}
              <div className="card-image-container">

                <img
                  src={v.imagevoyage}
                  alt={v.titre}
                />

              </div>

              {/* BODY */}
              <div className="card-body">

                <h3 className="card-title">
                  {v.titre}
                </h3>

                <p className="card-info">

                  📍 {
                    v.destinationID?.nomdestination
                    || "Destination"
                  }

                </p>

                <p className="card-info">

                  ⏱ {
                    v.duree
                    || "7 jours"
                  }

                </p>

                <div className="card-price">

                  {v.prix} TND

                </div>

                <button className="planning-btn">

                  Voir Planning

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}