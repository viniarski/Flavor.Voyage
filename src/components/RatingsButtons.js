'use client'

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"

export default function RatingButtons({recipe_id, supabase, ratings}) {

    const {user} = useUser()
    // console.log(ratings)

    const [rate, setRate] = useState(0)

    const handleRating = async (e) => {

        e.preventDefault()
        // console.log(hasRate, rate)

        const userRating = ratings.filter(item => item.user_id === user.id)
        const existingRating = userRating[0]
        console.log(existingRating, rate)

        
        if (existingRating.rating == rate) {
            // CHECKING IF RATING  VALUTE IS THE SAME
            console.log('SAME RATING')
        
        } else if (existingRating != rate) {
            // CHECKING IF RATING VALUE IS DIFFERENT
            console.log('UPDATING')
            const data = await supabase
            .from('ratings')
            .update({rating: rate})
            .eq('id', `${existingRating.id}`)
            console.log(data)

        } else {
            // IF NONE OF THE ABOVE CREATE NEW RATING
            const data = await supabase.from("ratings").insert({
            user_id: user.id,
            recipe_id: recipe_id,
            rating: rate,
        });
        console.log(data)
        }
        
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