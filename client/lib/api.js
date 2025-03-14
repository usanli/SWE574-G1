// Mock data for posts since the API endpoint is not set up yet
import { enrichedMysteries } from "./post-api";

export const MOCK_POSTS = enrichedMysteries.map((mystery) => {
  // Generate a random number of downvotes (between 0 and half the upvotes)
  const upvotes = mystery.votes.filter((vote) => vote.type === "upvote").length;
  const randomDownvotes = Math.floor(Math.random() * (upvotes / 2 + 1));

  return {
    id: mystery.id,
    title: mystery.title,
    description: mystery.description,
    image: mystery.images.main,
    tags: mystery.tags,
    upvotes: upvotes,
    downvotes: randomDownvotes,
    commentCount: mystery.comments.length,
    status: mystery.solved_by ? "solved" : "unsolved",
    createdAt: mystery.created_at,
    author: {
      name: mystery.anonymous ? "Anonymous" : mystery.author.username,
      avatar: mystery.anonymous
        ? "/placeholder.svg?height=40&width=40"
        : mystery.author.profile_picture_url,
    },
  };
});

// Function to simulate fetching posts from an API
export async function getPosts(
  page = 1,
  limit = 9,
  sortBy = "recent",
  filter = "all",
  searchQuery = ""
) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredPosts = [...MOCK_POSTS];

  // Filter by search query if provided
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Filter posts based on status
  if (filter === "solved") {
    filteredPosts = filteredPosts.filter((post) => post.status === "solved");
  } else if (filter === "unsolved") {
    filteredPosts = filteredPosts.filter((post) => post.status === "unsolved");
  }

  // Sort posts based on sortBy parameter
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
    default:
      filteredPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  }

  // Paginate results
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // For demo purposes, we'll return hasMore as false when we've shown all posts
  const hasMore = endIndex < filteredPosts.length;

  return {
    posts: paginatedPosts,
    hasMore,
    total: filteredPosts.length,
  };
}

// Get all available categories from posts
export function getCategories() {
  const categoriesSet = new Set();

  MOCK_POSTS.forEach((post) => {
    post.tags.forEach((tag) => {
      categoriesSet.add(tag);
    });
  });

  return Array.from(categoriesSet);
}
