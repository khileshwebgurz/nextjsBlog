import dbConnect from "../../../../lib/mongodb";

import Post from "../../../../models/Post";

export async function POST(request) {
  await dbConnect();

  try {
    const { title, content, tags, image, slug } = await request.json();
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Data already exists in the database!",
        }),
        {
          status: 500,
        }
      );
    }

    const newPost = new Post({
      title,
      content,
      tags,
      slug,
      image,
    });

    await newPost.save();

    return new Response(JSON.stringify({ success: true, data: newPost }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}
