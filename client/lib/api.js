// Mock data for posts since the API endpoint is not set up yet
export const MOCK_POSTS = [
  {
    id: "1",
    title: "What is this strange metal object I found in my backyard?",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Metal", "Antique", "Tool"],
    upvotes: 42,
    commentCount: 15,
    status: "unsolved",
    createdAt: "2023-11-28T14:30:00Z",
    author: {
      name: "CuriousFinder",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    title: "Can anyone identify this unusual plant growing in my garden?",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Plant", "Garden", "Unusual"],
    upvotes: 28,
    commentCount: 7,
    status: "solved",
    createdAt: "2023-11-27T09:15:00Z",
    author: {
      name: "GreenThumb",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "3",
    title: "Found this electronic component - what could it be from?",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Electronic", "Circuit", "Component"],
    upvotes: 35,
    commentCount: 22,
    status: "unsolved",
    createdAt: "2023-11-26T18:45:00Z",
    author: {
      name: "TechExplorer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "4",
    title: "Mysterious rock formation spotted during my hike",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Geology", "Nature", "Rock"],
    upvotes: 56,
    commentCount: 18,
    status: "unsolved",
    createdAt: "2023-11-25T11:20:00Z",
    author: {
      name: "NatureWanderer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "5",
    title: "What is this vintage kitchen tool used for?",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Kitchen", "Vintage", "Tool"],
    upvotes: 39,
    commentCount: 12,
    status: "solved",
    createdAt: "2023-11-24T15:10:00Z",
    author: {
      name: "RetroCollector",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "6",
    title: "Strange symbol found on an old coin - any numismatists here?",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Coin", "Symbol", "History"],
    upvotes: 47,
    commentCount: 9,
    status: "unsolved",
    createdAt: "2023-11-23T13:25:00Z",
    author: {
      name: "HistoryBuff",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
];

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
