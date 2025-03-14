export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) return "";

  // Options for date formatting
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
