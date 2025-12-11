export interface Lesson {
  id: number;
  title: string;
  order_index: number;
  video_url?: string;
}

export interface Section {
  id: number;
  title: string;
  order_index: number;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  sections: Section[];
}
