import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./VoyageForm.css";

const API_URL = "http://localhost:3001";

export default function VoyageForm() {

  const [form, setForm] = useState({
    reference: "",
    titre: "",
    prix: "",
    dateDepart: "",
    duree: "",
    hotel: "",
    imagevoyage: "",
    destinationID: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {

    fetch(API_URL + "/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error(err));

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    setLoading(true);

    try {

      const res = await fetch(
        API_URL + "/api/voyages",
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {

        setToast(
          "Voyage ajouté avec succès !"
        );

        setForm({
          reference:"",
          titre:"",
          prix:"",
          dateDepart:"",
          duree:"",
          hotel:"",
          imagevoyage:"",
          destinationID:"",
        });

      } else {

        setToast("Erreur ajout voyage");

      }

    }
    catch {

      setToast(
        "Impossible de joindre serveur"
      );

    }

    setLoading(false);

  };

  return (

    <div className="form-page">

      <div className="form-container">

        {/* HEADER */}

        <div className="form-header">

          <div>

            <h2>
              Nouveau Voyage
            </h2>

            <p>
              Ajouter une nouvelle destination
            </p>

          </div>

          <Link
            to="/"
            className="home-btn"
          >

            Accueil

          </Link>

        </div>

        {/* FORM */}

        <div className="form-grid">

          <div>

            <label>Référence *</label>

            <input
              name="reference"
              value={form.reference}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Titre *</label>

            <input
              name="titre"
              value={form.titre}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Prix</label>

            <input
              type="number"
              name="prix"
              value={form.prix}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Date Départ *</label>

            <input
              type="date"
              name="dateDepart"
              value={form.dateDepart}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Durée</label>

            <input
              name="duree"
              value={form.duree}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Hôtel *</label>

            <input
              name="hotel"
              value={form.hotel}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Destination</label>

            <select
              name="destinationID"
              value={form.destinationID}
              onChange={handleChange}
            >

              <option value="">
                -- Aucune --
              </option>

              {destinations.map((d) => (

                <option
                  key={d._id}
                  value={d._id}
                >

                  {d.nomdestination}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label>Image URL</label>

            <input
              name="imagevoyage"
              value={form.imagevoyage}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* IMAGE */}

        {
          form.imagevoyage &&
          <div className="preview-container">

            <img
              src={form.imagevoyage}
              alt="preview"
            />

          </div>
        }

        {/* BUTTON */}

        <button
          onClick={handleSubmit}
          className="submit-btn"
        >

          {
            loading
            ? "Envoi..."
            : "Ajouter Voyage"
          }

        </button>

        {/* TOAST */}

        {
          toast &&
          <p className="toast-msg">
            {toast}
          </p>
        }

      </div>

    </div>

  );

}