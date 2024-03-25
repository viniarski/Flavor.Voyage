"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs";

export async function handleSaveComment(formData, params) {
  const user = await currentUser();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const comment = formData.get("blog_comment");

  await supabase.from("blog_comments").insert({
    blog_comment: "blog_comment",
    user_id: user.id,
    blog_id: `${params.blog_id}`,
  });

  revalidatePath(`/blog-posts/${params.id}`);
  redirect(`/blog-posts/${params.id}`);
}
