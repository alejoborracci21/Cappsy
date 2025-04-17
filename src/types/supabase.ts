export type Database = {
    public: {
      Tables: {
        posts_schedule: {
          Row: {
            id: string
            user_id: string
            title: string
            scheduled_date: string
            platform: string | null
            created_at: string | null
          }
          Insert: {
            id?: string
            user_id?: string
            title: string
            scheduled_date: string
            platform?: string | null
            created_at?: string | null
          }
          Update: {
            title?: string
            scheduled_date?: string
            platform?: string | null
          }
        }
      }
      Views: {}
      Functions: {}
      Enums: {}
    }
  }
  