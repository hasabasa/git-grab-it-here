
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UseTasksOptions {
  search?: string;
  page?: number;
  limit?: number;
}

interface TasksResponse {
  tasks: Array<{
    id: string;
    title: string;
    description?: string;
    deadline?: string;
    created_at: string;
  }>;
  totalCount: number;
  totalPages: number;
}

export const useTasks = ({ search = "", page = 1, limit = 10 }: UseTasksOptions = {}) => {
  return useQuery({
    queryKey: ['tasks', search, page, limit],
    queryFn: async (): Promise<TasksResponse> => {
      let query = supabase
        .from('tasks')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // Add search filter if provided
      if (search.trim()) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Add pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / limit);

      return {
        tasks: data || [],
        totalCount,
        totalPages,
      };
    },
  });
};
