//Alberte Remmer

"use client";
import { useForm } from "react-hook-form";
import PrimaryButton from "./PrimaryButton";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCheckmarkCircle } from "react-icons/io5";

//Zod "schema" til validering af formularfelter (alt logik for validering):
const schema = z.object({
  // z.object = opretter et valideringsobjekt med flere felter
  // Hvert felt i formularen har sit eget sæt regler

  //Name validering:

  // - Navnet her (fx "name") skal være identisk med navnet i register("name")
  // - Så React Hook Form kan matche inputfeltet med den korrekte valideringsregel
  name: z // z = Zod biblioteket til validering
    .string() //Værdien skal være tekststreng
    .min(2, "Name must be at least 2 characters") //Minimum 2 tegn
    .regex(/^[a-zA-ZæøåÆØÅ\s'-]+$/, "Name can only contain letters"),
  //Regex (Regular expressions) = mønster der tjekker om teksen kun indeholder tilladte tegn:
  //   - Bogstaver: a-z, A-Z, æøå, ÆØÅ
  //   - Mellemrum, apostrof ('), bindestreg (-)
  // Hvis brugeren skriver tal eller specialtegn vises fejlbeskeden.

  //Email validering:
  email: z.string().email(), //tjekker om email har korrekt format (@ og domæne)

  //Table Number validering:
  tableNumber: z
    .string() // Skal være tekst (fordi HTML input returnerer altid text, selv type="number")
    .min(1, "Table Number is required") //Minimum 1 tegn (dvs. ikke tomt)

    //.refine = gør det muiligt at tilføje en custom regel
    // Jeg bruger refine, fordi zod ikke har indbygget regler for talintervaller
    // Jeg laver derfor min egen logik, da fejlbeskeden var underlig i zod når jeg brugte number()
    .refine((val) => !isNaN(Number(val)), {
      //.refine((val) = Den aktuelle værdi fra inputfeltet (hvis brugeren skrev "5", er val = "5")
      // !isNaN(Number(val)) = Tjekker om værdien kan konverteres til et tal (Number(val))
      // isNaN = "is Not a Number" - returnerer true hvis værdien IKKE er et tal
      // ! foran isNaN = negation, dvs. tjekker om det ER et tal
      message: "Table Number must be a number",
    })
    .refine((val) => Number.isInteger(Number(val)), {
      // Number.isInteger = tjekker om tallet er et helt tal (ingen decimaler)
      message: "Table Number must be a whole number",
    })
    .refine((val) => Number(val) >= 1 && Number(val) <= 15, {
      // >= 1 = større end eller lig med 1
      // <= 15 = mindre end eller lig med 15
      // && = OG (begge betingelser skal være opfyldt)
      // Tillader kun bordnumre fra 1 til 15
      message: "Table Number must be between 1 and 15",
    }),

  //Number of Guests validering:
  numberOfGuests: z
    .string()
    .min(1, "Number of Guests is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Please enter a valid number",
    })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Table Number must be a whole number",
    })
    .refine((val) => Number(val) >= 1, {
      message: "There must be at least 1 guest",
    })
    .refine((val) => Number(val) <= 20, {
      message: "Maximum 20 guests allowed - write email for larger groups",
    }),

  date: z
    .string() //skal være tekst
    .min(1, "Date is required") //Minimum 1 tegn (dvs. ikke tomt)
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD") // Regex tjekker formatet er ÅÅÅÅ-MM-DD (fx 2025-12-08)
    .refine(
      (value) => {
        // value = datoen brugeren valgte (fx "2025-12-08")

        const today = new Date();
        // Henter dagens dato (fx 8. december 2025)

        const selected = new Date(value);
        // Konverterer brugerens valgte dato til Date objekt

        today.setHours(0, 0, 0, 0);
        // Sætter klokkeslættet til midnat (00:00:00)
        // Så vi kun sammenligner datoer, ikke tidspunkter
        // Hvis man booker bord, booker man for hele aftenen:
        // Derfor er det ikke så relevant med klokkeslæt, så det er en måde at gøre det mere håndterbart på.

        return selected >= today;
        // Tjekker om den valgte dato er i dag eller i fremtiden
      },
      {
        message: "Date cannot be in the past",
      },
    ),

  contactNumber: z
    .string() //skal være tekst
    .min(8, "Contact Number must be at least 8 digits") //Minimum 8 cifre
    .max(15, "Contact Number cannot exceed 15 digits") //Maximum 15 cifre
    .regex(
      // Regex tjekker at telefonnummeret kun indeholder tal og eventuelt et + først
      /^\+?\d+$/,
      "Contact Number must contain only digits (and optional +)",
    ),

  comments: z
    .string() //skal være tekst
    .max(1200, "Comments cannot exceed more than 1200 characters")
    // Maximum 1200 tegn (dvs. max 1200 bogstaver/tal/mellemrum)
    .optional(),
  // Feltet er valgfrit - brugeren behøver IKKE udfylde det
});

//Typescript forbinder mit zod schema med react hook form:
type formFields = z.infer<typeof schema>;
// Forklaring:

//Linjen betyder "Lav en TypeScript type der har nøjagtigt de samme felter som mit Zod schema"
// - z.infer = Zod's funktion der læser et schema og laver en TypeScript type
// - typeof schema = Fortæller z.infer at den skal kigge på mit valideringsobjekt (det store schema med alle regler)
// - type formFields = Navnet på den nye TypeScript type der oprettes
// - formFields kan nu bruges til at fortælle React Hook Form hvilke felter og typer der er i formularen:
// - På denne måde kan jeg sikrer, at typescript fanger fejl hvis jeg prøver at bruge et felt der ikke findes i schemaet:
// 1. Autocomplete/IntelliSense - Når du skriver data. i din kode, viser VS Code automatisk alle felter: name, email, tableNumber, osv.
// 2. Fejl hvis du staver forkert - Hvis du skriver data.tablNumber (mangler e), får du en rød fejl med det samme
// 3. Sikkerhed mod bugs - Hvis du prøver at tilgå et felt der ikke findes, får du fejl

interface BookTableFormProps {
  //Typescript regel for props:
  //Forklaring:

  // Interface = TypeScript "kontrakt" der definerer hvilke props komponenten skal modtage
  // Props = data der sendes fra en parent komponent til denne komponent
  // Bruger kontrakten som en indgangskontrol : Hvis man bruger BookTableForm, SKAL man give den selectedTable og onTableSelect
  // TypeScript giver fejl hvis man glemmer at sende dem med

  //Denne linje definerer en prop der hedder selectedTable, som kan være enten et tal eller null.
  selectedTable: number | null;

  //Denne linje definerer en prop der hedder onTableSelect, som er en funktion der tager et tal eller null som argument og ikke returnerer noget (void).
  onTableSelect: (tableNumber: number | null) => void;
  // Funktion til at opdatere det valgte bordnummer:
  // Bruges til:
  // - Når brugeren klikker på fx. bord 5 → kalder onTableSelect(5)
  // - Når brugeren vil fjerne valget → kalder onTableSelect(null)
  // - Det opdaterer selectedTable i parent komponenten
  // - BookTableForm får den nye værdi og useEffect opdaterer formularen

  //kort sagt: onTableSelect er en "callback funktion" der gør det muligt for BookTableForm at sige til parent (book-table-page): "Hej, brugeren valgte bord nummer 5" eller "brugeren fjernede valget".
}

const BookTableForm = ({
  selectedTable,
  onTableSelect,
}: BookTableFormProps) => {
  // Forklaring:
  // Jeg opretter en funktionel React komponent der hedder BookTableForm der kan håndtere hele formularen til bordreservation
  // - { selectedTable, onTableSelect } = destructuring - "pakker" props ud så vi kan bruge dem direkte (slipper for at skrive props. hver gang - fx props.selectedTable -> selectedTable)
  // - : BookTableFormProps = TypeScript type der sikrer vi får de rigtige props

  const {
    register, //Funktion der forbinder HTML-inputfelter til react hook form (fx register("name"))
    handleSubmit, //Funktion der håndterer formularindsendelse og validering
    setValue, //Bruges til at sætte værdien for bordnummer i formularen
    setError, //Bruges til at sætte fejl manuelt (fx hvis bord er optaget)
    formState: { errors, isSubmitting }, //formState = er et objekt fra React Hook Form der indeholder information om formularens tilstand.
    //errors = objekt der indeholder valideringsfejl for hvert felt (destruktureret så det kan bruges direkte (fx. {errors.name && <span>{errors.name.message}</span>}))
    // isSubmitting = boolean der er true mens formularen bliver sendt (destruktureret så det kan bruges direkte (fx. <PrimaryButton disabled={isSubmitting}>))
  } = useForm<formFields>({
    //useForm er en React Hook (funktion) fra React Hook Form biblioteket, der opsætter og styrer hele din formular.
    // - useForm giver dig alle de værktøjer du skal bruge til at håndtere en formular
    // - <formFields> = fortæller useForm hvilke felter og typer der er i formularen (TypeScript baseret på tidligere Zod schemaet)
    mode: "onChange", //Hvornår felterne skal valideres: "onChange" = validerer mens brugeren skriver
    // defaultValues: {
    //   name: "Alberte",
    //   email: "alberte@example.com",
    //   tableNumber: "",
    //   numberOfGuests: "2",
    //   date: "2026-01-02",
    //   contactNumber: "12345678",
    //   comments: "Looking forward to my reservation!",
    // },
    resolver: zodResolver(schema), //broen mellem Zod schemaet og React Hook Form
    //resolver: = En indstilling i useForm der bestemmer hvordan validering skal ske
    //zodResolver = En "oversætter" funktion der:
    // - Tager dit Zod schema
    // - Konverterer det til noget React Hook Form kan forstå
    // - Gør det muligt for de to biblioteker at arbejde sammen
  });

  // Jeg bruger useEffect, da der er to måde at vælge borde på, som skal samarbejde
  useEffect(() => {
    if (selectedTable !== null) {
      // Tjekker om der er et valgt bord
      setValue("tableNumber", selectedTable.toString(), {
        // Opdaterer værdien af "tableNumber" i formularen
        shouldValidate: true, // Tvinger formularen til at validere feltet efter opdatering
      });
    }
  }, [selectedTable, setValue]); // Kører effekten hver gang selectedTable eller setValue ændres

  const [showModal, setShowModal] = useState(false);

  // Funktion der håndterer formularindsendelse
  const onSubmit = async (data: formFields) => {
    // - const onSubmit =  Funktion der kører når brugeren trykker "RESERVE"
    // - async = Funktionen kan vente på svar fra serveren (asynkron)
    // - data: formFields =  Alle de validerede data fra formularen (name, email, tableNumber, osv.)

    // Tjek om bordet allerede er reserveret på denne dato
    const checkResponse = await fetch(`http://localhost:4000/reservations`);
    const allReservations = await checkResponse.json(); // Henter alle eksisterende reservationer og konvertere til JSON

    // Funktion der tjekker om det valgte bord er optaget på den valgtedato
    const isTableTaken = allReservations.some(
      //some() = JavaScript array-metode der tjekker om mindst én reservation opfylder betingelsen
      (
        reservation: any, //Arrow function der kører for hver reservation i listen. (any fordi vi ikke har en type definition for reservationer her)
      ) =>
        reservation.table === Number(data.tableNumber) && // Tjekker om bordnummeret matcher det valgte bord
        reservation.date === data.date, // Tjekker om datoen matcher den valgte dato
    );

    if (isTableTaken) {
      // Hvis bordet er optaget
      setError("tableNumber", {
        // Sætter en manuel fejl på feltet "tableNumber"
        type: "manual",
        message:
          "This table is already reserved for this date. Please select another table.",
      });
      return;
    }

    //konverter strings til number før API-kald (kun tables og guests)
    //Jeg opretter et nyt objekt apiData, fordi API'et forventer andre feltnavne og datatyper end min formular.
    const apiData = {
      name: data.name,
      email: data.email,
      table: Number(data.tableNumber), // API forventer "table", ikke "tableNumber"
      guests: Number(data.numberOfGuests), // API forventer "guests", ikke "numberOfGuests"
      date: data.date,
      phone: data.contactNumber, // API forventer "phone", ikke "contactNumber"
      comments: data.comments,
    };

    //Send data til API:
    const response = await fetch("http://localhost:4000/reservations", {
      method: "POST", //HTTP metode til at oprette en ny ressource
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiData),
    });
    if (response.ok) {
      setShowModal(true);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); //Tester
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-10 max-w-md w-full shadow-2xl flex flex-col items-center transform transition-all animate-slideUp border-2 border-gray-200">
            <IoCheckmarkCircle className="text-green-500 text-7xl mb-6" />
            <h3 className="text-3xl font-bold mb-3 text-gray-900!">
              Reservation Confirmed!
            </h3>
            <p className="mb-8 text-gray-600! text-center leading-relaxed">
              Your table has been reserved. We look forward to seeing you!
            </p>
            <button
              className="py-2 px-10 bg-black text-white text-lg border-t border-b border-white hover:bg-accent hover:text-black transition-all duration-300 uppercase"
              onClick={() => {
                setShowModal(false);
                window.location.reload();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <input
            //registrerer inputfeltet "name" til react hook form
            {...register("name")}
            type="text"
            placeholder="Your Name"
            className="border border-white text-white p-4 w-full placeholder-white rounded"
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            //registrerer inputfeltet "email" til react hook form
            {...register("email")}
            type="email"
            placeholder="Your Email"
            className="border border-white text-white p-4 w-full placeholder-white rounded"
          />
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            //registrerer inputfeltet "tableNumber" til react hook form
            {...register("tableNumber")}
            type="number"
            placeholder="Table Number"
            className="border border-white text-white p-4 w-full placeholder-white rounded"
          />
          {errors.tableNumber && (
            <span className="text-red-400">{errors.tableNumber.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            //registrerer inputfeltet "numberOfGuests" til react hook form
            {...register("numberOfGuests")}
            type="number"
            placeholder="Number of Guests"
            className="border border-white text-white p-4 w-full placeholder-white rounded"
          />
          {errors.numberOfGuests && (
            <span className="text-red-400">
              {errors.numberOfGuests.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            //registrerer inputfeltet "date" til react hook form
            {...register("date")}
            type="date"
            placeholder="Select Date"
            className="border border-white text-white p-4 w-full placeholder-white rounded"
          />
          {errors.date && (
            <span className="text-red-400">{errors.date.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            //registrerer inputfeltet "contactNumber" til react hook form
            {...register("contactNumber")}
            type="tel"
            placeholder="Your Contact Number"
            className="border border-white text-white p-4 w-full placeholder-white rounded"
          />
          {errors.contactNumber && (
            <span className="text-red-400">{errors.contactNumber.message}</span>
          )}
        </div>

        <div className="flex flex-col col-span-1 md:col-span-2">
          <textarea
            {...register("comments")}
            placeholder="Your Comment"
            className="w-full border border-white text-white p-4 placeholder-white rounded"
          />
          {errors.comments && (
            <span className="text-red-400">{errors.comments.message}</span>
          )}
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <PrimaryButton disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "RESERVE"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default BookTableForm;
