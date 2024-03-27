"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function RatingButtons({ recipe_id, supabase, ratings }) {
  const { user } = useUser();
  // console.log(ratings)

  const [rate, setRate] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = async (e) => {
    e.preventDefault();
    // console.log(hasRate, rate)
    let username;
    if (user && user.username) {
      username = user.username;
    } else if (user && user.firstName && user.lastName) {
      username = `${user.firstName} ${user.lastName}`;
    } else {
      username = "Anonymous";
    }
    const userId = user.id;
    const profilepic = user.imageUrl;

    await supabase.from("users").insert({
      user_id: userId,
      profilepic: profilepic,
      username: username,
    });

    const userRating = ratings.filter((item) => item.user_id === user.id);
    const existingRating = userRating[0];
    // console.log(existingRating, rate)

    if (existingRating.rating == rate) {
      // CHECKING IF RATING  VALUTE IS THE SAME
      console.log("SAME RATING");
    } else if (existingRating != rate) {
      // CHECKING IF RATING VALUE IS DIFFERENT
      console.log("UPDATING");
      const data = await supabase
        .from("ratings")
        .update({ rating: rate })
        .eq("id", `${existingRating.id}`);
      // console.log(data)
      if (data.status === 204) {
        setSubmitted(true);
      }
    } else {
      // IF NONE OF THE ABOVE CREATE NEW RATING
      console.log("CREATING RATING");
      const data = await supabase.from("ratings").insert({
        user_id: user.id,
        recipe_id: recipe_id,
        rating: rate,
      });
      // console.log(data)
      if (data.status === 201) {
        setSubmitted(true);
        console.log(submitted);
      }
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center gap-4">
      <p className="text-2xl text-accent font-bold">
        What do you think of this recipe?
      </p>
      <form
        className="flex flex-col rating rating-lg gap-4 items-center"
        onChange={(e) => setRate(e.target.value)}
        onSubmit={handleRating}
      >
        <div className="flex gap-4">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-[#ee6f57] hover:scale-125 active:scale-100 transition transform duration-200 ease-in-out"
            value={1}
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-[#ee6f57] hover:scale-125 active:scale-100 transition transform duration-200 ease-in-out"
            value={2}
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-[#ee6f57] hover:scale-125 active:scale-100 transition transform duration-200 ease-in-out"
            value={3}
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-[#ee6f57] hover:scale-125 active:scale-100 transition transform duration-200 ease-in-out"
            value={4}
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-[#ee6f57] hover:scale-125 active:scale-100 transition transform duration-200 ease-in-out"
            value={5}
          />
        </div>
        {!submitted ? (
          <button
            type="submit"
            className="px-4 py-2 text-white bg-accent rounded-md hover:bg-accent-dark focus:outline-none"
          >
            Submit
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 text-white bg-accent rounded-md hover:bg-accent-dark focus:outline-none"
            disabled
          >
            Submitted
          </button>
        )}
      </form>
    </div>
  );
}
