//Alberte Remmer
// Gammel form skal slettes
"use client";

import { useActionState } from "react";
import { submitContactForm } from "../action/contact";
import { useFormStatus } from "react-dom";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";


// Response message (tilbagemelding):
const ResponseMessages = ({state}) => {
    return(
    <>
      {state.success === true && ( // Hvis state.success er true, så vis det der står efter && (success besked)
        <p className="text-green-500!">
          Your message has been sent successfully!
        </p>
      )}
      {state.success === false && ( // Hvis state.success er false, så vis det der står efter && (error besked)
        <p>
          There were errors with your submission. Please correct them and try
          again.
        </p>
      )}
    </>
    );
};

// Submit Button: 
const SubmitButton = () => {
    // Henter pending status fra useFormStatus:
    // - pending er en boolean (true/false), der angiver om formularen er ved at blive sendt. 
    const {pending} = useFormStatus(); // Pending bruges til at styre, om submit-knappen skal være aktiv eller vise "Sending...", mens formen behandles. 
    return (
      <button
        type="submit"
        disabled={pending}
        className={`border border-white text-white p-4 rounded hover:bg-white hover:text-black transition ${pending ? "bg-gray-200 cursor-not-allowed opacity-50" : ""} `}
      >
        {pending ? "Sending..." : "Send"}
      </button> //Hvis pending er true (formen er ved at blive sendt), vises "Sending...", hvis pending er false (formen er klar til at blive sendt) vises "Send".
    );
};

// ContactUsForm Komponent:
const ContactUsForm = () => {
    // useActionState hook:
    // - state: objekt der indeholder: 
    //      - om bekseden er sendt (success)
    //      - fejlbeskeder for hvert felt (errors)
    //      - De værdier brugeren har skrevet i felterne (fields)
    // - sendForm: En funktion der kaldes når brugeren trykker "Send" og sender dataen til submitContactForm.
    const [state, sendForm] = useActionState(submitContactForm, {
        success: null, // Status for besked; null = ikke sendt, true = sendt, false = fejl
        errors: {}, // fejlbeskeder for hvert felt
        fields:{}, // Gemmer brugerens input, så det kan vises igen ved fejl
    });
  return (
    // Tailwind:
    // - max-w-2xl: Maksimal bredde for formen
    // - w-full: Formen fylder hele den tilgængelige bredde op til max-w
    <div className="flex items-center justify-center">
      <form
        action={sendForm}
        className="flex flex-col max-w-2xl w-full mx-auto space-y-4"
      >
        <ResponseMessages state={state} />
        {/* sender state-objektet fra useActionState som prop til ResponseMessages (dette gør at man nu kan bruge state.success og state.errors til at vise beskeder) */}
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            defaultValue={state.fields?.name}
            className={`p-4 pr-12 text-white placeholder-white w-full 
      ${state.errors?.name ? "border-red-400" : state.fields?.name ? "border-green-400" : "border-white"} 
      border rounded`}
          />
          {/* Ikon til højre for input */}
          {state.errors?.name ? (
            <AiFillCloseCircle className="absolute right-4 top-4  text-red-400 text-2xl pointer-events-none" />
          ) : state.fields?.name ? (
            <AiFillCheckCircle className="absolute right-4 top-4  text-green-400 text-2xl pointer-events-none" />
          ) : null}

          {/* Viser fejlmeddelelse */}
          {state.errors?.name && (
            <p className="text-red-400! mt-1">{state.errors.name}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            defaultValue={state.fields?.email}
            className={`p-4 text-white placeholder-white w-full 
      ${state.errors?.email ? "border-red-400" : state.fields?.email ? "border-green-400" : "border-white"} 
      border rounded`}
          />

          {/* Ikon til højre for input */}
          {state.errors?.email ? (
            <AiFillCloseCircle className="absolute right-4 top-4  text-red-400 text-2xl pointer-events-none" />
          ) : state.fields?.email ? (
            <AiFillCheckCircle className="absolute right-4 top-4  text-green-400 text-2xl pointer-events-none" />
          ) : null}

          {/* Viser fejlmeddelelse */}
          {state.errors?.email && (
            <p className="text-red-400! mt-1">{state.errors.email}</p>
          )}
        </div>

        <div className="relative">
          <textarea
            type="text"
            name="comment"
            placeholder="Your Comment"
            defaultValue={state.fields?.comment}
            className={`p-4 text-white placeholder-white w-full
      ${state.errors?.comment ? "border-red-400" : state.fields?.comment ? "border-green-400" : "border-white"} 
      border rounded`}
          />

          {/* Ikon til højre for input */}
          {state.errors?.comment ? (
            <AiFillCloseCircle className="absolute right-4 top-4  text-red-400 text-2xl pointer-events-none" />
          ) : state.fields?.comment ? (
            <AiFillCheckCircle className="absolute right-4 top-4  text-green-400 text-2xl pointer-events-none" />
          ) : null}

          {/* Viser fejlmeddelelse */}
          {state.errors?.comment && (
            <p className="text-red-400! mt-1">{state.errors.comment}</p>
          )}
        </div>
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
