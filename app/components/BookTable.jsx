//Alberte Remmer
// import {useState} from "react";
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

const BookTable = () => {
    //State: 
    // - selected: gemmer det valgte bordnummer
    // - setSelected: opdaterer det valgte bordnummer, når brugeren klikker
    // - null: default værdi, når ingen borde er valgt
    // const [selected, setSelected] = useState(null);
    return (
      <div className="w-4/5 mx-auto">
        {/* Bord-oversigt */}
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-3 md:gap-y-6 lg:grid-cols-5 lg:gap-y-12 my-8">
          {tables.map((table) => (
            <div className="relative" key={table.number}>
              <Image
                src={`/assets/table/${table.img}`} //Indsætter billedet dynamisk baseret på arrayets data
                alt={`Table ${table.number}`} //Indsætter bordnummeret dynamisk baseret på arrayets data
                width={285}
                height={186}
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
                {table.number}
              </span>
            </div>
          ))}

          {/* Bord 1 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_1.png"
              alt="Table 1"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              1
            </span>
          </div> */}
          {/* Bord 2 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_1.png"
              alt="Table 2"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              2
            </span>
          </div> */}
          {/* Bord 3 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_2.png"
              alt="Table 3"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              3
            </span>
          </div> */}
          {/* Bord 4 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_1.png"
              alt="Table 4"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              4
            </span>
          </div> */}
          {/* Bord 5 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_3.png"
              alt="Table 5"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              5
            </span>
          </div> */}
          {/* Bord 6 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_1.png"
              alt="Table 6"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              6
            </span>
          </div> */}
          {/* Bord 7 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_1.png"
              alt="Table 7"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              7
            </span>
          </div> */}
          {/* Bord 8 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_2.png"
              alt="Table 8"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              8
            </span>
          </div> */}
          {/* Bord 9 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_1.png"
              alt="Table 9"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              9
            </span>
          </div> */}
          {/* Bord 10 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_3.png"
              alt="Table 10"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              10
            </span>
          </div> */}
          {/* Bord 11 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_1.png"
              alt="Table 11"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              11
            </span>
          </div> */}
          {/* Bord 12 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_1.png"
              alt="Table 12"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              12
            </span>
          </div> */}
          {/* Bord 13 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_2.png"
              alt="Table 13"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              13
            </span>
          </div> */}
          {/* Bord 14 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_1.png"
              alt="Table 14"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              14
            </span>
          </div> */}
          {/* Bord 15 */}
          {/* <div className="relative">
            <Image
              src="/assets/table/table_3.png"
              alt="Table 15"
              width={285}
              height={186}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-medium">
              15
            </span>
          </div> */}
        </div>
      </div>
    );
}
 
export default BookTable;