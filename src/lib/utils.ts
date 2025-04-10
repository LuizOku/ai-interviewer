import { format } from "date-fns";

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    return format(date, "MMMM d, yyyy 'at' h:mm a");
  } catch {
    return "Invalid date";
  }
}
