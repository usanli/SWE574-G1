"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostDetails from "@/components/post-details";
import { postService } from "@/lib/api-service";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Properly handle params as async in Next.js 13+
export default function PostPage({ params }) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract ID safely from params
  useEffect(() => {
    const getParams = async () => {
      try {
        // Handle params as a Promise if needed
        const resolvedParams = params instanceof Promise ? await params : params;
        setId(resolvedParams.id);
      } catch (err) {
        console.error("Error resolving params:", err);
        setError("Failed to load post details");
        setLoading(false);
      }
    };
    
    getParams();
  }, [params]);

  // Fetch post data once we have the ID
  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      
      try {
        console.log("Fetching post with ID:", id);
        
        // Get auth token if available
        const token = localStorage.getItem('authToken');
        
        // Make API request with authorization header
        const response = await fetch(`http://localhost:8000/mysteries/${id}`, {
          headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post not found");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const postData = await response.json();
        console.log("Fetched post data:", postData);
        
        setPost(postData);
      } catch (error) {
        console.error(`Error fetching post:`, error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
          <p>Loading mystery object...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-2xl font-bold">Mystery Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          {error || "The mystery you're looking for does not exist or has been removed."}
        </p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    );
  }

  return <PostDetails post={post} />;
}
