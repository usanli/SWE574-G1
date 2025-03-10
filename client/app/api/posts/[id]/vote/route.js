import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const { type } = body; // "upvote" or "downvote"

    // In a real app, this would be stored in a database
    // For now we'll just return a success response

    return NextResponse.json({
      success: true,
      message: `Vote of type ${type} recorded for post ${params.id}`,
    });
  } catch (error) {
    console.error("Error voting on post:", error);
    return NextResponse.json(
      { error: "Failed to register vote" },
      { status: 500 }
    );
  }
}
