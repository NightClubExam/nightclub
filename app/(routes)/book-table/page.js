"use client";

import Navigation from "../../components/Navigation";
import PageHero from "../../components/PageHero";
import Tables from "../../components/Tables";
import Footer from "../../components/Footer";
import BookTableForm from "../../components/BookTableForm";
import { useState } from "react";

export default function BookTable() {
  //State til at gemme bordnummer:
  const [selectedTable, setSelectedTable] = useState(null);
   //const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div>
      <Navigation />
      <PageHero title="book table" />
      <Tables
        onTableSelect={setSelectedTable}
        selectedTable={selectedTable}
        //selectedDate={selectedDate}
      />
      <BookTableForm
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
        //onDateChange={setSelectedDate}
      />
      <Footer />
    </div>
  );
}
