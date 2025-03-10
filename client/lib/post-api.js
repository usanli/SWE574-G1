// Mock data for individual posts using the database structure provided
const MOCK_USERS = [
  {
    id: "user-1",
    username: "CuriousFinder",
    name: "Alex",
    surname: "Johnson",
    email: "alex@example.com",
    date_of_birth: "1985-06-15",
    profession: "Archeologist",
    bio: "Always on the hunt for interesting artifacts and mysterious objects.",
    country: "United States",
    profile_picture_url: "/placeholder.svg?height=40&width=40",
    badges: [],
    role: "user",
    suspended: false,
  },
  {
    id: "user-2",
    username: "HistoryBuff",
    name: "Emma",
    surname: "Wilson",
    email: "emma@example.com",
    date_of_birth: "1990-03-22",
    profession: "Historian",
    bio: "Fascinated by historical artifacts and their stories.",
    country: "United Kingdom",
    profile_picture_url: "/placeholder.svg?height=40&width=40",
    badges: [],
    role: "user",
    suspended: false,
  },
  {
    id: "user-3",
    username: "TechExplorer",
    name: "Michael",
    surname: "Chen",
    email: "michael@example.com",
    date_of_birth: "1988-11-10",
    profession: "Engineer",
    bio: "Interested in technological curiosities and electronic components.",
    country: "Canada",
    profile_picture_url: "/placeholder.svg?height=40&width=40",
    badges: [],
    role: "user",
    suspended: false,
  },
  {
    id: "user-4",
    username: "NatureWanderer",
    name: "Sophia",
    surname: "Garcia",
    email: "sophia@example.com",
    date_of_birth: "1992-08-05",
    profession: "Botanist",
    bio: "Always discovering unusual plants and natural phenomena.",
    country: "Spain",
    profile_picture_url: "/placeholder.svg?height=40&width=40",
    badges: [],
    role: "user",
    suspended: false,
  },
  {
    id: "user-5",
    username: "AntiquesExpert",
    name: "Robert",
    surname: "Miller",
    email: "robert@example.com",
    date_of_birth: "1975-12-18",
    profession: "Antiques Dealer",
    bio: "Specializing in identifying and valuing historical artifacts.",
    country: "United States",
    profile_picture_url: "/placeholder.svg?height=40&width=40",
    badges: ["expert"],
    role: "expert",
    suspended: false,
  },
];

const MOCK_MYSTERIES = [
  {
    id: "1",
    author_id: "user-1",
    title: "Strange metal object found in my backyard",
    description:
      "I was digging in my backyard to plant some flowers when I came across this unusual metal object buried about 10 inches deep in the soil. It appears to be made of brass or some similar alloy and has intricate patterns engraved on its surface.\n\nThe object is approximately 4 inches long and 2 inches wide, with a curved shape that suggests it might be part of something larger. There are no visible markings or text that would indicate its manufacturer or purpose.\n\nThe property where I found it was built in the 1920s, but I know this area has a history going back to colonial times. Could this be some kind of antique tool or decorative piece? Any help identifying this object would be greatly appreciated!",
    tags: ["Metal", "Antique", "Tool", "Historical"],
    location: "Boston, Massachusetts",
    attributes: {
      material: "Brass or similar alloy",
      dimensions: "4 inches x 2 inches",
      condition: "Slightly corroded",
      estimated_age: "Unknown",
    },
    images: {
      main: "/placeholder.svg?height=600&width=800",
      additional: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
    },
    solved_by: false,
    anonymous: false,
    deleted_at: null,
    created_at: "2023-11-28T14:30:00Z",
  },
  {
    id: "2",
    author_id: "user-4",
    title: "Unusual plant growing in my garden",
    description:
      "I've been gardening for over 15 years but have never seen a plant like this before. It started growing in my garden about three weeks ago and has been developing rapidly. The plant has unusual purple and green striped leaves and seems to be producing some kind of bulbous growth at the top.\n\nI live in a temperate climate and have not planted anything new in this area recently. None of my gardening books or plant identification apps have been able to identify it. I'm curious if it's a rare native species or possibly something invasive that I should be concerned about.\n\nThe plant is currently about 18 inches tall and seems to be thriving despite the recent dry weather. Has anyone seen something similar or can point me to resources for identifying unusual plants?",
    tags: ["Plant", "Garden", "Unusual", "Biological"],
    location: "Portland, Oregon",
    attributes: {
      height: "18 inches",
      leaf_color: "Purple and green striped",
      growth_rate: "Rapid",
      flowering: "Unknown",
    },
    images: {
      main: "/placeholder.svg?height=600&width=800",
      additional: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
    },
    solved_by: true,
    anonymous: false,
    deleted_at: null,
    created_at: "2023-11-27T09:15:00Z",
  },
  {
    id: "3",
    author_id: "user-3",
    title: "Electronic component found in old equipment",
    description:
      "I was dismantling an old piece of electronic equipment from the 1970s when I came across this unusual component. It's cylindrical in shape with several pins emerging from one end and has markings that I don't recognize.\n\nThe component is approximately 1 inch long and has a copper-colored exterior with a glass section in the middle. There's a series of numbers and letters etched on the side that read 'KR-7249-B', but searches for this identifier haven't returned any useful information.\n\nI'm wondering if this might be some specialized component used in scientific or military equipment. The device I found it in was part of a lot of surplus equipment I purchased at an estate sale, with no information about its origin or purpose. Any insights from electronics experts would be greatly appreciated!",
    tags: ["Electronic", "Circuit", "Component", "Technological"],
    location: "Austin, Texas",
    attributes: {
      material: "Copper and glass",
      dimensions: "1 inch length",
      markings: "KR-7249-B",
      origin: "1970s equipment",
    },
    images: {
      main: "/placeholder.svg?height=600&width=800",
      additional: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
    },
    solved_by: false,
    anonymous: false,
    deleted_at: null,
    created_at: "2023-11-26T18:45:00Z",
  },
  {
    id: "4",
    author_id: "user-4",
    title: "Mysterious rock formation on hiking trail",
    description:
      "During a recent hiking trip in the mountains, I came across this strange rock formation that stood out from everything else in the area. The rocks appear to be arranged in an almost perfect circular pattern, with a diameter of roughly 15 feet.\n\nWhat makes this formation particularly interesting is that the stones seem to be of a different type than most of the surrounding geological features. They have a distinctive reddish hue and some unusual marking patterns that almost look like symbols or glyphs.\n\nThe formation is located at an elevation of approximately 3,000 feet on the eastern slope of the mountain. There are no signs of recent human activity in the area, and the remote location makes it unlikely that this is a modern construction.\n\nI'm curious if this could be a natural geological phenomenon, an ancient human-made structure, or perhaps something created by more recent visitors to the area that has been weathered by the elements. Any geologists or archaeologists who might have insights?",
    tags: ["Geology", "Nature", "Rock", "Outdoor"],
    location: "Blue Ridge Mountains, Virginia",
    attributes: {
      formation_type: "Circular",
      diameter: "15 feet",
      rock_color: "Reddish",
      elevation: "3,000 feet",
    },
    images: {
      main: "/placeholder.svg?height=600&width=800",
      additional: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
    },
    solved_by: false,
    anonymous: false,
    deleted_at: null,
    created_at: "2023-11-25T11:20:00Z",
  },
  {
    id: "5",
    author_id: "user-2",
    title: "Vintage kitchen tool from grandmother's collection",
    description:
      "I've been going through my grandmother's collection of kitchen tools and came across this unusual item that I can't identify. It appears to be made of cast iron and has a crank handle on one side and what looks like a series of small blades or teeth inside a cylindrical chamber.\n\nMy grandmother was born in 1920 and was an avid cook and baker throughout her life. She collected many specialty tools and appliances, often from farm auctions and estate sales in the rural Midwest.\n\nThe tool measures about 8 inches in length and 4 inches in height. There's a clamp at the base that suggests it was meant to be attached to a countertop or table. There's a small manufacturer's mark that reads 'Wilson & Co. 1895' but I haven't been able to find any information about this company or their products.\n\nI'm interested in learning what this tool was used for and how it might have been part of my grandmother's cooking routine. Any vintage kitchen tool enthusiasts out there who might recognize this?",
    tags: ["Kitchen", "Vintage", "Tool", "Antique"],
    location: "Iowa",
    attributes: {
      material: "Cast iron",
      dimensions: "8 inches x 4 inches",
      manufacturer: "Wilson & Co. 1895",
      condition: "Well preserved",
    },
    images: {
      main: "/placeholder.svg?height=600&width=800",
      additional: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
    },
    solved_by: true,
    anonymous: false,
    deleted_at: null,
    created_at: "2023-11-24T15:10:00Z",
  },
  {
    id: "6",
    author_id: "user-2",
    title: "Strange symbol on an old coin",
    description:
      "I recently acquired a collection of old coins at an estate sale, and one particular coin has me puzzled. It appears to be quite old, possibly ancient, with a worn surface and irregular edges. The metal seems to be silver or a silver alloy based on its color and weight.\n\nWhat intrigues me most is the symbol stamped on one side: a complex geometric pattern that resembles a star with seven points, surrounded by what might be characters in an alphabet I don't recognize. The other side has what appears to be a profile of a human face, but it's too worn to make out clear details.\n\nThe coin is approximately the size of a modern quarter (about 24mm in diameter) but is thicker and heavier. I've shown it to a local coin shop owner who wasn't able to identify it but suggested it might be from the Middle East or Central Asia.\n\nI'm fascinated by numismatics and would love to know the origin, age, and significance of this coin. Could it be a rare historical artifact or perhaps something more common that I'm simply unfamiliar with? Any coin experts or historians who might be able to shed light on this mystery?",
    tags: ["Coin", "Symbol", "History", "Antique"],
    location: "Unknown origin",
    attributes: {
      material: "Silver or silver alloy",
      diameter: "24mm",
      age: "Unknown, possibly ancient",
      symbols: "Seven-pointed star design",
    },
    images: {
      main: "/placeholder.svg?height=600&width=800",
      additional: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
      ],
    },
    solved_by: false,
    anonymous: false,
    deleted_at: null,
    created_at: "2023-11-23T13:25:00Z",
  },
];

// Generate mock comments for each mystery with categories and replies
const generateComments = (mysteryId, authorId) => {
  const commentTypes = ["guess", "discussion", "hint", "expert", "question"];
  const numberOfComments = Math.floor(Math.random() * 8) + 3; // 3-10 comments
  const comments = [];
  const userIds = MOCK_USERS.map((user) => user.id);

  for (let i = 0; i < numberOfComments; i++) {
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    const commentUser = MOCK_USERS.find((user) => user.id === randomUserId);

    // Determine comment type
    let commentType;
    if (randomUserId === "user-5") {
      // Expert user more likely to post expert answers
      commentType =
        Math.random() > 0.3
          ? "expert"
          : commentTypes[Math.floor(Math.random() * commentTypes.length)];
    } else {
      commentType =
        commentTypes[Math.floor(Math.random() * commentTypes.length)];
    }

    const commentId = `comment-${mysteryId}-${i}`;

    const comment = {
      id: commentId,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: randomUserId,
      content: getCommentContent(commentType, mysteryId),
      category: commentType,
      anonymous: Math.random() > 0.9, // 10% chance of anonymous
      is_reply: false,
      featured: commentType === "expert" || Math.random() > 0.8, // Expert comments or 20% chance
      created_at: new Date(
        Date.now() - Math.random() * 10000000000
      ).toISOString(),
      author: {
        username: commentUser.username,
        profile_picture_url: commentUser.profile_picture_url,
      },
      votes: Array(Math.floor(Math.random() * 15))
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-${i}-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: commentId,
          type: Math.random() > 0.3 ? "upvote" : "downvote",
        })),
    };

    comments.push(comment);

    // Add replies (30% chance for each comment)
    if (Math.random() > 0.7) {
      const numberOfReplies = Math.floor(Math.random() * 3) + 1; // 1-3 replies

      for (let j = 0; j < numberOfReplies; j++) {
        const replyUserId = userIds[Math.floor(Math.random() * userIds.length)];
        const replyUser = MOCK_USERS.find((user) => user.id === replyUserId);

        const replyId = `reply-${commentId}-${j}`;

        const reply = {
          id: replyId,
          mystery_id: mysteryId,
          parent_id: commentId,
          author_id: replyUserId,
          content: getReplyContent(commentType),
          category: commentType, // Replies have same category as parent
          anonymous: Math.random() > 0.9,
          is_reply: true,
          featured: false,
          created_at: new Date(
            Date.now() - Math.random() * 5000000000
          ).toISOString(),
          author: {
            username: replyUser.username,
            profile_picture_url: replyUser.profile_picture_url,
          },
          votes: Array(Math.floor(Math.random() * 5))
            .fill()
            .map((_, k) => ({
              id: `vote-${replyId}-${k}`,
              voter: userIds[Math.floor(Math.random() * userIds.length)],
              comment_id: replyId,
              type: Math.random() > 0.3 ? "upvote" : "downvote",
            })),
        };

        comments.push(reply);
      }
    }
  }

  return comments;
};

// Helper function to generate realistic comment content based on type
function getCommentContent(type, mysteryId) {
  const mysteryType =
    MOCK_MYSTERIES.find((m) => m.id === mysteryId)?.tags[0] || "object";

  switch (type) {
    case "guess":
      return `I think this ${mysteryType.toLowerCase()} might be a ${
        ["vintage", "antique", "rare", "common", "unusual"][
          Math.floor(Math.random() * 5)
        ]
      } ${mysteryType.toLowerCase()} from the ${
        ["18th", "19th", "early 20th", "mid-20th"][
          Math.floor(Math.random() * 4)
        ]
      } century. I've seen similar items in museums and historical collections.`;

    case "discussion":
      return `This is really interesting! The design reminds me of something I saw in a book about historical artifacts. The patterns and materials used suggest it might have had a specific purpose related to ${
        [
          "daily life",
          "ceremonial activities",
          "specialized work",
          "decorative arts",
        ][Math.floor(Math.random() * 4)]
      }.`;

    case "hint":
      return `If you look closely at the ${
        ["markings", "design", "material", "shape"][
          Math.floor(Math.random() * 4)
        ]
      }, you might notice that it's characteristic of items from the ${
        [
          "Victorian era",
          "Colonial period",
          "Industrial Revolution",
          "post-war era",
        ][Math.floor(Math.random() * 4)]
      }. This could help narrow down your search.`;

    case "expert":
      return `Based on my experience as a specialist in this field, I can confirm this is a ${mysteryType.toLowerCase()} typically used for ${
        [
          "household tasks",
          "specialized crafts",
          "religious ceremonies",
          "scientific measurements",
        ][Math.floor(Math.random() * 4)]
      } during the ${
        ["18th", "19th", "early 20th", "mid-20th"][
          Math.floor(Math.random() * 4)
        ]
      } century. The distinctive ${
        ["pattern", "shape", "material composition", "markings"][
          Math.floor(Math.random() * 4)
        ]
      } is a clear indicator of its origin and purpose.`;

    case "question":
      return `Have you tried ${
        [
          "checking for maker's marks",
          "researching local historical societies",
          "consulting with a museum curator",
          "looking in specialized reference books",
        ][Math.floor(Math.random() * 4)]
      }? Also, can you provide more details about ${
        [
          "where exactly it was found",
          "any additional markings",
          "the exact dimensions",
          "the material it seems to be made of",
        ][Math.floor(Math.random() * 4)]
      }?`;

    default:
      return `Interesting find! Thanks for sharing this with the community.`;
  }
}

// Helper function to generate realistic reply content
function getReplyContent(parentType) {
  switch (parentType) {
    case "guess":
      return `I think you might be right about the time period, but I'm not convinced about the specific use you suggested. The design elements seem more consistent with ${
        ["decorative", "utilitarian", "ceremonial", "educational"][
          Math.floor(Math.random() * 4)
        ]
      } purposes.`;

    case "discussion":
      return `That's a great observation! I'd also add that the ${
        ["craftsmanship", "materials", "design elements", "preservation state"][
          Math.floor(Math.random() * 4)
        ]
      } suggests it was probably made by a ${
        [
          "skilled artisan",
          "factory production",
          "amateur craftsperson",
          "specialized workshop",
        ][Math.floor(Math.random() * 4)]
      }.`;

    case "hint":
      return `Thanks for the hint! I'll definitely look into that period more closely. Do you know of any good resources or references that might help with identification?`;

    case "expert":
      return `Thank you for sharing your expertise! Would you happen to know if these items are rare or relatively common? And would it have any significant value to collectors?`;

    case "question":
      return `That's a good suggestion. I'll try that approach and report back if I find anything. I appreciate the help!`;

    default:
      return `Thanks for your input on this. It's really helpful to get different perspectives.`;
  }
}

// Generate mock votes for each mystery
const generateVotes = (mysteryId) => {
  const numberOfVotes = Math.floor(Math.random() * 50) + 10;
  const votes = [];
  const userIds = MOCK_USERS.map((user) => user.id);

  for (let i = 0; i < numberOfVotes; i++) {
    votes.push({
      id: `vote-${mysteryId}-${i}`,
      voter: userIds[Math.floor(Math.random() * userIds.length)],
      mystery_id: mysteryId,
      type: Math.random() > 0.2 ? "upvote" : "downvote",
    });
  }

  return votes;
};

// Enrich mock mysteries with comments and votes
const enrichedMysteries = MOCK_MYSTERIES.map((mystery) => {
  const author = MOCK_USERS.find((user) => user.id === mystery.author_id);
  return {
    ...mystery,
    author,
    comments: generateComments(mystery.id, mystery.author_id),
    votes: generateVotes(mystery.id),
  };
});

// API functions
export async function getPostById(postId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const post = enrichedMysteries.find((mystery) => mystery.id === postId);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
}

export async function getSimilarPosts(postId, tags, limit = 3) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const similarPosts = enrichedMysteries
    .filter(
      (mystery) =>
        mystery.id !== postId && mystery.tags.some((tag) => tags.includes(tag))
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);

  return similarPosts;
}

export { MOCK_USERS, MOCK_MYSTERIES, enrichedMysteries };
