"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Upload,
  X,
  Plus,
  Camera,
  Search,
  Trash2,
  Edit,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for predefined fields
const PREDEFINED_FIELDS = {
  material: [
    "Wood",
    "Metal",
    "Plastic",
    "Glass",
    "Ceramic",
    "Leather",
    "Fabric",
    "Stone",
    "Paper",
    "Unknown",
  ],
  color: [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Brown",
    "Gray",
    "Silver",
    "Gold",
    "Multicolored",
    "Unknown",
  ],
  shape: [
    "Round",
    "Square",
    "Rectangular",
    "Triangular",
    "Cylindrical",
    "Spherical",
    "Irregular",
    "Flat",
    "Curved",
    "Unknown",
  ],
  texture: [
    "Smooth",
    "Rough",
    "Bumpy",
    "Ridged",
    "Patterned",
    "Polished",
    "Matte",
    "Glossy",
    "Unknown",
  ],
  condition: [
    "Excellent",
    "Good",
    "Fair",
    "Poor",
    "Damaged",
    "Rusted/Corroded",
    "Weathered",
    "Unknown",
  ],
};

// Mock data for tag categories
const TAG_CATEGORIES = [
  {
    id: "use-case",
    name: "Use Case",
    tags: [
      "Kitchenware",
      "Tool",
      "Decoration",
      "Furniture",
      "Clothing",
      "Jewelry",
      "Weapon",
      "Currency",
      "Religious",
      "Medical",
      "Scientific",
      "Musical",
      "Writing",
      "Transportation",
    ],
  },
  {
    id: "time-period",
    name: "Time Period",
    tags: [
      "Ancient",
      "Medieval",
      "Renaissance",
      "1600s",
      "1700s",
      "1800s",
      "Early 1900s",
      "Mid 1900s",
      "Late 1900s",
      "Modern",
      "Contemporary",
    ],
  },
  {
    id: "field",
    name: "Field",
    tags: [
      "Archaeology",
      "History",
      "Art",
      "Science",
      "Technology",
      "Military",
      "Agriculture",
      "Domestic",
      "Industrial",
      "Commercial",
      "Maritime",
      "Religious",
      "Educational",
    ],
  },
  {
    id: "origin",
    name: "Origin",
    tags: [
      "European",
      "Asian",
      "African",
      "North American",
      "South American",
      "Australian",
      "Middle Eastern",
      "Eastern European",
      "Western European",
      "Mediterranean",
      "Nordic",
      "Oceanic",
    ],
  },
];

// Mock function to search Wikidata
const searchWikidata = async (query) => {
  // In a real app, this would be an API call to Wikidata
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay

  if (!query.trim()) return [];

  // Mock results
  return [
    {
      id: "Q42371",
      label: "Kitchenware",
      description:
        "Tools, utensils, appliances, dishes, and cookware used in food preparation, or the serving or dining of food",
    },
    {
      id: "Q12345",
      label: "Cutlery",
      description: "Tools used for serving and eating food",
    },
    {
      id: "Q67890",
      label: "Spoon",
      description: "Utensil consisting of a small shallow bowl with a handle",
    },
    {
      id: "Q11122",
      label: "Ladle",
      description: "Type of spoon used for serving liquids",
    },
    {
      id: "Q22233",
      label: "Cooking utensil",
      description:
        "Hand-held, typically small tool that is designed for food-related functions",
    },
  ].filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );
};

// Object Part component
const ObjectPart = ({ part, onEdit, onDelete }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{part.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(part.id)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(part.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(part.attributes).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="font-medium capitalize">{key}:</span>
              <span>{Array.isArray(value) ? value.join(", ") : value}</span>
            </div>
          ))}
          {part.measurements &&
            Object.entries(part.measurements).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="font-medium capitalize">{key}:</span>
                <span>
                  {value.isRange
                    ? `${value.min} - ${value.max} ${value.unit}`
                    : `${value.value} ${value.unit}`}
                </span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Tag component
const TagItem = ({ tag, onRemove }) => {
  return (
    <Badge variant="secondary" className="gap-1">
      {tag.label}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-4 w-4 p-0 hover:bg-transparent"
        onClick={() => onRemove(tag.id)}
      >
        <X className="h-3 w-3" />
      </Button>
    </Badge>
  );
};

// Add Part Dialog
const AddPartDialog = ({ isOpen, onClose, onSave, editPart = null }) => {
  const [partName, setPartName] = useState(editPart?.name || "");
  const [attributes, setAttributes] = useState(editPart?.attributes || {});
  const [measurements, setMeasurements] = useState(
    editPart?.measurements || {}
  );
  const [newMeasurement, setNewMeasurement] = useState({
    name: "",
    isRange: false,
    value: "",
    min: "",
    max: "",
    unit: "cm",
  });

  const handleAttributeChange = (attribute, value) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const handleAddMeasurement = () => {
    if (!newMeasurement.name) return;

    setMeasurements((prev) => ({
      ...prev,
      [newMeasurement.name]: {
        isRange: newMeasurement.isRange,
        value: newMeasurement.value,
        min: newMeasurement.min,
        max: newMeasurement.max,
        unit: newMeasurement.unit,
      },
    }));

    setNewMeasurement({
      name: "",
      isRange: false,
      value: "",
      min: "",
      max: "",
      unit: "cm",
    });
  };

  const handleRemoveMeasurement = (name) => {
    setMeasurements((prev) => {
      const newMeasurements = { ...prev };
      delete newMeasurements[name];
      return newMeasurements;
    });
  };

  const handleSave = () => {
    if (!partName.trim()) return;

    onSave({
      id: editPart?.id || `part-${Date.now()}`,
      name: partName,
      attributes,
      measurements,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editPart ? "Edit Part" : "Add Object Part"}
          </DialogTitle>
          <DialogDescription>
            Describe a part of your mystery object with attributes and
            measurements
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="part-name">Part Name</Label>
            <Input
              id="part-name"
              value={partName}
              onChange={(e) => setPartName(e.target.value)}
              placeholder="e.g., Handle, Base, Blade, etc."
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Attributes</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Select
                  value={attributes.material || ""}
                  onValueChange={(value) =>
                    handleAttributeChange("material", value)
                  }
                >
                  <SelectTrigger id="material">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {PREDEFINED_FIELDS.material.map((material) => (
                      <SelectItem key={material} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select
                  value={attributes.color || ""}
                  onValueChange={(value) =>
                    handleAttributeChange("color", value)
                  }
                >
                  <SelectTrigger id="color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {PREDEFINED_FIELDS.color.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shape">Shape</Label>
                <Select
                  value={attributes.shape || ""}
                  onValueChange={(value) =>
                    handleAttributeChange("shape", value)
                  }
                >
                  <SelectTrigger id="shape">
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    {PREDEFINED_FIELDS.shape.map((shape) => (
                      <SelectItem key={shape} value={shape}>
                        {shape}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="texture">Texture</Label>
                <Select
                  value={attributes.texture || ""}
                  onValueChange={(value) =>
                    handleAttributeChange("texture", value)
                  }
                >
                  <SelectTrigger id="texture">
                    <SelectValue placeholder="Select texture" />
                  </SelectTrigger>
                  <SelectContent>
                    {PREDEFINED_FIELDS.texture.map((texture) => (
                      <SelectItem key={texture} value={texture}>
                        {texture}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={attributes.condition || ""}
                  onValueChange={(value) =>
                    handleAttributeChange("condition", value)
                  }
                >
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {PREDEFINED_FIELDS.condition.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="other">Other Description</Label>
                <Input
                  id="other"
                  value={attributes.other || ""}
                  onChange={(e) =>
                    handleAttributeChange("other", e.target.value)
                  }
                  placeholder="Any other details"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Measurements</h3>

            {Object.entries(measurements).length > 0 && (
              <div className="space-y-2">
                {Object.entries(measurements).map(([name, measurement]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-md border p-2"
                  >
                    <div>
                      <span className="font-medium capitalize">{name}: </span>
                      <span>
                        {measurement.isRange
                          ? `${measurement.min} - ${measurement.max} ${measurement.unit}`
                          : `${measurement.value} ${measurement.unit}`}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveMeasurement(name)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 rounded-md border p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="measurement-name">Measurement Name</Label>
                  <Input
                    id="measurement-name"
                    value={newMeasurement.name}
                    onChange={(e) =>
                      setNewMeasurement((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="e.g., Length, Width, Height, Weight"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="range-switch"
                    checked={newMeasurement.isRange}
                    onCheckedChange={(checked) =>
                      setNewMeasurement((prev) => ({
                        ...prev,
                        isRange: checked,
                      }))
                    }
                  />
                  <Label htmlFor="range-switch">Value Range</Label>
                </div>
              </div>

              {newMeasurement.isRange ? (
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="min-value">Minimum</Label>
                    <Input
                      id="min-value"
                      type="number"
                      value={newMeasurement.min}
                      onChange={(e) =>
                        setNewMeasurement((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      placeholder="Min value"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-value">Maximum</Label>
                    <Input
                      id="max-value"
                      type="number"
                      value={newMeasurement.max}
                      onChange={(e) =>
                        setNewMeasurement((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      placeholder="Max value"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select
                      value={newMeasurement.unit}
                      onValueChange={(value) =>
                        setNewMeasurement((prev) => ({ ...prev, unit: value }))
                      }
                    >
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lb">lb</SelectItem>
                        <SelectItem value="oz">oz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="exact-value">Value</Label>
                    <Input
                      id="exact-value"
                      type="number"
                      value={newMeasurement.value}
                      onChange={(e) =>
                        setNewMeasurement((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      placeholder="Exact value"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select
                      value={newMeasurement.unit}
                      onValueChange={(value) =>
                        setNewMeasurement((prev) => ({ ...prev, unit: value }))
                      }
                    >
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                        <SelectItem value="in">in</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lb">lb</SelectItem>
                        <SelectItem value="oz">oz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={handleAddMeasurement}
                disabled={
                  !newMeasurement.name ||
                  (newMeasurement.isRange
                    ? !newMeasurement.min || !newMeasurement.max
                    : !newMeasurement.value)
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Measurement
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!partName.trim()}>
            Save Part
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Add Tag Dialog
const AddTagDialog = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("predefined");
  const [selectedCategory, setSelectedCategory] = useState(
    TAG_CATEGORIES[0].id
  );
  const [selectedTags, setSelectedTags] = useState([]);
  const [wikidataQuery, setWikidataQuery] = useState("");
  const [wikidataResults, setWikidataResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleTagToggle = (tag) => {
    const isSelected = selectedTags.some((t) => t.id === tag.id);

    if (isSelected) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleWikidataSearch = async () => {
    if (!wikidataQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchWikidata(wikidataQuery);
      setWikidataResults(results);
    } catch (error) {
      console.error("Error searching Wikidata:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleWikidataSelect = (item) => {
    const isSelected = selectedTags.some((t) => t.id === item.id);

    if (!isSelected) {
      setSelectedTags([
        ...selectedTags,
        {
          id: item.id,
          label: item.label,
          source: "wikidata",
          description: item.description,
        },
      ]);
    }
  };

  const handleSave = () => {
    onSave(selectedTags);
    onClose();
  };

  const currentCategory = TAG_CATEGORIES.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Tags</DialogTitle>
          <DialogDescription>
            Add tags to help categorize and identify your mystery object
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="predefined"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predefined">Predefined Tags</TabsTrigger>
            <TabsTrigger value="wikidata">Wikidata Search</TabsTrigger>
          </TabsList>

          <TabsContent value="predefined" className="space-y-4 pt-4">
            <div className="flex flex-wrap gap-2">
              {TAG_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {currentCategory?.tags.map((tag) => {
                const tagObj = {
                  id: `${currentCategory.id}-${tag}`,
                  label: tag,
                  source: "predefined",
                  category: currentCategory.name,
                };
                const isSelected = selectedTags.some((t) => t.id === tagObj.id);

                return (
                  <div
                    key={tagObj.id}
                    className={`cursor-pointer rounded-md border p-2 transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => handleTagToggle(tagObj)}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="wikidata" className="space-y-4 pt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={wikidataQuery}
                  onChange={(e) => setWikidataQuery(e.target.value)}
                  placeholder="Search Wikidata..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleWikidataSearch();
                    }
                  }}
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  </div>
                )}
              </div>
              <Button
                onClick={handleWikidataSearch}
                disabled={!wikidataQuery.trim() || isSearching}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            <ScrollArea className="h-60 rounded-md border p-2">
              {wikidataResults.length > 0 ? (
                <div className="space-y-2">
                  {wikidataResults.map((item) => {
                    const isSelected = selectedTags.some(
                      (t) => t.id === item.id
                    );

                    return (
                      <div
                        key={item.id}
                        className={`cursor-pointer rounded-md p-2 transition-colors ${
                          isSelected ? "bg-primary/10" : "hover:bg-muted"
                        }`}
                        onClick={() => handleWikidataSelect(item)}
                      >
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  {wikidataQuery.trim()
                    ? isSearching
                      ? "Searching..."
                      : "No results found"
                    : "Search for tags in Wikidata"}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <div className="font-medium">
            Selected Tags ({selectedTags.length})
          </div>
          {selectedTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="gap-1">
                  {tag.label}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleTagToggle(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No tags selected
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Add Tags</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function SubmitForm() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    anonymous: false,
    images: {
      main: null,
      additional: [],
    },
  });
  const [objectParts, setObjectParts] = useState([]);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dialog states
  const [isPartDialogOpen, setIsPartDialogOpen] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [editingPartId, setEditingPartId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // In a real app, you would upload the file to a server
    // For this demo, we'll create a local URL
    const imageUrl = URL.createObjectURL(file);

    if (type === "main") {
      setFormData((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          main: imageUrl,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          additional: [...prev.images.additional, imageUrl],
        },
      }));
    }

    // Clear any image-related errors
    if (errors.images) {
      setErrors((prev) => ({
        ...prev,
        images: null,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    if (index === "main") {
      setFormData((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          main: null,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          additional: prev.images.additional.filter((_, i) => i !== index),
        },
      }));
    }
  };

  const handleAddPart = () => {
    setEditingPartId(null);
    setIsPartDialogOpen(true);
  };

  const handleEditPart = (partId) => {
    setEditingPartId(partId);
    setIsPartDialogOpen(true);
  };

  const handleDeletePart = (partId) => {
    setObjectParts(objectParts.filter((part) => part.id !== partId));
  };

  const handleSavePart = (part) => {
    if (editingPartId) {
      setObjectParts(
        objectParts.map((p) => (p.id === editingPartId ? part : p))
      );
    } else {
      setObjectParts([...objectParts, part]);
    }
  };

  const handleAddTags = () => {
    setIsTagDialogOpen(true);
  };

  const handleSaveTags = (newTags) => {
    // Filter out duplicates
    const uniqueTags = newTags.filter(
      (newTag) => !tags.some((existingTag) => existingTag.id === newTag.id)
    );

    setTags([...tags, ...uniqueTags]);
  };

  const handleRemoveTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.images.main) {
      newErrors.images = "Main image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would send the data to your API
      console.log("Submitting mystery object:", {
        ...formData,
        parts: objectParts,
        tags: tags.map((tag) => tag.label),
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to home page or success page
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be logged in to submit a mystery object. Please log in
            or create an account.
          </AlertDescription>
        </Alert>
        <div className="flex gap-4">
          <Button onClick={() => router.push("/login")}>Log In</Button>
          <Button variant="outline" onClick={() => router.push("/register")}>
            Create Account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="parts">Object Parts</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What is this mysterious object?"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the object, where you found it, and any other relevant details..."
              className={`min-h-32 ${
                errors.description ? "border-destructive" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where was this object found? (City, Country)"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={formData.anonymous}
              onCheckedChange={(checked) =>
                handleCheckboxChange("anonymous", checked)
              }
            />
            <Label htmlFor="anonymous" className="text-sm font-normal">
              Submit anonymously (your username will not be displayed)
            </Label>
          </div>
        </TabsContent>

        <TabsContent value="parts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Object Parts</h3>
            <Button onClick={handleAddPart}>
              <Plus className="mr-2 h-4 w-4" />
              Add Part
            </Button>
          </div>

          {objectParts.length > 0 ? (
            <div className="space-y-4">
              {objectParts.map((part) => (
                <ObjectPart
                  key={part.id}
                  part={part}
                  onEdit={handleEditPart}
                  onDelete={handleDeletePart}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-8 text-center">
              <h3 className="text-xl font-semibold">No parts added yet</h3>
              <p className="mb-4 text-muted-foreground">
                Add parts to describe different components of your mystery
                object
              </p>
              <Button onClick={handleAddPart}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Part
              </Button>
            </div>
          )}

          {/* Part Dialog */}
          {isPartDialogOpen && (
            <AddPartDialog
              isOpen={isPartDialogOpen}
              onClose={() => setIsPartDialogOpen(false)}
              onSave={handleSavePart}
              editPart={
                editingPartId
                  ? objectParts.find((p) => p.id === editingPartId)
                  : null
              }
            />
          )}
        </TabsContent>

        <TabsContent value="tags" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Tags</h3>
            <Button onClick={handleAddTags}>
              <Plus className="mr-2 h-4 w-4" />
              Add Tags
            </Button>
          </div>

          {tags.length > 0 ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagItem key={tag.id} tag={tag} onRemove={handleRemoveTag} />
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {Object.entries(
                  tags.reduce((acc, tag) => {
                    const category = tag.category || "Other";
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(tag);
                    return acc;
                  }, {})
                ).map(([category, categoryTags]) => (
                  <Card key={category}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {categoryTags.map((tag) => (
                          <Badge key={tag.id} variant="outline">
                            {tag.label}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-8 text-center">
              <h3 className="text-xl font-semibold">No tags added yet</h3>
              <p className="mb-4 text-muted-foreground">
                Add tags to help categorize and identify your mystery object
              </p>
              <Button onClick={handleAddTags}>
                <Plus className="mr-2 h-4 w-4" />
                Add Tags
              </Button>
            </div>
          )}

          {/* Tag Dialog */}
          {isTagDialogOpen && (
            <AddTagDialog
              isOpen={isTagDialogOpen}
              onClose={() => setIsTagDialogOpen(false)}
              onSave={handleSaveTags}
            />
          )}
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <div className="space-y-2">
            <Label>
              Main Image <span className="text-destructive">*</span>
            </Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                className={`border-2 border-dashed ${
                  errors.images ? "border-destructive" : "border-muted"
                }`}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {formData.images.main ? (
                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                      <Image
                        src={formData.images.main || "/placeholder.svg"}
                        alt="Main image"
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8"
                        onClick={() => handleRemoveImage("main")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Camera className="mb-2 h-10 w-10 text-muted-foreground" />
                      <p className="mb-4 text-center text-sm text-muted-foreground">
                        Upload the main image of your mystery object
                      </p>
                      <Label
                        htmlFor="main-image-upload"
                        className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        <Upload className="mr-2 inline-block h-4 w-4" />
                        Upload Image
                      </Label>
                      <Input
                        id="main-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, "main")}
                      />
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-2">
                <p className="text-sm font-medium">Tips for good images:</p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Use good lighting to show details clearly</li>
                  <li>Include something for scale (e.g., a coin or ruler)</li>
                  <li>Capture multiple angles if possible</li>
                  <li>Make sure the object is in focus</li>
                </ul>
                {errors.images && (
                  <p className="text-sm text-destructive">{errors.images}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Additional Images (Optional)</Label>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {formData.images.additional.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-md border"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Additional image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {formData.images.additional.length < 5 && (
                <Card className="aspect-square border-2 border-dashed border-muted">
                  <CardContent className="flex h-full flex-col items-center justify-center p-6">
                    <Plus className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="mb-4 text-center text-sm text-muted-foreground">
                      Add more images
                    </p>
                    <Label
                      htmlFor="additional-image-upload"
                      className="cursor-pointer rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
                    >
                      Upload
                    </Label>
                    <Input
                      id="additional-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "additional")}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Mystery Object"}
        </Button>
      </div>
    </form>
  );
}
