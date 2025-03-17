import { authService } from "./api-service";

// Get current authenticated user
export async function getCurrentUserProfile() {
  try {
    return await authService.getCurrentUser();
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

// Get user by username
export async function getUserByUsername(username) {
  try {
    // Check if this is the current user first
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser && currentUser.username === username) {
          return currentUser;
        }
      } catch (error) {
        console.warn(
          "Could not fetch current user, falling back to mock data",
          error
        );
      }
    } else {
      console.warn("No auth token found in localStorage");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);

    // Create a fallback user with minimal data if this is the current user's profile
    const savedUsername = localStorage.getItem("username");
    if (
      savedUsername &&
      savedUsername.toLowerCase() === username.toLowerCase()
    ) {
      return {
        id: "current-user",
        username: username,
        created_at: new Date().toISOString(),
        badges: [],
      };
    }

    throw error;
  }
}

// Get user submissions
export async function getUserSubmissions(userId) {
  console.log("Fetching real submissions for user:", userId);

  // Check if we're looking at the current user's submissions
  const token = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  if (token) {
    try {
      // Try to fetch real submissions from the backend
      const response = await fetch("http://localhost:8000/mysteries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user submissions");
      }

      const mysteries = await response.json();
      console.log("All fetched mysteries:", mysteries);

      // Get current username from localStorage
      if (!username) {
        console.warn("No username found in localStorage");
      }

      // For the current user, don't filter by author ID since the backend might use different IDs
      // Instead, show all posts for the current user
      return mysteries;
    } catch (error) {
      console.error("Error fetching real user submissions:", error);
      // Return empty array if API fails
      return [];
    }
  }
}

// Get user comments
export async function getUserComments(userId) {
  // Check if we're looking at the current user's comments
  const token = localStorage.getItem("authToken");

  // If this is the authenticated user, don't return mock data
  if (token && (userId === "current-user" || userId === "temp-id")) {
    // For a real implementation, this would call the backend API
    // For now, return an empty array to indicate no comments
    return [];
  }

  // For other users, return mock data
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
