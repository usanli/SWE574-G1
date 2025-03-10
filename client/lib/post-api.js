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
    profile_picture_url:
      "https://i.etsystatic.com/26291264/r/il/494329/3341724932/il_1588xN.3341724932_srt4.jpg",
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
    profile_picture_url:
      "https://i.etsystatic.com/21535880/r/il/29a235/3709294959/il_1588xN.3709294959_kjw1.jpg",
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
    profile_picture_url:
      "https://i.etsystatic.com/11651126/r/il/866b36/4752825280/il_1588xN.4752825280_b4g6.jpg",
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
    profile_picture_url:
      "https://i.etsystatic.com/7273753/r/il/f116d9/5554350527/il_1588xN.5554350527_sjbk.jpg",
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
    profile_picture_url:
      "https://i.etsystatic.com/24428084/r/il/2c76dc/5858744025/il_1588xN.5858744025_rey4.jpg",
    badges: ["expert"],
    role: "expert",
    suspended: false,
  },
  {
    id: "user-6",
    username: "ExpatAdventurer",
    name: "David",
    surname: "Thompson",
    email: "david@example.com",
    date_of_birth: "1987-04-12",
    profession: "Software Developer",
    bio: "American expat living in Germany, discovering new cultural curiosities every day.",
    country: "Germany",
    profile_picture_url:
      "https://i.etsystatic.com/16483262/r/il/06a793/5892045921/il_1588xN.5892045921_dr2v.jpg",
    badges: [],
    role: "user",
    suspended: false,
  },
  {
    id: "user-7",
    username: "CraftyCollector",
    name: "Lisa",
    surname: "Anderson",
    email: "lisa@example.com",
    date_of_birth: "1983-09-28",
    profession: "Textile Artist",
    bio: "Passionate about traditional crafts and vintage tools.",
    country: "United States",
    profile_picture_url:
      "https://i.etsystatic.com/8154976/r/il/7c00b3/1754056382/il_1588xN.1754056382_chao.jpg",
    badges: [],
    role: "user",
    suspended: false,
  },
];

// Updated mock mysteries with the new parts system
const MOCK_MYSTERIES = [
  {
    id: "1",
    author_id: "user-7",
    title:
      "Found this old wooden stick with bristles in my grandmother's attic",
    description:
      "While cleaning out my grandmother's attic last weekend, I came across this unusual wooden stick with bristles attached to one end. It appears to be quite old, possibly from the early 1900s based on other items found nearby.\n\nThe wooden handle has a beautiful patina and some hand-carved details. The bristles are stiff but still intact, and they're attached to the wood with what looks like a metal band.\n\nMy grandmother lived in rural Pennsylvania all her life and was known for keeping traditional household items. I'm curious if this is some kind of specialized cleaning tool or perhaps had another purpose entirely. Any insights would be greatly appreciated!",
    tags: ["Wooden", "Household", "Antique", "Tool"],
    location: "Pennsylvania, United States",
    parts: [
      {
        id: "part-1-1",
        name: "Handle",
        attributes: {
          material: "Wood",
          color: "Brown",
          texture: "Smooth",
          condition: "Weathered",
          other: "Hand-carved details near the top",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "120",
            unit: "cm",
          },
          Diameter: {
            isRange: false,
            value: "3",
            unit: "cm",
          },
        },
      },
      {
        id: "part-1-2",
        name: "Bristles",
        attributes: {
          material: "Unknown",
          color: "Tan",
          texture: "Rough",
          condition: "Worn",
          other: "Stiff but flexible",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "15",
            unit: "cm",
          },
          Width: {
            isRange: false,
            value: "12",
            unit: "cm",
          },
        },
      },
      {
        id: "part-1-3",
        name: "Connecting Band",
        attributes: {
          material: "Metal",
          color: "Silver",
          texture: "Smooth",
          condition: "Rusted/Corroded",
          other: "Appears to be hand-forged",
        },
        measurements: {
          Width: {
            isRange: false,
            value: "2",
            unit: "cm",
          },
        },
      },
    ],
    images: {
      main: "https://i.etsystatic.com/19139744/r/il/9cc78b/2047160599/il_1588xN.2047160599_byfz.jpg",
      additional: [
        "https://i.etsystatic.com/19139744/r/il/4c0665/1928206147/il_1588xN.1928206147_s3o8.jpg",
      ],
    },
    solved_by: false,
    anonymous: false,
    deleted_at: null,
    created_at: "2023-11-28T14:30:00Z",
  },
  {
    id: "2",
    author_id: "user-6",
    title: "What is this strange contraption in my German apartment's kitchen?",
    description:
      "I recently moved to Germany for work and my apartment came with this strange device mounted on the wall in the kitchen. It has a wooden base with a metal arm that swings out, and what looks like a blade on the end.\n\nWhen I pull the arm down, the blade comes down on the wooden base. There's a small platform that seems designed to hold something in place. My German isn't great yet, so I haven't been able to ask my neighbors what this is for.\n\nIt seems well-used and my landlord mentioned something about it being a traditional item that many German households have. Is this some kind of specialized kitchen tool? What would it be used for? I'm hesitant to try it without knowing its purpose!",
    tags: ["Kitchen", "German", "Tool", "Mechanical"],
    location: "Berlin, Germany",
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
      {
        id: "part-2-4",
        name: "Platform",
        attributes: {
          material: "Wood",
          color: "Brown",
          shape: "Rectangular",
          texture: "Smooth",
          condition: "Worn",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "15",
            unit: "cm",
          },
          Width: {
            isRange: false,
            value: "10",
            unit: "cm",
          },
        },
      },
    ],
    images: {
      main: "https://i.etsystatic.com/23456888/r/il/11b20a/5932341747/il_1588xN.5932341747_ki62.jpg",
      additional: [
        "https://i.etsystatic.com/23456888/r/il/1cb7c6/5932341815/il_1588xN.5932341815_j6y8.jpg",
        "https://i.etsystatic.com/23456888/r/il/1b91e4/5884267370/il_1588xN.5884267370_76o3.jpg",
      ],
    },
    solved_by: true,
    anonymous: false,
    deleted_at: null,
    created_at: "2023-11-27T09:15:00Z",
  },
  {
    id: "3",
    author_id: "user-1",
    title:
      "Found this set of metal needles in an antique sewing box - what are they for?",
    description:
      "I purchased an antique sewing box at an estate sale last month, and while organizing its contents, I discovered this unusual set of metal needles or pins. They're unlike any sewing needles I've seen before.\n\nThe set includes 5 needles of varying lengths, all stored in a small leather case with individual slots. Each needle has a different shaped tip and some have small hooks or eyes in unusual positions. They appear to be made of steel or some similar metal, and are in remarkably good condition despite their apparent age.\n\nThe sewing box itself dates from approximately the 1920s based on its style and the other items inside, but these needles look like they might be even older or perhaps for a specialized purpose. The previous owner was apparently a professional seamstress who worked with fine fabrics and lace.\n\nDoes anyone recognize what these might be used for? Are they for a specific type of sewing or textile work?",
    tags: ["Metal", "Sewing", "Tool", "Antique"],
    location: "Boston, Massachusetts",
    parts: [
      {
        id: "part-3-1",
        name: "Case",
        attributes: {
          material: "Leather",
          color: "Brown",
          shape: "Rectangular",
          texture: "Smooth",
          condition: "Good",
          other: "Has individual slots for each needle",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "12",
            unit: "cm",
          },
          Width: {
            isRange: false,
            value: "5",
            unit: "cm",
          },
          Height: {
            isRange: false,
            value: "1",
            unit: "cm",
          },
        },
      },
      {
        id: "part-3-2",
        name: "Needle Set",
        attributes: {
          material: "Metal",
          color: "Silver",
          texture: "Smooth",
          condition: "Excellent",
          other: "Set of 5 needles with different tips",
        },
        measurements: {
          Length: {
            isRange: true,
            min: "5",
            max: "10",
            unit: "cm",
          },
          Diameter: {
            isRange: false,
            value: "0.2",
            unit: "cm",
          },
        },
      },
      {
        id: "part-3-3",
        name: "Largest Needle",
        attributes: {
          material: "Metal",
          color: "Silver",
          texture: "Smooth",
          condition: "Excellent",
          other: "Has a hook at the tip",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "10",
            unit: "cm",
          },
        },
      },
      {
        id: "part-3-4",
        name: "Smallest Needle",
        attributes: {
          material: "Metal",
          color: "Silver",
          texture: "Smooth",
          condition: "Excellent",
          other: "Has an unusual eye placement",
        },
        measurements: {
          Length: {
            isRange: false,
            value: "5",
            unit: "cm",
          },
        },
      },
    ],
    images: {
      main: "https://i.etsystatic.com/17166199/r/il/c67dd7/2583256960/il_1588xN.2583256960_r5ki.jpg",
      additional: [],
    },
    solved_by: false,
    anonymous: false,
    deleted_at: null,
    created_at: "2023-11-26T18:45:00Z",
  },
];

// Generate mock comments for each mystery with categories and replies
const generateComments = (mysteryId, authorId) => {
  const commentTypes = ["guess", "discussion", "hint", "expert", "question"];
  const numberOfComments = Math.floor(Math.random() * 8) + 3; // 3-10 comments
  const comments = [];
  const userIds = MOCK_USERS.map((user) => user.id);

  // Custom comments for each mystery
  if (mysteryId === "1") {
    // Comments for the old broom
    comments.push({
      id: `comment-${mysteryId}-1`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-5", // AntiquesExpert
      content:
        "This is definitely an antique broom from the early 1900s. The hand-carved details on the handle and the metal band connecting the bristles are characteristic of handmade household tools from that era. These were commonly used for sweeping floors in rural American homes before mass-produced cleaning tools became widely available.",
      category: "expert",
      anonymous: false,
      is_reply: false,
      featured: true,
      created_at: new Date(Date.now() - 7200000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-5").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-5")
          .profile_picture_url,
      },
      votes: Array(15)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-1-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-1`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-2`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-2", // HistoryBuff
      content:
        "My grandmother had something very similar! The bristles look like they might be made from corn husks or a similar natural material. These brooms were often handmade on farms using materials they had available. The wooden handle would typically be carved from a straight branch or sapling.",
      category: "discussion",
      anonymous: false,
      is_reply: false,
      featured: false,
      created_at: new Date(Date.now() - 5400000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-2").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-2")
          .profile_picture_url,
      },
      votes: Array(8)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-2-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-2`,
          type: Math.random() > 0.2 ? "upvote" : "downvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-3`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-2`,
      author_id: "user-7", // Original poster
      content:
        "That's fascinating! The bristles do feel like some kind of plant material, though they're quite stiff. Do you know if these were typically made at home or by local craftsmen?",
      category: "discussion",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 5000000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-7").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-7")
          .profile_picture_url,
      },
      votes: Array(3)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-3-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-3`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-4`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-3`,
      author_id: "user-2", // HistoryBuff
      content:
        "Both, actually! Many families would make their own brooms as part of their household crafts, but there were also traveling broom makers who would go from town to town making and selling brooms. By the early 1900s, there were also small local workshops that specialized in broom making. The quality of the carving on yours suggests it might have been made by someone with specialized skills rather than just a household item.",
      category: "discussion",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 4800000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-2").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-2")
          .profile_picture_url,
      },
      votes: Array(5)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-4-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-4`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-5`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-4", // NatureWanderer
      content:
        "Have you checked if the bristles are made from broomcorn? It's a type of sorghum that was commonly used for making brooms. The bristles are stiff but flexible, perfect for sweeping. You can sometimes identify it by the reddish-brown color at the base of the bristles.",
      category: "hint",
      anonymous: false,
      is_reply: false,
      featured: false,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-4").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-4")
          .profile_picture_url,
      },
      votes: Array(7)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-5-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-5`,
          type: Math.random() > 0.1 ? "upvote" : "downvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-6`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-3", // TechExplorer
      content:
        "Is there any maker's mark or initials carved into the handle? Sometimes craftsmen would sign their work, especially if they were known for quality brooms in the area.",
      category: "question",
      anonymous: false,
      is_reply: false,
      featured: false,
      created_at: new Date(Date.now() - 2400000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-3").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-3")
          .profile_picture_url,
      },
      votes: Array(4)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-6-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-6`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-7`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-6`,
      author_id: "user-7", // Original poster
      content:
        "I just checked and there are indeed some initials carved near the bottom of the handle! It looks like 'JB' or possibly 'JR' - it's a bit worn. That's exciting to know it might be traceable to a specific maker!",
      category: "question",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 1800000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-7").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-7")
          .profile_picture_url,
      },
      votes: Array(6)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-7-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-7`,
          type: "upvote",
        })),
    });
  } else if (mysteryId === "2") {
    // Comments for the German bread cutting machine
    comments.push({
      id: `comment-${mysteryId}-1`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-2", // HistoryBuff
      content:
        "That's a traditional German bread slicer (Brotschneidemaschine)! They're very common in German households because Germans eat a lot of dense, crusty bread that can be difficult to cut evenly with just a knife. You place the loaf on the wooden platform and use the blade to slice it to your desired thickness.",
      category: "guess",
      anonymous: false,
      is_reply: false,
      featured: true,
      created_at: new Date(Date.now() - 8640000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-2").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-2")
          .profile_picture_url,
      },
      votes: Array(22)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-1-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-1`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-2`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-1`,
      author_id: "user-6", // Original poster
      content:
        "Thank you! That makes perfect sense. I've noticed that the bread here is much firmer than what I'm used to in the US. I'll have to try it out now that I know what it is. Is there a specific technique to using it safely?",
      category: "guess",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 8500000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-6").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-6")
          .profile_picture_url,
      },
      votes: Array(5)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-2-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-2`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-3`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-2`,
      author_id: "user-2", // HistoryBuff
      content:
        "Yes, safety is important! Hold the bread firmly against the back guide with one hand (keeping your fingers well away from the blade path), and use your other hand to pull the blade arm down in a smooth motion. Some models have a safety lock when not in use - check if yours has a small latch on the arm. Germans typically slice bread as they need it rather than all at once, to keep it fresh longer.",
      category: "guess",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 8400000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-2").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-2")
          .profile_picture_url,
      },
      votes: Array(8)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-3-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-3`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-4`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-5", // AntiquesExpert
      content:
        "This is indeed a German bread slicer, and from what I can see in your photos, it appears to be a well-maintained vintage model, likely from the 1950s or 1960s. These were built to last generations and are still very practical. The wooden base looks like it might be beech, which was commonly used for kitchen items in Germany. The blade is typically high-carbon steel and can be sharpened when needed.",
      category: "expert",
      anonymous: false,
      is_reply: false,
      featured: true,
      created_at: new Date(Date.now() - 7200000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-5").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-5")
          .profile_picture_url,
      },
      votes: Array(18)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-4-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-4`,
          type: Math.random() > 0.1 ? "upvote" : "downvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-5`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-3", // TechExplorer
      content:
        "As others have identified, it's a bread slicer. I'm curious - is there any manufacturer's mark on it? Some of the traditional German manufacturers like Ritter are still in business today and have been making these for decades.",
      category: "question",
      anonymous: false,
      is_reply: false,
      featured: false,
      created_at: new Date(Date.now() - 5400000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-3").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-3")
          .profile_picture_url,
      },
      votes: Array(4)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-5-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-5`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-6`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-5`,
      author_id: "user-6", // Original poster
      content:
        "I just checked and found a small metal plate on the underside that says 'Dienes & Söhne, Stuttgart'. I'm guessing that's the manufacturer? It's cool to know this has some history to it!",
      category: "question",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 5000000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-6").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-6")
          .profile_picture_url,
      },
      votes: Array(6)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-6-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-6`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-7`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-1", // CuriousFinder
      content:
        "Pro tip from someone who lived in Germany for years: these slicers are great for cutting more than just bread! They work well for slicing homemade cakes, firm cheeses, and even cold cuts if the blade is sharp enough. Just make sure to clean it well between different foods.",
      category: "hint",
      anonymous: false,
      is_reply: false,
      featured: false,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-1").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-1")
          .profile_picture_url,
      },
      votes: Array(12)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-7-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-7`,
          type: Math.random() > 0.2 ? "upvote" : "downvote",
        })),
    });
  } else if (mysteryId === "3") {
    // Comments for the needle set
    comments.push({
      id: `comment-${mysteryId}-1`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-7", // CraftyCollector
      content:
        "These look like specialized lace-making needles! The different shaped tips and hooks are designed for creating various types of intricate lace patterns. The leather case with individual slots is typical for high-quality lace-making tools from the early 20th century. Given that the previous owner was a professional seamstress who worked with fine fabrics and lace, this makes perfect sense.",
      category: "guess",
      anonymous: false,
      is_reply: false,
      featured: true,
      created_at: new Date(Date.now() - 7200000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-7").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-7")
          .profile_picture_url,
      },
      votes: Array(16)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-1-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-1`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-2`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-1`,
      author_id: "user-1", // Original poster
      content:
        "That's fascinating! I had no idea lace-making required such specialized tools. Do you know what specific techniques these different needle shapes would be used for?",
      category: "guess",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 6800000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-1").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-1")
          .profile_picture_url,
      },
      votes: Array(4)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-2-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-2`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-3`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-2`,
      author_id: "user-7", // CraftyCollector
      content:
        "The needle with the hook at the tip would be used for tambour lace, where the hook pulls thread through fabric to create chain stitches. The ones with eyes in unusual positions are likely for drawn thread work, where specific threads are removed from fabric and the remaining threads are stitched into patterns. The varying lengths allow the seamstress to work on different scales of lace - from very fine to more substantial pieces. These were high-quality tools for a skilled craftswoman!",
      category: "guess",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 6600000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-7").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-7")
          .profile_picture_url,
      },
      votes: Array(9)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-3-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-3`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-4`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-5", // AntiquesExpert
      content:
        "I can confirm these are specialized lace-making needles, likely from the early 1900s. The quality of the steel and the leather case suggests these were professional tools, possibly European-made. The set appears to be complete, which is unusual as these tools were often lost or separated over time. The smallest needle with the unusual eye placement is particularly interesting - it's designed for fine bobbin lace work, a technique that was highly valued but declining in popularity by the 1920s as machine-made lace became more common. This is a valuable find for anyone interested in historical textile arts.",
      category: "expert",
      anonymous: false,
      is_reply: false,
      featured: true,
      created_at: new Date(Date.now() - 5400000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-5").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-5")
          .profile_picture_url,
      },
      votes: Array(20)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-4-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-4`,
          type: Math.random() > 0.1 ? "upvote" : "downvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-5`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-4", // NatureWanderer
      content:
        "Are there any markings or stamps on the needles themselves? Sometimes high-quality needles from this era had maker's marks that could help identify their origin more precisely.",
      category: "question",
      anonymous: false,
      is_reply: false,
      featured: false,
      created_at: new Date(Date.now() - 4800000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-4").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-4")
          .profile_picture_url,
      },
      votes: Array(5)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-5-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-5`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-6`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-5`,
      author_id: "user-1", // Original poster
      content:
        "I examined them with a magnifying glass and found tiny 'B&S' marks near the base of three of the needles! The other two don't have visible markings, but they match the style of the marked ones.",
      category: "question",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 4200000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-1").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-1")
          .profile_picture_url,
      },
      votes: Array(6)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-6-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-6`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-7`,
      mystery_id: mysteryId,
      parent_id: `comment-${mysteryId}-6`,
      author_id: "user-5", // AntiquesExpert
      content:
        "'B&S' likely stands for Bohin & Sons, a French needle and pin manufacturer established in 1833 that is still in business today. They were known for their high-quality needles and specialized tools for lace-making and fine embroidery. This definitely confirms these are professional-grade tools and adds to their historical value.",
      category: "expert",
      anonymous: false,
      is_reply: true,
      featured: false,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-5").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-5")
          .profile_picture_url,
      },
      votes: Array(12)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-reply-7-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-7`,
          type: "upvote",
        })),
    });

    comments.push({
      id: `comment-${mysteryId}-8`,
      mystery_id: mysteryId,
      parent_id: null,
      author_id: "user-2", // HistoryBuff
      content:
        "If you're interested in learning more about these tools and possibly seeing them in action, you might want to contact your local textile arts guild or historical society. Many of these organizations have members who still practice traditional lace-making techniques and would be thrilled to see such a well-preserved set of tools. They might even be able to demonstrate how they were used!",
      category: "hint",
      anonymous: false,
      is_reply: false,
      featured: false,
      created_at: new Date(Date.now() - 2400000).toISOString(),
      author: {
        username: MOCK_USERS.find((user) => user.id === "user-2").username,
        profile_picture_url: MOCK_USERS.find((user) => user.id === "user-2")
          .profile_picture_url,
      },
      votes: Array(8)
        .fill()
        .map((_, j) => ({
          id: `vote-${mysteryId}-comment-8-${j}`,
          voter: userIds[Math.floor(Math.random() * userIds.length)],
          comment_id: `comment-${mysteryId}-8`,
          type: Math.random() > 0.2 ? "upvote" : "downvote",
        })),
    });
  } else {
    // Generate random comments for other mysteries
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
          const replyUserId =
            userIds[Math.floor(Math.random() * userIds.length)];
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
