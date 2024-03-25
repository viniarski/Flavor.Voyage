import RatingButtons from "./RatingsButtons"
import { auth, useUser } from "@clerk/nextjs"
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function Ratings(recipe_id) {
    

    const [rating, setRating] = useState([])

    useEffect(() => {
        const fetchRatings = async () => {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            const supabase = createClient(supabaseUrl, supabaseAnonKey);

            const { data } = await supabase
                .from('ratings')
                .select("*")
                .eq('user_id', `${userId}`)
                .eq('recipe_id', `${recipe_id}`)
                .range(0);

            console.log(data[0])
            setRating(data)
        };
    }, [])
    
    return (
        <>
            <RatingButtons
            recipe_id={recipe_id}
            />
        </>
    )
}