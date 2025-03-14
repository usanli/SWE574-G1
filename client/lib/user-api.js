import { MOCK_USERS } from "./post-api";
import { enrichedMysteries } from "./post-api";

// Get user by username
export async function getUserByUsername(username) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Find the user
  const user = MOCK_USERS.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (!user) {
    throw new Error("User not found");
  }

  // Add created_at if it doesn't exist
  if (!user.created_at) {
    user.created_at = "2023-01-01T00:00:00Z";
  }

  return user;
}

// Get user submissions
export async function getUserSubmissions(userId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Find all mysteries submitted by the user
  const submissions = enrichedMysteries.filter(
    (mystery) => mystery.author_id === userId
  );

  return submissions;
}

// Get user comments
export async function getUserComments(userId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Collect all comments from all mysteries
  const allComments = [];

  enrichedMysteries.forEach((mystery) => {
    if (!mystery.comments) return;

    const userComments = mystery.comments.filter(
      (comment) => comment.author_id === userId
    );

    // Add mystery title to each comment for context
    userComments.forEach((comment) => {
      allComments.push({
        ...comment,
        mystery_title: mystery.title,
      });
    });
  });

  // Sort by date (newest first)
  allComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return allComments;
}

// Get user badges and achievements
export async function getUserBadges(userId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = MOCK_USERS.find((user) => user.id === userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user.badges || [];
}
