
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Newsletter() {

    const [email, setEmail] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false); 

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const handleNewsletter = async (event) => {
    event.preventDefault();

    console.log(email)

    const data = await supabase.from("newsletter").insert({
      email: email,
    });

    console.log(data.status)

    if (data.status === 201) {
        setIsSubmitted(true)
    }

    // router.push("/blog-posts");
  };

    return (
        <div>
            {!isSubmitted ? (
                <form onChange={(e) => setEmail(e.target.value)} onSubmit={handleNewsletter}>
                    <div className="flex">
                        <input
                        aria-label="Subscribtion Section"
                        type="email"
                        id='email'
                        name='email'
                        placeholder="Your email"
                        className="w-full px-4 py-2 text-gray-800 bg-white rounded-l-md focus:outline-none"
                        />
                        <button
                        type="submit"
                        className="px-4 py-2 text-white bg-accent rounded-r-md hover:bg-accent-dark focus:outline-none"
                        >
                        Subscribe
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <div className="flex">
                        <input
                        type='text'
                        value={'Successfully subscribed to newsletter'}
                        placeholder="Your email"
                        className="w-full text-center px-4 py-2 text-gray-800 bg-white rounded-l-md focus:outline-none"
                        />
                        <button
                        type="submit"
                        className="px-4 py-2 text-white bg-[#f6a697] rounded-r-md hover:bg-accent-dark focus:outline-none"
                        disabled
                        >
                        Subscribe
                        </button>
                    </div>
                </div>
            )}
            
        </div>
        
    )
}