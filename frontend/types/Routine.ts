export interface RoutineSlot {
  id: number;
  subject_id: number;
  subject_title: string;
  start_time: string;
  end_time: string;
  subject?: {
    id: number;
    title: string;
    imageUrl?: string;
  };
}

export interface Routine {
  id: number;
  day_of_week: number;
  name: string;
  slots: RoutineSlot[];
}

export interface RoutineSlotPayload {
  subject_id: number;
  start_time: string;
  end_time: string;
}

export interface RoutinePayload {
  day_of_week: number;
  name: string;
  slots: RoutineSlotPayload[];
}
