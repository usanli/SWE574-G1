// This file contains mock data for the application
// It serves as a fallback if the real API is not available

// Mock users
export const MOCK_USERS = [
  {
    id: "user-1",
    username: "JaneSmith",
    name: "Jane Smith",
    email: "jane@example.com",
    profile_picture_url: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-2",
    username: "JohnDoe",
    name: "John Doe",
    email: "john@example.com",
    profile_picture_url: "/placeholder.svg?height=40&width=40",
  },
];

// Sample dates (for consistent mock data)
const DATES = {
  recent: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  older: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  oldest: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
};

// Mock comments
export const MOCK_COMMENTS = [
  {
    id: "comment-1",
    content: "This looks like an antique compass from the 18th century.",
    author: MOCK_USERS[0],
    created_at: DATES.recent,
    votes: [{ user_id: "user-2", type: "upvote" }],
  },
  {
    id: "comment-2",
    content: "I think it might be a sundial component. My grandfather had something similar.",
    author: MOCK_USERS[1],
    created_at: DATES.older,
    votes: [
      { user_id: "user-1", type: "upvote" },
      { user_id: "user-3", type: "upvote" },
    ],
  },
];

// Mock mystery objects (posts)
export const enrichedMysteries = [
  {
    id: "mystery-1",
    title: "Strange metal object found in my grandfather's attic",
    description:
      "I was cleaning out my grandfather's attic and found this strange metal object. It has some intricate engravings and seems to be made of brass. Can anyone identify what this is?",
    author: MOCK_USERS[0],
    anonymous: false,
    created_at: DATES.recent,
    solved_by: null,
    solution: null,
    tags: ["Antique", "Metal", "Unknown"],
    images: {
      main: "https://i.etsystatic.com/9670094/r/il/edb7a5/2321728050/il_1140xN.2321728050_dqw6.jpg",
      additional: [
        "https://i.etsystatic.com/9670094/r/il/450957/2321728046/il_1140xN.2321728046_g3cb.jpg",
      ],
    },
    votes: [
      { user_id: "user-2", type: "upvote" },
      { user_id: "user-3", type: "upvote" },
      { user_id: "user-4", type: "upvote" },
    ],
    comments: [MOCK_COMMENTS[0], MOCK_COMMENTS[1]],
    parts: [
      {
        id: "part-1",
        name: "Main Body",
        attributes: {
          material: "Brass",
          color: "Golden",
          shape: "Circular",
          texture: "Smooth with engravings",
          condition: "Good, minor scratches",
        },
        measurements: {
          Diameter: {
            isRange: false,
            value: "10",
            unit: "cm",
          },
          Weight: {
            isRange: false,
            value: "500",
            unit: "g",
          },
        },
      },
      {
        id: "part-2",
        name: "Needle",
        attributes: {
          material: "Metal",
          color: "Silver",
          shape: "Pointed",
          texture: "Smooth",
          condition: "Slightly rusted",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "7",
            unit: "cm",
          },
        },
      },
    ],
    location: {
      country: "United States",
      region: "New England",
    },
  },
  {
    id: "mystery-2",
    title: "Wooden tool with metal blade found in old barn",
    description:
      "I found this wooden tool with a metal blade in an old barn. It seems to be handmade and quite old. Any ideas what this would have been used for?",
    author: MOCK_USERS[1],
    anonymous: false,
    created_at: DATES.older,
    solved_by: MOCK_USERS[0],
    solution: "This is an antique woodworking tool called a spokeshave, used for shaping wooden wheel spokes and handles.",
    tags: ["Woodworking", "Antique", "Tool"],
    images: {
      main: "https://i.etsystatic.com/13467878/r/il/cd0d28/2226378940/il_1140xN.2226378940_k88v.jpg",
      additional: [
        "https://i.etsystatic.com/13467878/r/il/5fa26c/2226379208/il_1140xN.2226379208_g4xd.jpg",
      ],
    },
    votes: [
      { user_id: "user-1", type: "upvote" },
      { user_id: "user-3", type: "upvote" },
      { user_id: "user-4", type: "upvote" },
      { user_id: "user-5", type: "upvote" },
    ],
    comments: [
      {
        id: "comment-3",
        content: "This looks like a spokeshave, used in woodworking for shaping wood.",
        author: MOCK_USERS[0],
        created_at: DATES.older,
        votes: [
          { user_id: "user-2", type: "upvote" },
          { user_id: "user-3", type: "upvote" },
        ],
      },
      {
        id: "comment-4",
        content: "My father was a carpenter and had several of these. Definitely a spokeshave.",
        author: {
          id: "user-3",
          username: "CraftsmanTom",
          name: "Tom Carpenter",
          profile_picture_url: "/placeholder.svg?height=40&width=40",
        },
        created_at: DATES.older,
        votes: [{ user_id: "user-1", type: "upvote" }],
      },
    ],
    parts: [
      {
        id: "part-2-1",
        name: "Base",
        attributes: {
          material: "Wood",
          color: "Brown",
          shape: "Rectangular",
          texture: "Smooth",
          condition: "Good",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "30",
            unit: "cm",
          },
          Width: {
            isRange: false,
            value: "20",
            unit: "cm",
          },
          Height: {
            isRange: false,
            value: "5",
            unit: "cm",
          },
        },
      },
      {
        id: "part-2-2",
        name: "Arm",
        attributes: {
          material: "Metal",
          color: "Silver",
          shape: "Curved",
          texture: "Smooth",
          condition: "Good",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "35",
            unit: "cm",
          },
        },
      },
      {
        id: "part-2-3",
        name: "Blade",
        attributes: {
          material: "Metal",
          color: "Silver",
          shape: "Curved",
          texture: "Smooth",
          condition: "Good",
          other: "Sharp edge",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "20",
            unit: "cm",
          },
          Width: {
            isRange: false,
            value: "2",
            unit: "cm",
          },
        },
      },
    ],
    location: {
      country: "United States",
      region: "Midwest",
    },
  },
  {
    id: "mystery-3",
    title: "Unusual ceramic vessel with strange markings",
    description:
      "I purchased this unusual ceramic vessel at an estate sale. It has strange markings that I can't identify. The previous owner had it in a cabinet with other collectibles.",
    author: {
      id: "user-3",
      username: "CraftsmanTom",
      name: "Tom Carpenter",
      profile_picture_url: "/placeholder.svg?height=40&width=40",
    },
    anonymous: false,
    created_at: DATES.oldest,
    solved_by: null,
    solution: null,
    tags: ["Ceramic", "Pottery", "Markings"],
    images: {
      main: "https://i.etsystatic.com/18317907/r/il/4f4468/4180486400/il_1140xN.4180486400_3vxp.jpg",
      additional: [
        "https://i.etsystatic.com/18317907/r/il/2ef4c4/4180511264/il_1140xN.4180511264_ow28.jpg",
      ],
    },
    votes: [
      { user_id: "user-1", type: "upvote" },
      { user_id: "user-2", type: "upvote" },
    ],
    comments: [
      {
        id: "comment-5",
        content: "Those markings appear to be from a small pottery studio. I've seen similar work before.",
        author: MOCK_USERS[1],
        created_at: DATES.oldest,
        votes: [{ user_id: "user-3", type: "upvote" }],
      },
    ],
    parts: [
      {
        id: "part-3-1",
        name: "Vessel",
        attributes: {
          material: "Ceramic",
          color: "Blue with white markings",
          shape: "Rounded with narrow neck",
          texture: "Smooth, glazed",
          condition: "Excellent",
        },
        measurements: {
          Height: {
            isRange: false,
            value: "25",
            unit: "cm",
          },
          Diameter: {
            isRange: false,
            value: "15",
            unit: "cm",
          },
        },
      },
    ],
    location: {
      country: "Unknown",
      region: "Unknown",
    },
  }
]; 