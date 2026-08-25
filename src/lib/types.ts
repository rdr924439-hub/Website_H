export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
}

export interface DepartmentEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string | null;
  image_url: string | null;
  created_at: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  email: string;
  bio: string;
  photo_url: string | null;
  research_areas: string[];
  office: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}
