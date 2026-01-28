export interface Teacher {
  id: number;              
  created_at: string;    
  updated_at: string;       
  bio: string;              
  tags: string;        
  name: string;
  designation: string;  
  profile_picture_link: string;         
  is_top_tutor: boolean;
  rating:number;
  courses:number;
  students:number;
  sessions:number;
  user_id:number
}