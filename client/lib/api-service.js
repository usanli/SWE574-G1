// API service for connecting to the backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Helper function for making API requests
async function fetchFromApi(endpoint, options = {}) {
  const token = localStorage.getItem("authToken");

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Add authorization header if token exists
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // For debugging
  console.log(
    `Making ${options.method || "GET"} request to ${API_URL}${endpoint}`
  );

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    // Handle unauthorized responses (expired token)
    if (response.status === 401) {
      localStorage.removeItem("authToken");
      throw new Error("Authentication expired. Please login again.");
    }

    // Handle other error responses
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ detail: "Unknown error" }));
      throw new Error(errorData.detail || "Something went wrong");
    }

    // For endpoints that may not return JSON
    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Authentication APIs
export const authService = {
  // User login
  async login(username, password) {
    try {
      // The backend expects username, not email
      const response = await fetchFromApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Save token to localStorage
      if (response.access_token) {
        localStorage.setItem("authToken", response.access_token);
        console.log("Token saved after login");
      } else {
        console.warn("No token received from login response");
      }

      return response;
    } catch (error) {
      console.error("Login request failed:", error);
      throw error;
    }
  },

  // User registration
  async register(username, email, password) {
    try {
      // Use the username provided by the user
      const response = await fetchFromApi("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      // Some backends return a token directly after registration
      if (response.access_token) {
        localStorage.setItem("authToken", response.access_token);
        console.log("Token saved after registration");
      } else {
        // If no token is returned, we can try to log in immediately
        console.log("No token in registration response, attempting login");
        try {
          const loginResponse = await this.login(username, password);
          // Merge the login response with the registration response
          return { ...response, ...loginResponse };
        } catch (loginError) {
          console.warn("Auto-login after registration failed:", loginError);
          // Continue with registration response even if auto-login fails
        }
      }

      return response;
    } catch (error) {
      console.error("Registration request failed:", error);
      throw error;
    }
  },

  // Get current user profile
  async getCurrentUser() {
    try {
      return await fetchFromApi("/users/me");
    } catch (error) {
      console.error("Failed to get current user:", error);
      throw error;
    }
  },

  // Logout (client-side only for now)
  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
  },
};

// Mystery/Post APIs
export const postService = {
  // Get all posts with filtering options
  async getPosts(
    page = 1,
    limit = 9,
    sortBy = "recent",
    filter = "all",
    searchQuery = ""
  ) {
    // Updated to match backend route structure
    let url = `/mysteries?skip=${(page - 1) * limit}&limit=${limit}`;

    // Backend filtering would be implemented here
    // For now, we fetch all and filter client-side if needed

    const response = await fetchFromApi(url);

    // Map backend response to frontend post format
    const posts = response.map((mystery) => ({
      id: mystery.id,
      title: mystery.title,
      description: mystery.description,
      image: mystery.images?.main || "/placeholder.svg",
      tags: mystery.tags || [],
      upvotes: mystery.votes?.filter((v) => v.type === "upvote").length || 0,
      downvotes:
        mystery.votes?.filter((v) => v.type === "downvote").length || 0,
      commentCount: mystery.comments?.length || 0,
      status: mystery.solved_by ? "solved" : "unsolved",
      createdAt: mystery.created_at,
      author: {
        name: mystery.anonymous
          ? "Anonymous"
          : mystery.author?.username || "Unknown",
        avatar: mystery.anonymous
          ? "/placeholder.svg"
          : mystery.author?.profile_picture_url || "/placeholder.svg",
      },
    }));

    // Apply client-side filtering if needed
    let filteredPosts = [...posts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by status
    if (filter === "solved") {
      filteredPosts = filteredPosts.filter((post) => post.status === "solved");
    } else if (filter === "unsolved") {
      filteredPosts = filteredPosts.filter(
        (post) => post.status === "unsolved"
      );
    }

    // Client-side sorting (ideally this would be done by backend)
    switch (sortBy) {
      case "recent":
        filteredPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "popular":
        filteredPosts.sort(
          (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
        );
        break;
    }

    return {
      posts: filteredPosts.slice(0, limit),
      hasMore: filteredPosts.length > limit,
      total: filteredPosts.length,
    };
  },

  // Get single post by ID
  async getPostById(id) {
    const mystery = await fetchFromApi(`/mysteries/${id}`);

    // Map backend mystery to frontend post format
    return {
      id: mystery.id,
      title: mystery.title,
      description: mystery.description,
      image: mystery.images?.main || "/placeholder.svg",
      images: mystery.images || {},
      tags: mystery.tags || [],
      upvotes: mystery.votes?.filter((v) => v.type === "upvote").length || 0,
      downvotes:
        mystery.votes?.filter((v) => v.type === "downvote").length || 0,
      commentCount: mystery.comments?.length || 0,
      comments: mystery.comments || [],
      status: mystery.solved_by ? "solved" : "unsolved",
      createdAt: mystery.created_at,
      author: {
        name: mystery.anonymous
          ? "Anonymous"
          : mystery.author?.username || "Unknown",
        avatar: mystery.anonymous
          ? "/placeholder.svg"
          : mystery.author?.profile_picture_url || "/placeholder.svg",
      },
      // Include other detailed properties needed for post page
      parts: mystery.parts || [],
      location: mystery.location,
      measurements: mystery.measurements || {},
    };
  },

  // Create new post
  async createPost(postData) {
    return fetchFromApi("/mysteries", {
      method: "POST",
      body: JSON.stringify(postData),
    });
  },

  // Update post
  async updatePost(id, postData) {
    return fetchFromApi(`/mysteries/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    });
  },

  // Delete post
  async deletePost(id) {
    return fetchFromApi(`/mysteries/${id}`, {
      method: "DELETE",
    });
  },

  // Vote on post
  async voteOnPost(id, voteType) {
    // Assuming the backend has an endpoint for voting
    // You might need to adapt this based on your actual backend implementation
    return fetchFromApi(`/mysteries/${id}/vote`, {
      method: "POST",
      body: JSON.stringify({ type: voteType }),
    });
  },
};

// Comments APIs
export const commentService = {
  // Get comments for a post
  async getComments(postId) {
    return fetchFromApi(`/mysteries/${postId}/comments`);
  },

  // Add comment to a post
  async addComment(postId, content) {
    return fetchFromApi("/comments", {
      method: "POST",
      body: JSON.stringify({
        mystery_id: postId,
        content,
      }),
    });
  },

  // Update comment
  async updateComment(commentId, content) {
    return fetchFromApi(`/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    });
  },

  // Delete comment
  async deleteComment(commentId) {
    return fetchFromApi(`/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};

// User profile APIs
export const userService = {
  // Get user profile by ID
  async getUserProfile(userId) {
    return fetchFromApi(`/users/${userId}`);
  },

  // Update user profile
  async updateUserProfile(userData) {
    return fetchFromApi(`/users/${userData.id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },
};
