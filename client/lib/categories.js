// Categories with subcategories and attributes
export const CATEGORIES_WITH_ATTRIBUTES = [
  {
    id: "natural",
    name: "Natural Objects",
    subcategories: [
      {
        id: "rocks",
        name: "Rocks & Minerals",
        attributes: [
          {
            id: "color",
            name: "Color",
            type: "text",
            placeholder: "e.g., Red, Blue, Green, Multi-colored",
          },
          {
            id: "texture",
            name: "Texture",
            type: "select",
            options: [
              { value: "smooth", label: "Smooth" },
              { value: "rough", label: "Rough" },
              { value: "crystalline", label: "Crystalline" },
              { value: "layered", label: "Layered" },
              { value: "porous", label: "Porous" },
            ],
          },
          {
            id: "weight",
            name: "Weight",
            type: "text",
            placeholder: "e.g., Light, Heavy, 250g",
          },
          {
            id: "dimensions",
            name: "Dimensions",
            type: "text",
            placeholder: "e.g., 5cm x 3cm x 2cm",
          },
        ],
      },
      {
        id: "fossils",
        name: "Fossils",
        attributes: [
          {
            id: "fossil_type",
            name: "Fossil Type",
            type: "select",
            options: [
              { value: "bone", label: "Bone" },
              { value: "shell", label: "Shell" },
              { value: "plant", label: "Plant" },
              { value: "trace", label: "Trace Fossil" },
              { value: "unknown", label: "Unknown" },
            ],
          },
          {
            id: "estimated_age",
            name: "Estimated Age",
            type: "text",
            placeholder: "e.g., Jurassic, 150 million years",
          },
          {
            id: "preservation",
            name: "Preservation Quality",
            type: "select",
            options: [
              { value: "excellent", label: "Excellent" },
              { value: "good", label: "Good" },
              { value: "fair", label: "Fair" },
              { value: "poor", label: "Poor" },
            ],
          },
        ],
      },
      {
        id: "plants",
        name: "Plants & Seeds",
        attributes: [
          {
            id: "plant_type",
            name: "Plant Type",
            type: "select",
            options: [
              { value: "flower", label: "Flower" },
              { value: "tree", label: "Tree" },
              { value: "shrub", label: "Shrub" },
              { value: "grass", label: "Grass" },
              { value: "fungus", label: "Fungus" },
              { value: "seed", label: "Seed" },
              { value: "unknown", label: "Unknown" },
            ],
          },
          {
            id: "habitat",
            name: "Habitat",
            type: "text",
            placeholder: "e.g., Forest, Desert, Garden",
          },
          {
            id: "leaf_shape",
            name: "Leaf Shape",
            type: "text",
            placeholder: "e.g., Oval, Needle-like, Heart-shaped",
          },
        ],
      },
    ],
  },
  {
    id: "artifacts",
    name: "Artifacts",
    subcategories: [
      {
        id: "tools",
        name: "Tools & Implements",
        attributes: [
          {
            id: "material",
            name: "Material",
            type: "select",
            options: [
              { value: "metal", label: "Metal" },
              { value: "wood", label: "Wood" },
              { value: "stone", label: "Stone" },
              { value: "plastic", label: "Plastic" },
              { value: "composite", label: "Composite" },
            ],
          },
          {
            id: "estimated_age",
            name: "Estimated Age",
            type: "text",
            placeholder: "e.g., 1800s, 1950s, Ancient",
          },
          {
            id: "markings",
            name: "Markings or Inscriptions",
            type: "text",
            placeholder: "e.g., Maker's mark, Serial number",
          },
          {
            id: "condition",
            name: "Condition",
            type: "select",
            options: [
              { value: "mint", label: "Mint" },
              { value: "good", label: "Good" },
              { value: "worn", label: "Worn" },
              { value: "damaged", label: "Damaged" },
              { value: "corroded", label: "Corroded/Rusted" },
            ],
          },
        ],
      },
      {
        id: "household",
        name: "Household Items",
        attributes: [
          {
            id: "room",
            name: "Room",
            type: "select",
            options: [
              { value: "kitchen", label: "Kitchen" },
              { value: "bathroom", label: "Bathroom" },
              { value: "bedroom", label: "Bedroom" },
              { value: "living", label: "Living Room" },
              { value: "utility", label: "Utility Room" },
              { value: "unknown", label: "Unknown" },
            ],
          },
          {
            id: "era",
            name: "Era",
            type: "text",
            placeholder: "e.g., Victorian, Mid-century, Modern",
          },
          {
            id: "function",
            name: "Possible Function",
            type: "text",
            placeholder: "e.g., Cooking, Cleaning, Decoration",
          },
        ],
      },
      {
        id: "jewelry",
        name: "Jewelry & Accessories",
        attributes: [
          {
            id: "metal_type",
            name: "Metal Type",
            type: "select",
            options: [
              { value: "gold", label: "Gold" },
              { value: "silver", label: "Silver" },
              { value: "copper", label: "Copper" },
              { value: "brass", label: "Brass" },
              { value: "unknown", label: "Unknown" },
            ],
          },
          {
            id: "gemstones",
            name: "Gemstones",
            type: "text",
            placeholder: "e.g., Diamond, Ruby, None",
          },
          {
            id: "style",
            name: "Style",
            type: "text",
            placeholder: "e.g., Art Deco, Modern, Tribal",
          },
        ],
      },
    ],
  },
  {
    id: "geological",
    name: "Geological Finds",
    subcategories: [
      {
        id: "crystals",
        name: "Crystals & Gemstones",
        attributes: [
          {
            id: "color",
            name: "Color",
            type: "text",
            placeholder: "e.g., Clear, Purple, Multi-colored",
          },
          {
            id: "transparency",
            name: "Transparency",
            type: "select",
            options: [
              { value: "transparent", label: "Transparent" },
              { value: "translucent", label: "Translucent" },
              { value: "opaque", label: "Opaque" },
            ],
          },
          {
            id: "crystal_system",
            name: "Crystal System",
            type: "select",
            options: [
              { value: "cubic", label: "Cubic" },
              { value: "hexagonal", label: "Hexagonal" },
              { value: "tetragonal", label: "Tetragonal" },
              { value: "unknown", label: "Unknown" },
            ],
          },
        ],
      },
      {
        id: "formations",
        name: "Rock Formations",
        attributes: [
          {
            id: "formation_type",
            name: "Formation Type",
            type: "select",
            options: [
              { value: "igneous", label: "Igneous" },
              { value: "sedimentary", label: "Sedimentary" },
              { value: "metamorphic", label: "Metamorphic" },
              { value: "unknown", label: "Unknown" },
            ],
          },
          {
            id: "location_type",
            name: "Location Type",
            type: "text",
            placeholder: "e.g., Cave, Mountain, Beach",
          },
          {
            id: "size",
            name: "Size",
            type: "text",
            placeholder: "e.g., 2m tall, 5m wide",
          },
        ],
      },
    ],
  },
  {
    id: "biological",
    name: "Biological Specimens",
    subcategories: [
      {
        id: "bones",
        name: "Bones & Remains",
        attributes: [
          {
            id: "bone_type",
            name: "Bone Type",
            type: "select",
            options: [
              { value: "skull", label: "Skull" },
              { value: "jaw", label: "Jaw" },
              { value: "vertebra", label: "Vertebra" },
              { value: "limb", label: "Limb" },
              { value: "unknown", label: "Unknown" },
            ],
          },
          {
            id: "animal_type",
            name: "Animal Type",
            type: "text",
            placeholder: "e.g., Mammal, Bird, Unknown",
          },
          {
            id: "preservation",
            name: "Preservation State",
            type: "select",
            options: [
              { value: "excellent", label: "Excellent" },
              { value: "good", label: "Good" },
              { value: "fair", label: "Fair" },
              { value: "poor", label: "Poor" },
            ],
          },
        ],
      },
      {
        id: "insects",
        name: "Insects & Arthropods",
        attributes: [
          {
            id: "body_parts",
            name: "Body Parts",
            type: "text",
            placeholder: "e.g., 6 legs, wings, antennae",
          },
          {
            id: "color_pattern",
            name: "Color Pattern",
            type: "text",
            placeholder: "e.g., Black with yellow stripes",
          },
          {
            id: "habitat",
            name: "Habitat",
            type: "text",
            placeholder: "e.g., Forest, Garden, House",
          },
        ],
      },
    ],
  },
  {
    id: "historical",
    name: "Historical Items",
    subcategories: [
      {
        id: "coins",
        name: "Coins & Currency",
        attributes: [
          {
            id: "metal",
            name: "Metal",
            type: "select",
            options: [
              { value: "gold", label: "Gold" },
              { value: "silver", label: "Silver" },
              { value: "copper", label: "Copper" },
              { value: "bronze", label: "Bronze" },
              { value: "other", label: "Other" },
            ],
          },
          {
            id: "date_period",
            name: "Date/Period",
            type: "text",
            placeholder: "e.g., 1800s, Roman, Medieval",
          },
          {
            id: "inscriptions",
            name: "Inscriptions",
            type: "text",
            placeholder: "e.g., Text, Symbols, Portraits",
          },
          {
            id: "diameter",
            name: "Diameter",
            type: "text",
            placeholder: "e.g., 20mm, 1 inch",
          },
        ],
      },
      {
        id: "documents",
        name: "Documents & Manuscripts",
        attributes: [
          {
            id: "document_type",
            name: "Document Type",
            type: "select",
            options: [
              { value: "letter", label: "Letter" },
              { value: "certificate", label: "Certificate" },
              { value: "map", label: "Map" },
              { value: "book", label: "Book" },
              { value: "other", label: "Other" },
            ],
          },
          {
            id: "language",
            name: "Language",
            type: "text",
            placeholder: "e.g., English, Latin, Unknown",
          },
          {
            id: "date_period",
            name: "Date/Period",
            type: "text",
            placeholder: "e.g., 1800s, WWII era",
          },
          {
            id: "condition",
            name: "Condition",
            type: "select",
            options: [
              { value: "excellent", label: "Excellent" },
              { value: "good", label: "Good" },
              { value: "fair", label: "Fair" },
              { value: "poor", label: "Poor" },
              { value: "fragmented", label: "Fragmented" },
            ],
          },
        ],
      },
      {
        id: "militaria",
        name: "Military Items",
        attributes: [
          {
            id: "item_type",
            name: "Item Type",
            type: "select",
            options: [
              { value: "weapon", label: "Weapon" },
              { value: "uniform", label: "Uniform" },
              { value: "medal", label: "Medal" },
              { value: "equipment", label: "Equipment" },
              { value: "other", label: "Other" },
            ],
          },
          {
            id: "era",
            name: "Era",
            type: "text",
            placeholder: "e.g., WWI, WWII, Civil War",
          },
          {
            id: "country",
            name: "Country of Origin",
            type: "text",
            placeholder: "e.g., USA, Germany, Unknown",
          },
        ],
      },
    ],
  },
  {
    id: "technological",
    name: "Technological Devices",
    subcategories: [
      {
        id: "electronics",
        name: "Electronic Components",
        attributes: [
          {
            id: "component_type",
            name: "Component Type",
            type: "select",
            options: [
              { value: "circuit", label: "Circuit Board" },
              { value: "tube", label: "Vacuum Tube" },
              { value: "transistor", label: "Transistor" },
              { value: "connector", label: "Connector" },
              { value: "unknown", label: "Unknown" },
            ],
          },
          {
            id: "markings",
            name: "Markings",
            type: "text",
            placeholder: "e.g., Serial numbers, Manufacturer codes",
          },
          {
            id: "era",
            name: "Era",
            type: "text",
            placeholder: "e.g., 1960s, 1980s",
          },
        ],
      },
      {
        id: "mechanical",
        name: "Mechanical Devices",
        attributes: [
          {
            id: "mechanism_type",
            name: "Mechanism Type",
            type: "select",
            options: [
              { value: "gear", label: "Gear System" },
              { value: "spring", label: "Spring Mechanism" },
              { value: "lever", label: "Lever System" },
              { value: "unknown", label: "Unknown" },
            ],
          },
          {
            id: "material",
            name: "Material",
            type: "text",
            placeholder: "e.g., Brass, Steel, Bakelite",
          },
          {
            id: "possible_function",
            name: "Possible Function",
            type: "text",
            placeholder: "e.g., Timekeeping, Measurement",
          },
        ],
      },
    ],
  },
  {
    id: "unusual",
    name: "Unusual Phenomena",
    subcategories: [
      {
        id: "aerial",
        name: "Aerial Phenomena",
        attributes: [
          {
            id: "appearance",
            name: "Appearance",
            type: "text",
            placeholder: "e.g., Lights, Solid object, Cloud-like",
          },
          {
            id: "movement",
            name: "Movement Pattern",
            type: "text",
            placeholder: "e.g., Hovering, Zigzag, Linear",
          },
          {
            id: "duration",
            name: "Duration",
            type: "text",
            placeholder: "e.g., 5 minutes, Several hours",
          },
          {
            id: "witnesses",
            name: "Number of Witnesses",
            type: "text",
            placeholder: "e.g., 1, 3, Multiple",
          },
        ],
      },
      {
        id: "markings",
        name: "Ground Markings",
        attributes: [
          {
            id: "pattern",
            name: "Pattern",
            type: "text",
            placeholder: "e.g., Circle, Geometric, Random",
          },
          {
            id: "size",
            name: "Size",
            type: "text",
            placeholder: "e.g., 3m diameter, 10m x 5m",
          },
          {
            id: "surface",
            name: "Surface Type",
            type: "text",
            placeholder: "e.g., Grass, Soil, Snow",
          },
        ],
      },
    ],
  },
];
