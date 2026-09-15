import data from '../../curriculum_data.json';

export interface Lesson {
  id: string;
  number: number;
  title: string;
  topics: string[];
  practice: string;
  homework: string;
  result: string;
}

export interface Week {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessonsCount: number;
  weeks: Week[];
}

export const courses: Course[] = data as Course[];
