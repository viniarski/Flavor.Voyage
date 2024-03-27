// src/app/recipes/[recipe_id]/page.js
"use client";

import PageHeader from "@/components/pageHeader";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import time from "../../../../public/icons/duration.png";
import serving from "../../../../public/icons/serving_size.png";
import Image from "next/image";
import Link from "next/link";
import RatingButtons from "@/components/RatingsButtons";
import RecipeCommentsSection from "@/components/RecipeComments";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

export default function Page({ params }) {
  const [recipes, setRecipes] = useState([]);
  const [ratings, setRatings] = useState([]);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await supabase
        .from("recipes")
        .select("*, users(username), categories(category_name)")
        .eq("recipe_id", `${params.recipe_id}`);
      setRecipes(data[0]);
    };
    const fetchRatings = async () => {
      const data = await supabase.from("ratings").select("*");
      // .eq('user_id', `${user?.id}`)
      // console.log(data)
      setRatings(data);
    };

    fetchRatings();
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-full flex flex-col items-center">
      <PageHeader
        header={`${recipes.recipe_title}`}
        description={`How to prepare and cook ${recipes.recipe_title}`}
        img={"url('/images/4.avif')"}
      />
      <div className="py-4 flex flex-col items-center gap-8">
        <div className="grid grid-cols-2 pt-16 gap-16">
          <Image
            src={recipes?.imgurl}
            className="rounded-3xl"
            alt="Chickpea"
            width={400}
            height={100}
          />
          <div>
            <div>
              <FacebookShareButton
                url={`https://flavor-voyage-five.vercel.app/blog-posts/${params.recipe_id}`}
              >
                <FacebookIcon size={32} round className="mb-4" />
              </FacebookShareButton>
              <TwitterShareButton
                url={`https://flavor-voyage-five.vercel.app/blog-posts/${params.recipe_id}`}
              >
                <TwitterIcon size={32} round className="ml-2 mb-4" />
              </TwitterShareButton>
              <PinterestShareButton
                url={`https://flavor-voyage-five.vercel.app/blog-posts/${params.recipe_id}`}
              >
                <PinterestIcon size={32} round className="ml-2 mb-4" />
              </PinterestShareButton>
              <WhatsappShareButton
                url={`https://flavor-voyage-five.vercel.app/blog-posts/${params.recipe_id}`}
              >
                <WhatsappIcon size={32} round className="ml-2 mb-4" />
              </WhatsappShareButton>
            </div>
            <div className="flex gap-4">
              <p className="text-md font-bold mb-2 text-accent">
                Uploaded:{" "}
                <span className="text-black font-normal">
                  {recipes.date_created}
                </span>
              </p>
              <p className="text-md font-bold mb-2 text-accent">
                By:{" "}
                <Link
                  // href={`/user-profile/${recipes.users?.username}`}
                  href={"#"}
                  className="text-black font-normal hover:underline"
                >
                  {recipes.users?.username}
                </Link>
              </p>
            </div>
            <h2 className="text-lg font-bold mb-2 text-accent">
              Category:{" "}
              <Link
                href={`/recipes/category/${recipes.category}`}
                className="text-black font-normal hover:underline"
              >
                {recipes.categories?.category_name}
              </Link>
            </h2>
            <div className="grid grid-cols-2 max-h-8 my-2">
              <div className="flex gap-2">
                <Image src={time} alt="duration" width={25} height={10} />
                <p>{recipes.preparation_time} Minutes</p>
              </div>
              <div className="flex gap-2">
                <Image src={serving} alt="duration" width={25} height={10} />
                <p>Serves {recipes.serving_size}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-accent">
                Ingredients:
              </h3>
              {recipes.recipe_ingredients?.map((ingredient, i) => (
                <li key={i} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[850px]">
          <h3 className="text-lg font-bold mb-2 text-accent">
            Cooking Instruction:
          </h3>
          <p className="text-lg whitespace-pre-line">
            {recipes.cooking_instructions}
          </p>
        </div>
      </div>
      <RatingButtons
        recipe_id={recipes.recipe_id}
        supabase={supabase}
        ratings={ratings.data}
      />

      <RecipeCommentsSection params={params} />
    </div>
  );
}
