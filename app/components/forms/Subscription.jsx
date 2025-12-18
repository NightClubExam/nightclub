//Alberte Remmer

"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";

// Subscription Komponent:
const Subscription = () => {
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError, //Fejl ved eksisterende email
  } = useForm({
    mode: "onChange", //Validerer mens brugeren skriver
  });

  // onSubmit funktion:
  const onSubmit = async (data) => {
    const emailLowerCase = data.email.toLowerCase(); //Så emails ikke kan skrives med store bogstaver (for at undgå dubletter)
    try {
      // Tjek om email allerede eksisterer (kun når der trykkes "send")
      const checkResponse = await fetch(
        `http://localhost:4000/newsletters?email=${emailLowerCase}`,
      );
      const existing = await checkResponse.json();

      if (existing.length > 0) {
        setError("email", {
          type: "manual",
          message: "This email is already subscribed",
        });
        return; // Stop her
      }
      // Send data til API hvis email ikke eksisterer
      const response = await fetch("http://localhost:4000/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailLowerCase,
        }),
      });
      if (response.ok) {
        setSubmissionStatus(true);
        reset(); // Nulstil formularen efter succesfuld indsendelse
        setTimeout(() => setSubmissionStatus(false), 5000); // Fjerner besked efter 5 sekunder
      }
    } catch (error) {
      setSubmissionError(true); // Vis error besked
      setTimeout(() => setSubmissionError(false), 5000); // Fjern efter 5 sek
    }
  };
  return (
    <div className="mb-10 max-w-[80%] mx-auto">
      <div className="mb-6 md:text-center">
        <h3 className="mb-4">Want the latest night club news</h3>
        <p>
          Subscribe to our newsletter and never miss an{" "}
          <span className="text-accent">Event</span>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center justify-center md:flex-row md:items-end"
      >
        {/* Success besked */}
        {submissionStatus && (
          <p className="text-green-500!">
            Your message has been sent successfully!
          </p>
        )}

        {/* Error besked */}
        {submissionError && (
          <p className="text-red-400!">
            Something went wrong. Please try again.
          </p>
        )}
        {/* Email input */}
        <div className="flex flex-col w-full md:w-auto relative mb-6 md:mb-0">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email",
              },
            })}
            type="email"
            placeholder="Enter Your Email"
            className={`p-4 text-white md:w-80 placeholder-white w-full border-b focus:outline-none
              ${errors.email ? "border-red-400" : "border-white"}`}
          />
          {errors.email && (
            <p className="text-red-400! text-sm absolute top-full left-0 mt-1 whitespace-nowrap">
              {errors.email.message}
            </p>
          )}
        </div>
        {/* Send Button */}
        <div className="flex justify-end">
          <PrimaryButton disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sending..." : "Subscribe"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default Subscription;
