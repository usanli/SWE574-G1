import { NextResponse } from "next/server";
import { getPostById } from "@/lib/post-api";

export async function GET(request, { params }) {
  try {
    const post = await getPostById(params.id);

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch the post" },
      { status: 404 }
    );
  }
}
