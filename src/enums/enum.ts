export enum TaskTag {
    Morning = "Morning",
    Afternoon = "Afternoon",
    Maintenance = "Maintenance",
    Meeting = "Meeting",
    Call = "Call",
    Inspection = "Inspection",
    Repair = "Repair",
    Review = "Review",
    Update = "Update",
    Evening = "Evening",
    Overlap = "Overlap",
  }

  export const TagColors: Record<TaskTag, string> = {
    [TaskTag.Morning]: "#34D399",
    [TaskTag.Afternoon]: "#F87171",
    [TaskTag.Maintenance]: "#F472B6",
    [TaskTag.Meeting]: "#8B5CF6",
    [TaskTag.Call]: "#F59E0B",
    [TaskTag.Inspection]: "#6EE7B7",
    [TaskTag.Repair]: "#10B981",
    [TaskTag.Review]: "#14B8A6",
    [TaskTag.Update]: "#FB923C",
    [TaskTag.Evening]: "#A78BFA",
    [TaskTag.Overlap]: "#F43F5E",
  };