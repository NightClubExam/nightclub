//ALberte Remmer
"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import { IoCheckmarkCircle } from "react-icons/io5";

const ReservationForm = ({ selectedTable}) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const [showModal, setShowModal] = useState(false);

  // Synkroniser selectedTable med inputfeltet
  useEffect(() => {
    if (selectedTable !== null) {
      setValue("tableNumber", selectedTable.toString(), {
        shouldValidate: true,
      });
    }
  }, [selectedTable, setValue]);

  const onSubmit = async (data) => {
    // Tjek om bordet er optaget
    const checkResponse = await fetch("http://localhost:4000/reservations");
    const allReservations = await checkResponse.json();
    const isTableTaken = allReservations.some(
      (reservation) =>
        reservation.table === Number(data.tableNumber) &&
        reservation.date === data.date,
    );
    if (isTableTaken) {
      setError("tableNumber", {
        type: "manual",
        message:
          "This table is already reserved for this date. Please select another table.",
      });
      return;
    }

    // Send data til API
    const apiData = {
      name: data.name,
      email: data.email,
      table: Number(data.tableNumber),
      guests: Number(data.numberOfGuests),
      date: data.date,
      phone: data.contactNumber,
      comments: data.comments,
    };

    const response = await fetch("http://localhost:4000/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiData),
    });
    if (response.ok) {
      setShowModal(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-2xl flex flex-col items-center">
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
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              pattern: {
                value: /^[a-zA-ZæøåÆØÅ\s'-]+$/,
                message: "Name can only contain letters",
              },
            })}
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email",
              },
            })}
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
            {...register("tableNumber", {
              required: "Table Number is required",
              min: { value: 1, message: "Table Number must be at least 1" },
              max: {
                value: 15,
                message: "Table Number must be between 1 and 15",
              },
              validate: (value) =>
                Number.isInteger(Number(value)) ||
                "Table Number must be a whole number",
            })}
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
            {...register("numberOfGuests", {
              required: "Number of Guests is required",
              min: { value: 1, message: "There must be at least 1 guest" },
              max: {
                value: 20,
                message:
                  "Maximum 20 guests allowed - write email for larger groups",
              },
              validate: (value) =>
                Number.isInteger(Number(value)) ||
                "Number of Guests must be a whole number",
            })}
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
            {...register("date", {
              required: "Date is required",
              validate: (value) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selected = new Date(value);
                return selected >= today || "Date cannot be in the past";
              },
            })}
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
            {...register("contactNumber", {
              required: "Contact Number is required",
              minLength: {
                value: 8,
                message: "Contact Number must be at least 8 digits",
              },
              maxLength: {
                value: 15,
                message: "Contact Number cannot exceed 15 digits",
              },
              pattern: {
                value: /^\+?\d+$/,
                message:
                  "Contact Number must contain only digits (and optional +)",
              },
            })}
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
            {...register("comments", {
              maxLength: {
                value: 1200,
                message: "Comments cannot exceed more than 1200 characters",
              },
            })}
            rows="10"
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

export default ReservationForm;
