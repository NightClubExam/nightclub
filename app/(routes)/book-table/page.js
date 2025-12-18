"use client";

import Navigation from "../../components/layouts/Navigation";
import PageHero from "../../components/layouts/PageHero";
import Tables from "../../components/ui/Tables";
import Footer from "../../components/layouts/Footer";
import { useState } from "react";
import ReservationForm from "../../components/forms/ReservationForm";

export default function BookTable() {
  //State til at gemme bordnummer:
  const [selectedTable, setSelectedTable] = useState(null);
  return (
    <div>
      <Navigation />
      <PageHero title="book table" />
      <Tables onTableSelect={setSelectedTable} selectedTable={selectedTable} />
      <ReservationForm
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
      />
      <Footer />
    </div>
  );
}
