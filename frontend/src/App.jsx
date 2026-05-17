import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VoyageHomePage from "./VoyageHomePage";
import VoyageForm from "./VoyageForm";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* L'accueil affiche UNIQUEMENT VoyageHomePage */}
        <Route path="/" element={<VoyageHomePage />} />
        
        {/* La page d'ajout affiche UNIQUEMENT VoyageForm */}
        <Route path="/ajouter-voyage" element={<VoyageForm />} />
      </Routes>
    </Router>
  );
}