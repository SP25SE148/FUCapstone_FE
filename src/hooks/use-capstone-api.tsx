import { useApi } from '@/hooks/use-api';

interface Capstone {
    id: string;
    majorId: string;
    name: string;
    minMember: number;
    maxMember: number;
    reviewCount: number;
    isDeleted: boolean;
    deletedAt: string | null;
  }

export const useCapstoneApi = () => {
  const { callApi } = useApi();

  const fetchCapstoneList = async (): Promise<Capstone[]> => {
    try {
      const response = await callApi("fuc/AcademicManagement/capstone", {
        method: "GET",
      });

      if (!Array.isArray(response?.value)) {
        throw new Error("Invalid response format");
      }

      return response.value;
    } catch (error) {
      console.error("Error fetching capstone data:", error);
      throw error;
    }
  };

  return { fetchCapstoneList };
};