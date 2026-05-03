export interface StudySession {
  id: number;
  user_id: number;
  routine_slot_id: number;
  started_at: string;
  completed_at: string | null;
  routine_slot?: {
    id: number;
    subject_id: number;
    start_time: string;
    end_time: string;
    subject?: {
      id: number;
      title: string;
    };
  };
}
