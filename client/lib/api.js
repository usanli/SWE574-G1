// Mock data for posts since the API endpoint is not set up yet
import { enrichedMysteries } from "./post-api";

export const MOCK_POSTS = enrichedMysteries.map((mystery) => ({
  id: mystery.id,
  title: mystery.title,
  image: mystery.images.main,
  tags: mystery.tags,
  upvotes: mystery.votes.filter((vote) => vote.type === "upvote").length,
  commentCount: mystery.comments.length,
  status: mystery.solved_by ? "solved" : "unsolved",
  createdAt: mystery.created_at,
  author: {
    name: mystery.anonymous ? "Anonymous" : mystery.author.username,
    avatar: mystery.anonymous
      ? "/placeholder.svg?height=40&width=40"
      : mystery.author.profile_picture_url,
  },
}));

// Function to simulate fetching posts from an API
export async function getPosts(
  page = 1,
  limit = 6,
  sortBy = "recent",
  category = "all"
) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredPosts = [...MOCK_POSTS];

  // Filter by category if not 'all'
  if (category !== "all") {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
    );
  }

  // Sort posts based on sortBy parameter
  switch (sortBy) {
    case "recent":
      filteredPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case "solved":
      filteredPosts = filteredPosts.filter((post) => post.status === "solved");
      break;
    case "most-discussed":
      filteredPosts.sort((a, b) => b.commentCount - a.commentCount);
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
