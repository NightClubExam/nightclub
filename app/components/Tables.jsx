//Alberte Remmer
"use client"
import {useState, useEffect} from "react";
import Image from "next/image";

// Der oprettes et array med hvert bord, så der kan mappes over dem senere.
const tables = [
  { number: 1, img: "table_1.png" },
  { number: 2, img: "table_1.png" },
  { number: 3, img: "table_2.png" },
  { number: 4, img: "table_1.png" },
  { number: 5, img: "table_3.png" },
  { number: 6, img: "table_1.png" },
  { number: 7, img: "table_1.png" },
  { number: 8, img: "table_2.png" },
  { number: 9, img: "table_1.png" },
  { number: 10, img: "table_3.png" },
  { number: 11, img: "table_1.png" },
  { number: 12, img: "table_1.png" },
  { number: 13, img: "table_2.png" },
  { number: 14, img: "table_1.png" },
  { number: 15, img: "table_3.png" },
];

const BookTable = ({ onTableSelect, selectedTable }) => {
  //State:
  // - selected: gemmer det valgte bordnummer
  // - setSelected: opdaterer det valgte bordnummer, når brugeren klikker
  // - null: default værdi, når ingen borde er valgt
  // const [selected, setSelected] = useState(null);
  //const [reservedTables, setReservedTables] = useState([]);

  //Hent reservationer når datoen ændres:
  // useEffect(() =>{
  //   if (selectedDate) {
  //      fetch(`http://localhost:4000/reservations`)
  //     .then(res => res.json())
  //     .then(data => {
  //Filtrer reservationer for den valgte dato:
  //       const reserved = data
  //         .filter(reservation => reservation.date === selectedDate)
  //         .map(reservation => reservation.table);
  //       setReservedTables(reserved);
  //     });
  //   }
  // }, [selectedDate]);
  return (
    <div className="w-4/5 mx-auto">
      {/* Bord-oversigt */}
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-3 md:gap-y-6 lg:grid-cols-5 lg:gap-y-12 my-8">
        {tables.map((table) => (
          <div
            className={`relative cursor-pointer transition-all duration-200 
              ${
                selectedTable === table.number
                  ? "scale-102 ring-1 ring-accent"
                  : "hover:scale-102 hover:opacity-90"
              }`}
            key={table.number}
            onClick={() => onTableSelect(table.number)}
          >
            <Image
              src={`/assets/table/${table.img}`}
              alt={`Table ${table.number}`}
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              {table.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default BookTable;