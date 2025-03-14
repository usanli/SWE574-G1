import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const { content, anonymous = false } = body;

    // In a real app, this would be stored in a database and include proper authentication
    // For now we'll just return a mock response

    const comment = {
      id: `new-comment-${Date.now()}`,
      mystery_id: params.id,
      author_id: "current-user-id", // This would come from authentication
      content,
      anonymous,
      created_at: new Date().toISOString(),
      votes: [],
    };

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
