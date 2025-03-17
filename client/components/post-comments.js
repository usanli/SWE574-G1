"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  ChevronDown,
  Lightbulb,
  HelpCircle,
  MessageCircle,
  Award,
  ArrowLeft,
  ArrowRight,
  Reply,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Comment type icons and colors
const COMMENT_TYPES = {
  guess: {
    icon: MessageCircle,
    label: "Guess",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    category: "discussion",
  },
  discussion: {
    icon: MessageSquare,
    label: "Discussion",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300",
    category: "discussion",
  },
  hint: {
    icon: Lightbulb,
    label: "Hint",
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    category: "discussion",
  },
  expert: {
    icon: Award,
    label: "Expert Answer",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    category: "discussion",
  },
  question: {
    icon: HelpCircle,
    label: "Question",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    category: "question",
  },
};

// Process comments to organize them by category and parent-child relationships
function processComments(comments) {
  if (!Array.isArray(comments)) {
    console.warn("Comments is not an array:", comments);
    return { discussion: [], questions: [] };
  }
  
  // Separate comments by category
  const discussionComments = comments.filter(
    (c) =>
      c.category === "guess" ||
      c.category === "discussion" ||
      c.category === "hint" ||
      c.category === "expert" ||
      c.category === "identification" // For backward compatibility
  );

  const questionComments = comments.filter((c) => c.category === "question");

  // Organize into threads (parent comments and their replies)
  const organizeThreads = (commentList) => {
    const parentComments = commentList.filter(
      (c) => !c.parent_id && !c.is_reply
    );
    const childComments = commentList.filter((c) => c.parent_id || c.is_reply);

    // Sort parent comments by featured first, then by date (newest first)
    parentComments.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.created_at) - new Date(a.created_at);
    });

    // Attach child comments to their parents
    const threaded = parentComments.map((parent) => {
      const children = childComments
        .filter((child) => child.parent_id === parent.id)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      return {
        ...parent,
        replies: children,
      };
    });

    return threaded;
  };

  return {
    discussion: organizeThreads(discussionComments),
    questions: organizeThreads(questionComments),
  };
}

// Comment component that handles both parent comments and replies
function Comment({
  comment,
  onReply,
  onVote,
  isReply = false,
  showReplyForm = false,
  onCancelReply = () => {},
}) {
  // Use our local auth implementation
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated || false;
  
  // Ensure comment has all required properties
  if (!comment) {
    console.error("Comment object is undefined");
    return null;
  }
  
  const [replyContent, setReplyContent] = useState("");
  const [voteStatus, setVoteStatus] = useState(null); // null, 'upvote', or 'downvote'
  const [voteCount, setVoteCount] = useState(
    comment.votes
      ? comment.votes.filter((v) => v.type === "upvote").length -
          comment.votes.filter((v) => v.type === "downvote").length
      : 0
  );

  // Get comment type info with fallback
  let commentType = COMMENT_TYPES[comment.category] || COMMENT_TYPES.discussion;
  
  // If it's a question type comment, override with question styling
  if (comment.category?.toLowerCase() === 'question') {
    commentType = COMMENT_TYPES.question;
  }

  const TypeIcon = commentType.icon;

  const handleVote = (type) => {
    if (!isAuthenticated) return;

    // If already voted the same way, remove vote
    if (voteStatus === type) {
      setVoteStatus(null);
      setVoteCount(type === "upvote" ? voteCount - 1 : voteCount + 1);
    }
    // If voted the opposite way, switch vote
    else if (voteStatus !== null) {
      setVoteStatus(type);
      setVoteCount(type === "upvote" ? voteCount + 2 : voteCount - 2);
    }
    // If not voted yet, add vote
    else {
      setVoteStatus(type);
      setVoteCount(type === "upvote" ? voteCount + 1 : voteCount - 1);
    }

    onVote && onVote(comment.id, type);
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;

    onReply && onReply(comment.id, replyContent, comment.category);
    setReplyContent("");
    onCancelReply();
  };

  return (
    <div
      className={cn(
        "group relative mb-4 animate-fadeIn",
        isReply ? "ml-8 mt-3" : ""
      )}
    >
      <div className="flex">
        {/* Vote buttons */}
        <div className="mr-3 flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 rounded-full hover:bg-primary/10",
              voteStatus === "upvote" && "text-primary"
            )}
            onClick={() => handleVote("upvote")}
            disabled={!isAuthenticated}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>

          <span
            className={cn(
              "text-xs font-medium",
              voteCount > 0
                ? "text-primary"
                : voteCount < 0
                ? "text-destructive"
                : "text-muted-foreground"
            )}
          >
            {voteCount}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 rounded-full hover:bg-destructive/10",
              voteStatus === "downvote" && "text-destructive"
            )}
            onClick={() => handleVote("downvote")}
            disabled={!isAuthenticated}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage
                src={comment.author?.profile_picture_url}
                alt={comment.author?.username}
              />
              <AvatarFallback>
                {comment.author?.username?.substring(0, 2).toUpperCase() ||
                  "??"}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">
                  {comment.anonymous ? "Anonymous" : comment.author?.username}
                </span>

                <Badge
                  variant="outline"
                  className={cn("h-5 px-1.5 text-xs", commentType.color)}
                >
                  <TypeIcon className="mr-1 h-3 w-3" />
                  {commentType.label}
                </Badge>

                {comment.featured && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary dark:bg-primary/20"
                  >
                    Featured
                  </Badge>
                )}

                <span className="text-xs text-muted-foreground">
                  {formatDate(comment.created_at)}
                </span>
              </div>

              <div className="mt-1 rounded-md rounded-tl-none bg-muted/30 p-3 text-sm">
                {comment.content}
              </div>

              <div className="mt-1 flex gap-2">
                {isAuthenticated && !isReply && !showReplyForm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 px-2 text-xs"
                    onClick={() => onReply && onReply(comment.id)}
                  >
                    <MessageSquare className="h-3 w-3" />
                    Reply
                  </Button>
                )}
              </div>

              {/* Reply form */}
              {showReplyForm && (
                <div className="mt-3">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="mb-2 min-h-20 resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={onCancelReply}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSubmitReply}
                      disabled={!replyContent.trim()}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 border-l-2 border-muted pl-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onVote={onVote}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Collapsible splitter component
function CommentSplitter({
  onCollapseLeft,
  onCollapseRight,
  leftCollapsed,
  rightCollapsed,
}) {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="absolute inset-y-0 w-px bg-border"></div>

      <div className="relative z-10 flex flex-col gap-2 rounded-full border bg-background p-1 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full"
          onClick={onCollapseRight}
          title={rightCollapsed ? "Show questions" : "Hide questions"}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full"
          onClick={onCollapseLeft}
          title={leftCollapsed ? "Show discussion" : "Hide discussion"}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Comment list with lazy loading
function CommentList({
  comments = [],
  category,
  onReply,
  onSubmitReply,
  onVote,
  isAuthenticated,
}) {
  // Make sure comments is an array
  const safeComments = Array.isArray(comments) ? comments : [];
  
  const [visibleComments, setVisibleComments] = useState(5);
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentType, setCommentType] = useState(
    category === "discussion" ? "discussion" : "question"
  );
  const [newComment, setNewComment] = useState("");

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Load more comments when the load more element comes into view
  useEffect(() => {
    if (inView && visibleComments < safeComments.length) {
      setTimeout(() => {
        setVisibleComments((prev) => Math.min(prev + 5, safeComments.length));
      }, 300);
    }
  }, [inView, safeComments.length, visibleComments]);

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handleSubmitReply = (parentId, content, parentCategory) => {
    onSubmitReply && onSubmitReply(parentId, content, parentCategory);
  };

  const handleSubmitNewComment = (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    onSubmitReply && onSubmitReply(null, newComment, commentType);
    setNewComment("");
  };

  const displayedComments = safeComments.slice(0, visibleComments);
  const hasMoreComments = visibleComments < safeComments.length;

  return (
    <div className="space-y-4">
      {/* New comment form */}
      {isAuthenticated && (
        <div className="mb-6 rounded-lg border bg-card p-4">
          <form onSubmit={handleSubmitNewComment}>
            <div className="mb-3">
              <Select value={commentType} onValueChange={setCommentType}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Comment type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(COMMENT_TYPES)
                    .filter(([_, typeInfo]) => typeInfo.category === category)
                    .map(([type, typeInfo]) => (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center gap-2">
                          <typeInfo.icon className="h-4 w-4" />
                          <span>{typeInfo.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder={`Add your ${
                category === "discussion" ? "thoughts" : "question"
              }...`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3 min-h-24 resize-none"
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={!newComment.trim()}>
                Post {category === "discussion" ? "Comment" : "Question"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {!isAuthenticated && (
        <div className="mb-6 rounded-md bg-muted/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            You need to be logged in to comment
          </p>
          <Button className="mt-2" variant="outline" asChild>
            <a href="/login">Login to Comment</a>
          </Button>
        </div>
      )}

      {/* Comments list */}
      {displayedComments.length > 0 ? (
        <div className="space-y-1">
          {displayedComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onVote={onVote}
              showReplyForm={replyingTo === comment.id}
              onCancelReply={handleCancelReply}
              onSubmitReply={(content) =>
                handleSubmitReply(comment.id, content, comment.category)
              }
            />
          ))}

          {hasMoreComments && (
            <div
              ref={ref}
              className="my-4 flex cursor-pointer items-center justify-center rounded-md bg-muted/30 p-3 text-sm text-muted-foreground hover:bg-muted/50"
            >
              <span>Loading more comments...</span>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-md bg-muted/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            No {category === "discussion" ? "comments" : "questions"} yet. Be
            the first to{" "}
            {category === "discussion" ? "comment" : "ask a question"}!
          </p>
        </div>
      )}
    </div>
  );
}

// Replace with:
// Create a mock auth context to use if the real one isn't available
const useAuth = () => {
  // Check if window is defined (for SSR compatibility)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return {
      isAuthenticated: !!token,
      user: username ? { username } : null
    };
  }
  return { isAuthenticated: false, user: null };
};

export default function PostComments({ postId, initialComments = [] }) {
  // Use our local auth implementation 
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated || false;
  const user = auth?.user || null;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("discussion");
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load comments from backend on mount
  useEffect(() => {
    // This ensures we have the latest comments from the props
    if (Array.isArray(initialComments)) {
      setComments(initialComments);
    } else {
      setComments([]);
    }
    
    // Optionally fetch fresh comments from backend
    const fetchComments = async () => {
      if (!postId) return;
      
      setLoading(true);
      try {
        // Fetch comments from the backend API
        const response = await fetch(`http://localhost:8000/mysteries/${postId}/comments`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Fetched comments:", data);
        
        // Process the comments to have the required structure
        const processedComments = data.map(comment => ({
          ...comment,
          // Ensure these properties exist
          replies: comment.replies || [],
          votes: comment.votes || []
        }));
        
        setComments(processedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError(error.message);
        
        // Try to load from local storage as fallback
        try {
          const storedComments = localStorage.getItem(`comments-${postId}`);
          if (storedComments) {
            setComments(JSON.parse(storedComments));
            console.log("Loaded comments from local storage fallback");
          }
        } catch (e) {
          console.warn("Could not load comments from local storage", e);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, [postId, initialComments]);

  // Create a simplified comment submission function
  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !isAuthenticated) return;

    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('authToken');
      const username = localStorage.getItem('username');
      
      if (!token) {
        console.error("No auth token found");
        return;
      }
      
      // Create a new comment locally since the backend endpoint might not exist yet
      const newComment = {
        id: `comment-${Date.now()}`,
        content: commentText,
        author: {
          name: username || user?.username || "Anonymous",
          username: username || user?.username || "anonymous",
        },
        created_at: new Date().toISOString(),
        votes: [],
        isQuestion: activeTab === "questions"
      };
      
      console.log("Adding comment:", newComment);
      
      // Try to submit to backend if available
      try {
        const response = await fetch(`http://localhost:8000/mysteries/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            content: commentText,
            isQuestion: activeTab === "questions"
          })
        });
        
        if (response.ok) {
          const savedComment = await response.json();
          console.log("Comment saved to backend:", savedComment);
          // If we get a response, use the backend comment instead
          setComments(prev => [...prev, savedComment]);
        } else {
          // If backend fails, still add the comment locally
          setComments(prev => [...prev, newComment]);
        }
      } catch (error) {
        console.warn("Backend comment submission failed, using local comment:", error);
        // If backend fails, still add the comment locally
        setComments(prev => [...prev, newComment]);
      }
      
      setCommentText("");
    } catch (error) {
      console.error("Error handling comment:", error);
      alert("There was a problem adding your comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // We'll create a simple toast alternative
  const toast = {
    success: (message) => console.log('SUCCESS:', message),
    error: (message) => console.error('ERROR:', message),
    warning: (message) => console.warn('WARNING:', message),
    info: (message) => console.info('INFO:', message)
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Discussion section */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            leftCollapsed ? "hidden md:w-0" : "w-full md:flex-1"
          )}
        >
          <div className="p-6">
            <h3 className="mb-4 flex items-center text-lg font-semibold">
              <MessageSquare className="mr-2 h-5 w-5" />
              Discussion ({Array.isArray(comments) ? 
                comments.filter((c) => c.category?.toLowerCase() !== 'question').length : 0})
              {leftCollapsed && <ChevronDown className="ml-2 h-4 w-4" />}
            </h3>

            <CommentList
              comments={Array.isArray(comments) ? 
                comments.filter((c) => c.category?.toLowerCase() !== 'question') : []}
              category="discussion"
              onVote={(commentId, voteType) => {
                // In a real app, you would send this to your API
                console.log(`Voted ${voteType} on comment ${commentId}`);
              }}
              onSubmitReply={(parentId, content, parentCategory) => {
                // Create the comment object 
                const newComment = {
                  id: `local-${Date.now()}`,
                  mystery_id: postId,
                  parent_id: parentId || null,
                  content,
                  category: parentCategory,
                  subcategory: parentCategory,
                  anonymous: false,
                  is_reply: !!parentId,
                  created_at: new Date().toISOString(),
                  author: {
                    username: localStorage.getItem('username') || "CurrentUser",
                    profile_picture_url: null,
                  },
                  replies: [],
                  votes: []
                };

                console.log('Creating new comment:', newComment);

                // Try the backend API first
                const token = localStorage.getItem('token');
                const apiUrl = `http://localhost:8000/mysteries/${postId}/comments`;
                
                // First assume the backend might be down and update the UI immediately
                // for better user experience
                setComments(prev => {
                  const updatedComments = [...prev];
                  
                  if (parentId) {
                    // It's a reply - find the parent comment and add the reply
                    return updatedComments.map(comment => {
                      if (comment.id === parentId) {
                        return {
                          ...comment,
                          replies: [...(comment.replies || []), newComment]
                        };
                      }
                      return comment;
                    });
                  } else {
                    // It's a new top-level comment
                    return [...updatedComments, newComment];
                  }
                });

                // Then try to save to backend
                if (token) {
                  const commentData = {
                    mystery_id: postId,
                    parent_id: parentId || null,
                    content,
                    category: parentCategory,
                    subcategory: parentCategory,
                    anonymous: false,
                    is_reply: !!parentId
                  };

                  fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(commentData)
                  })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                  })
                  .then(serverComment => {
                    console.log('Comment saved to backend:', serverComment);
                    
                    // If successful, replace the temporary comment with the server version
                    setComments(prev => {
                      return prev.map(comment => {
                        if (comment.id === newComment.id) {
                          return {
                            ...serverComment,
                            replies: comment.replies || [],
                          };
                        }
                        return comment;
                      });
                    });
                    
                    toast.success('Comment saved to server');
                  })
                  .catch(error => {
                    console.warn('Backend comment save failed, using local version:', error);
                    toast.info('Comment saved locally');
                    
                    // Save the comments to local storage as a fallback
                    setComments(prev => {
                      const updatedComments = [...prev];
                      localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
                      return updatedComments;
                    });
                  });
                } else {
                  console.warn('No token, saving comment locally only');
                  toast.info('Comment saved locally (login for server sync)');
                  
                  // Save to local storage
                  setComments(prev => {
                    const updatedComments = [...prev];
                    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
                    return updatedComments;
                  });
                }
              }}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>

        {/* Splitter (visible only on desktop) */}
        <div className="hidden md:block md:w-10">
          <CommentSplitter
            onCollapseLeft={() => setLeftCollapsed(!leftCollapsed)}
            onCollapseRight={() => setRightCollapsed(!rightCollapsed)}
            leftCollapsed={leftCollapsed}
            rightCollapsed={rightCollapsed}
          />
        </div>

        {/* Questions section */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            rightCollapsed ? "hidden md:w-0" : "w-full md:flex-1"
          )}
        >
          <div className="border-t p-6 md:border-l md:border-t-0">
            <h3 className="mb-4 flex items-center text-lg font-semibold">
              <HelpCircle className="mr-2 h-5 w-5" />
              Questions ({Array.isArray(comments) ? 
                comments.filter((c) => c.category?.toLowerCase() === 'question').length : 0})
              {rightCollapsed && <ChevronDown className="ml-2 h-4 w-4" />}
            </h3>

            <CommentList
              comments={Array.isArray(comments) ? 
                comments.filter((c) => c.category?.toLowerCase() === 'question') : []}
              category="question"
              onVote={(commentId, voteType) => {
                // In a real app, you would send this to your API
                console.log(`Voted ${voteType} on comment ${commentId}`);
              }}
              onSubmitReply={(parentId, content, parentCategory) => {
                // Create the comment object 
                const newComment = {
                  id: `local-${Date.now()}`,
                  mystery_id: postId,
                  parent_id: parentId || null,
                  content,
                  category: parentCategory,
                  subcategory: parentCategory,
                  anonymous: false,
                  is_reply: !!parentId,
                  created_at: new Date().toISOString(),
                  author: {
                    username: localStorage.getItem('username') || "CurrentUser",
                    profile_picture_url: null,
                  },
                  replies: [],
                  votes: []
                };

                console.log('Creating new comment:', newComment);

                // Try the backend API first
                const token = localStorage.getItem('token');
                const apiUrl = `http://localhost:8000/mysteries/${postId}/comments`;
                
                // First assume the backend might be down and update the UI immediately
                // for better user experience
                setComments(prev => {
                  const updatedComments = [...prev];
                  
                  if (parentId) {
                    // It's a reply - find the parent comment and add the reply
                    return updatedComments.map(comment => {
                      if (comment.id === parentId) {
                        return {
                          ...comment,
                          replies: [...(comment.replies || []), newComment]
                        };
                      }
                      return comment;
                    });
                  } else {
                    // It's a new top-level comment
                    return [...updatedComments, newComment];
                  }
                });

                // Then try to save to backend
                if (token) {
                  const commentData = {
                    mystery_id: postId,
                    parent_id: parentId || null,
                    content,
                    category: parentCategory,
                    subcategory: parentCategory,
                    anonymous: false,
                    is_reply: !!parentId
                  };

                  fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(commentData)
                  })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                  })
                  .then(serverComment => {
                    console.log('Comment saved to backend:', serverComment);
                    
                    // If successful, replace the temporary comment with the server version
                    setComments(prev => {
                      return prev.map(comment => {
                        if (comment.id === newComment.id) {
                          return {
                            ...serverComment,
                            replies: comment.replies || [],
                          };
                        }
                        return comment;
                      });
                    });
                    
                    toast.success('Comment saved to server');
                  })
                  .catch(error => {
                    console.warn('Backend comment save failed, using local version:', error);
                    toast.info('Comment saved locally');
                    
                    // Save the comments to local storage as a fallback
                    setComments(prev => {
                      const updatedComments = [...prev];
                      localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
                      return updatedComments;
                    });
                  });
                } else {
                  console.warn('No token, saving comment locally only');
                  toast.info('Comment saved locally (login for server sync)');
                  
                  // Save to local storage
                  setComments(prev => {
                    const updatedComments = [...prev];
                    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
                    return updatedComments;
                  });
                }
              }}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>

        {/* Mobile tabs (visible only on mobile) */}
        <div className="block border-t md:hidden">
          <Tabs defaultValue="discussion" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="discussion">
                <MessageSquare className="mr-2 h-4 w-4" />
                Discussion ({Array.isArray(comments) ? 
                  comments.filter((c) => c.category?.toLowerCase() !== 'question').length : 0})
              </TabsTrigger>
              <TabsTrigger value="questions">
                <HelpCircle className="mr-2 h-4 w-4" />
                Questions ({Array.isArray(comments) ? 
                  comments.filter((c) => c.category?.toLowerCase() === 'question').length : 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discussion" className="p-6 pt-4">
              <CommentList
                comments={Array.isArray(comments) ? 
                  comments.filter((c) => c.category?.toLowerCase() !== 'question') : []}
                category="discussion"
                onVote={(commentId, voteType) => {
                  // In a real app, you would send this to your API
                  console.log(`Voted ${voteType} on comment ${commentId}`);
                }}
                onSubmitReply={(parentId, content, parentCategory) => {
                  // Create the comment object 
                  const newComment = {
                    id: `local-${Date.now()}`,
                    mystery_id: postId,
                    parent_id: parentId || null,
                    content,
                    category: parentCategory,
                    subcategory: parentCategory,
                    anonymous: false,
                    is_reply: !!parentId,
                    created_at: new Date().toISOString(),
                    author: {
                      username: localStorage.getItem('username') || "CurrentUser",
                      profile_picture_url: null,
                    },
                    replies: [],
                    votes: []
                  };

                  console.log('Creating new comment:', newComment);

                  // Try the backend API first
                  const token = localStorage.getItem('token');
                  const apiUrl = `http://localhost:8000/mysteries/${postId}/comments`;
                  
                  // First assume the backend might be down and update the UI immediately
                  // for better user experience
                  setComments(prev => {
                    const updatedComments = [...prev];
                    
                    if (parentId) {
                      // It's a reply - find the parent comment and add the reply
                      return updatedComments.map(comment => {
                        if (comment.id === parentId) {
                          return {
                            ...comment,
                            replies: [...(comment.replies || []), newComment]
                          };
                        }
                        return comment;
                      });
                    } else {
                      // It's a new top-level comment
                      return [...updatedComments, newComment];
                    }
                  });

                  // Then try to save to backend
                  if (token) {
                    const commentData = {
                      mystery_id: postId,
                      parent_id: parentId || null,
                      content,
                      category: parentCategory,
                      subcategory: parentCategory,
                      anonymous: false,
                      is_reply: !!parentId
                    };

                    fetch(apiUrl, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify(commentData)
                    })
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                      }
                      return response.json();
                    })
                    .then(serverComment => {
                      console.log('Comment saved to backend:', serverComment);
                      
                      // If successful, replace the temporary comment with the server version
                      setComments(prev => {
                        return prev.map(comment => {
                          if (comment.id === newComment.id) {
                            return {
                              ...serverComment,
                              replies: comment.replies || [],
                            };
                          }
                          return comment;
                        });
                      });
                      
                      toast.success('Comment saved to server');
                    })
                    .catch(error => {
                      console.warn('Backend comment save failed, using local version:', error);
                      toast.info('Comment saved locally');
                      
                      // Save the comments to local storage as a fallback
                      setComments(prev => {
                        const updatedComments = [...prev];
                        localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
                        return updatedComments;
                      });
                    });
                  } else {
                    console.warn('No token, saving comment locally only');
                    toast.info('Comment saved locally (login for server sync)');
                    
                    // Save to local storage
                    setComments(prev => {
                      const updatedComments = [...prev];
                      localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
                      return updatedComments;
                    });
                  }
                }}
                isAuthenticated={isAuthenticated}
              />
            </TabsContent>

            <TabsContent value="questions" className="p-6 pt-4">
              <CommentList
                comments={Array.isArray(comments) ? 
                  comments.filter((c) => c.category?.toLowerCase() === 'question') : []}
                category="question"
                onVote={(commentId, voteType) => {
                  // In a real app, you would send this to your API
                  console.log(`Voted ${voteType} on comment ${commentId}`);
                }}
                onSubmitReply={(parentId, content, parentCategory) => {
                  // Create the comment object 
                  const newComment = {
                    id: `local-${Date.now()}`,
                    mystery_id: postId,
                    parent_id: parentId || null,
                    content,
                    category: parentCategory,
                    subcategory: parentCategory,
                    anonymous: false,
                    is_reply: !!parentId,
                    created_at: new Date().toISOString(),
                    author: {
                      username: localStorage.getItem('username') || "CurrentUser",
                      profile_picture_url: null,
                    },
                    replies: [],
                    votes: []
                  };

                  console.log('Creating new comment:', newComment);

                  // Try the backend API first
                  const token = localStorage.getItem('token');
                  const apiUrl = `http://localhost:8000/mysteries/${postId}/comments`;
                  
                  // First assume the backend might be down and update the UI immediately
                  // for better user experience
                  setComments(prev => {
                    const updatedComments = [...prev];
                    
                    if (parentId) {
                      // It's a reply - find the parent comment and add the reply
                      return updatedComments.map(comment => {
                        if (comment.id === parentId) {
                          return {
                            ...comment,
                            replies: [...(comment.replies || []), newComment]
                          };
                        }
                        return comment;
                      });
                    } else {
                      // It's a new top-level comment
                      return [...updatedComments, newComment];
                    }
                  });

                  // Then try to save to backend
                  if (token) {
                    const commentData = {
                      mystery_id: postId,
                      parent_id: parentId || null,
                      content,
                      category: parentCategory,
                      subcategory: parentCategory,
                      anonymous: false,
                      is_reply: !!parentId
                    };

                    fetch(apiUrl, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify(commentData)
                    })
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                      }
                      return response.json();
                    })
                    .then(serverComment => {
                      console.log('Comment saved to backend:', serverComment);
                      
                      // If successful, replace the temporary comment with the server version
                      setComments(prev => {
                        return prev.map(comment => {
                          if (comment.id === newComment.id) {
                            return {
                              ...serverComment,
                              replies: comment.replies || [],
                            };
                          }
                          return comment;
                        });
                      });
                      
                      toast.success('Comment saved to server');
                    })
                    .catch(error => {
                      console.warn('Backend comment save failed, using local version:', error);
                      toast.info('Comment saved locally');
                      
                      // Save the comments to local storage as a fallback
                      setComments(prev => {
                        const updatedComments = [...prev];
                        localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
                        return updatedComments;
                      });
                    });
                  } else {
                    console.warn('No token, saving comment locally only');
                    toast.info('Comment saved locally (login for server sync)');
                    
                    // Save to local storage
                    setComments(prev => {
                      const updatedComments = [...prev];
                      localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
                      return updatedComments;
                    });
                  }
                }}
                isAuthenticated={isAuthenticated}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  );
}
