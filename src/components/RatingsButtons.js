'use client'

import { useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function RatingButtons({recipe_id, supabase}) {

    const user = useUser()
    console.log(supabase)

    const [rate, setRate] = useState(0)

    const handleRating = async (e) => {
        e.preventDefault()
        // console.log(rate)

        // if (user.isSignedIn) {
            // console.log(user.user.id, recipe_id.recipe_id, rate)
            await supabase.from("ratings").insert({
                user_id: user.user.id,
                recipe_id: recipe_id.recipe_id,
                vote: rate,
            });
    }

    return (
        <form className="rating rating-lg" onChange={(e) => setRate(e.target.value)} onSubmit={handleRating}>
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ee6f57]" value={1} />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ee6f57]" value={2} />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ee6f57]" value={3} />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ee6f57]" value={4} />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ee6f57]" value={5} />
            <button type="submit">Submit</button>
        </form>
    )
}