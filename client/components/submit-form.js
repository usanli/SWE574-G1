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
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Upload, X, Plus, Camera, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CATEGORIES_WITH_ATTRIBUTES } from "@/lib/categories";

export default function SubmitForm() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    tags: [],
    location: "",
    anonymous: false,
    images: {
      main: null,
      additional: [],
    },
    attributes: {},
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customTag, setCustomTag] = useState("");

  // Get available subcategories based on selected category
  const availableSubcategories = formData.category
    ? CATEGORIES_WITH_ATTRIBUTES.find((cat) => cat.id === formData.category)
        ?.subcategories || []
    : [];

  // Get available attributes based on selected category and subcategory
  const availableAttributes = formData.subcategory
    ? availableSubcategories.find(
        (subcat) => subcat.id === formData.subcategory
      )?.attributes || []
    : [];

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

  const handleSelectChange = (name, value) => {
    setFormData((prev) => {
      // If changing category, reset subcategory and attributes
      if (name === "category") {
        return {
          ...prev,
          [name]: value,
          subcategory: "",
          attributes: {},
        };
      }
      // If changing subcategory, reset attributes
      if (name === "subcategory") {
        return {
          ...prev,
          [name]: value,
          attributes: {},
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });

    // Clear errors for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleAttributeChange = (attributeId, value) => {
    setFormData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attributeId]: value,
      },
    }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAddTag = () => {
    if (customTag.trim() && !formData.tags.includes(customTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, customTag.trim()],
      }));
      setCustomTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
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

    if (!formData.category) {
      newErrors.category = "Category is required";
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
      console.log("Submitting mystery object:", formData);

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
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="details">Details & Attributes</TabsTrigger>
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger
                  id="category"
                  className={errors.category ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES_WITH_ATTRIBUTES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Select
                value={formData.subcategory}
                onValueChange={(value) =>
                  handleSelectChange("subcategory", value)
                }
                disabled={
                  !formData.category || availableSubcategories.length === 0
                }
              >
                <SelectTrigger id="subcategory">
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubcategories.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Add a tag"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddTag}
                disabled={!customTag.trim()}
              >
                Add
              </Button>
            </div>
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

        <TabsContent value="details" className="space-y-6">
          {!formData.category ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Select a category first</AlertTitle>
              <AlertDescription>
                Please select a category in the Basic Information tab to see
                available attributes.
              </AlertDescription>
            </Alert>
          ) : !formData.subcategory ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Select a subcategory</AlertTitle>
              <AlertDescription>
                Please select a subcategory to see specific attributes for this
                type of object.
              </AlertDescription>
            </Alert>
          ) : availableAttributes.length === 0 ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>No attributes available</AlertTitle>
              <AlertDescription>
                This subcategory doesn't have any specific attributes. You can
                still submit your object with the basic information.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Attributes for {formData.subcategory}
              </h3>
              <p className="text-sm text-muted-foreground">
                Fill in the attributes below to provide more specific
                information about your object.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {availableAttributes.map((attribute) => (
                  <div key={attribute.id} className="space-y-2">
                    <Label htmlFor={attribute.id}>{attribute.name}</Label>
                    {attribute.type === "text" ? (
                      <Input
                        id={attribute.id}
                        value={formData.attributes[attribute.id] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attribute.id, e.target.value)
                        }
                        placeholder={
                          attribute.placeholder ||
                          `Enter ${attribute.name.toLowerCase()}`
                        }
                      />
                    ) : attribute.type === "select" ? (
                      <Select
                        value={formData.attributes[attribute.id] || ""}
                        onValueChange={(value) =>
                          handleAttributeChange(attribute.id, value)
                        }
                      >
                        <SelectTrigger id={attribute.id}>
                          <SelectValue
                            placeholder={`Select ${attribute.name.toLowerCase()}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {attribute.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
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
