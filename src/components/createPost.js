"use client";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const CreateButton = ({ redirect, buttonText }) => {
  const { user } = useUser();
  const router = useRouter();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const setUserDetails = async (event) => {
    event.preventDefault();

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
    router.push(`${redirect}`);
  };

  return (
    <div className="flex items-center mt-4">
      <form onSubmit={setUserDetails}>
        <button
          type="submit"
          className="bg-accent text-lg text-white px-4 py-2 rounded-md hover:scale-105 active:scale-100 transition transform duration-200 ease-in-out"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default CreateButton;
