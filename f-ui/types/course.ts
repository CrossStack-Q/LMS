export interface Course {
  id: number;              
  created_at: string;    
  updated_at: string;       
  title: string;              
  description: string;        
  cover_image: string;
  teacher_id: number | null;  
  short_desc: string;         
  category: string;           
  level: string;              
  price: number;
  is_free: boolean;
}