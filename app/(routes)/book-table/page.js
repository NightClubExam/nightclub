"use client";

import Navigation from "../../components/Navigation";
import PageHero from "../../components/PageHero";
import Tables from "../../components/Tables";
import Footer from "../../components/Footer";
import { useState } from "react";
import ReservationForm from "../../components/ReservationForm";

export default function BookTable() {
  //State til at gemme bordnummer:
  const [selectedTable, setSelectedTable] = useState(null);
  return (
    <div>
      <Navigation />
      <PageHero title="book table" />
      <Tables
        onTableSelect={setSelectedTable}
        selectedTable={selectedTable}
      />
      <ReservationForm
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
      />
      <Footer />
    </div>
  );
}
