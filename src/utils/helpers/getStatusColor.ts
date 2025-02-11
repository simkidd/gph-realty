export const getStatusColor = (status: string) => {
  switch (status) {
    case "In Development":
      return "bg-blue-500"; // Blue for development
    case "In Construction":
      return "bg-yellow-500"; // Yellow for ongoing construction
    case "Completed":
      return "bg-green-500"; // Green for completed projects
    case "For Sale":
      return "bg-purple-500"; // Purple for sale listings
    case "For Rent":
      return "bg-orange-500"; // Orange for rental properties
    case "Sold":
      return "bg-gray-500"; // Gray for sold properties
    default:
      return "bg-red-500"; // Default color (fallback)
  }
};