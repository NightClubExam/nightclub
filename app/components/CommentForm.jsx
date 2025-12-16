//Alberte Remmer

"use client";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useState} from "react";
import PrimaryButton from "./PrimaryButton";

// CommentForm Komponent:

const CommentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting}
  } = useForm({
        mode: "onChange", //Validerer mens brugeren skriver
    });
    const router = useRouter(); // Bruges til at opdatere siden efter indsendelse af kommentar
    const [submissionStatus, setSubmissionStatus] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    
    // onSubmit funktion:
    const onSubmit = async (data) => {
        try {
      // Send data til API eller server action
      const response = await fetch("http://localhost:4000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: new Date().toISOString(), // Tilføjer automatisk dato ved "send"
        })
      });

      if (response.ok) {
        setSubmissionStatus(true);
        reset(); // Nulstil formularen efter succesfuld indsendelse
        router.refresh(); // Opdater siden for at vise den nye kommentar
         setTimeout(() => setSubmissionStatus(false), 5000); // Fjerner besked efter 5 sekunder
      }
      } catch (error) {
      setSubmissionError(true); // Vis error besked
      setTimeout(() => setSubmissionError(false), 5000); // Fjern efter 5 sek
    }};

    return (
      <div className="flex items-center justify-center max-w-[80vw] mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full mx-auto gap-8"
        >
          {/* Success besked */}
          {submissionStatus && (
            <p className="text-green-500!">
              Your comment was sent successfully!
            </p>
          )}

          {/* Error besked */}
          {submissionError && (
            <p className="text-red-400!">
              Something went wrong. Please try again.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name field */}
            <div className="flex flex-col">
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Name must be less than 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-ZæøåÆØÅ\s'-]+$/,
                    message: "Name can only contain letters",
                  },
                })}
                type="text"
                placeholder="Your Name"
                className={`p-4 text-white placeholder-white w-full border rounded
                       ${errors.name ? "border-red-400" : "border-white"}`}
              />
              {errors.name && (
                <p className="text-red-400! mt-1">{errors.name.message}</p>
              )}
            </div>
            {/* Email field */}
            <div className="flex flex-col">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className={`p-4 text-white placeholder-white w-full border rounded
                    ${errors.email ? "border-red-400" : "border-white"}`}
              />
              {errors.email && (
                <p className="text-red-400! mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          {/* Comment field */}
          <div className="flex flex-col">
            <textarea
              {...register("content", {
                required: "Comment is required",
                minLength: {
                  value: 2,
                  message: "Comment must be at least 2 characters",
                },
                maxLength: {
                  value: 1200,
                  message: "Comment cannot exceed 1200 characters",
                },
              })}
              rows="10" //Gør commentfelt større (viser 10 linjer som udgnagspunkt)
              placeholder="Your Comment"
              className={`p-4 text-white placeholder-white w-full border rounded
                    ${errors.comment ? "border-red-400" : "border-white"}`}
            />
            {errors.comment && (
              <p className="text-red-400! mt-1">{errors.comment.message}</p>
            )}
          </div>
          {/* Send Button */}
          <div className="flex justify-end">
            <PrimaryButton disabled={isSubmitting} type="submit">
              {isSubmitting ? "Sending..." : "Submit"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    );
};

export default CommentForm;
