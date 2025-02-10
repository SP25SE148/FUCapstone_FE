import { useApi } from '@/hooks/use-api';

interface Campus {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: string | null;
}

export const useCampusApi = () => {
  const { callApi } = useApi();

  const fetchCampusList = async (): Promise<Campus[]> => {
    try {
      const response = await callApi("fuc/AcademicManagement/campus", {
        method: "GET",
      });

      if (!Array.isArray(response)) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.error("Error fetching campus data:", error);
      throw error;
    }
  };

  const addCampus = async (data: Campus) => {
    try {
      const response = await callApi("fuc/AcademicManagement/campus", {
        method: "POST",
        body: data,
      });

      if (response && response.id) {
        alert("Campus added successfully");
      } else {
        throw new Error("Failed to add campus");
      }
    } catch (error) {
      console.error("Error adding campus:", error);
      alert("Failed to add campus");
    }
  };

  const updateCampus = async (data: Campus) => {
    try {
      const response = await callApi("fuc/AcademicManagement/campus", {
        method: "PUT",
        body: data,
      });

      if (response && response.id) {
        alert("Campus updated successfully");
      } else {
        throw new Error("Failed to update campus");
      }
    } catch (error) {
      console.error("Error updating campus:", error);
      alert("Failed to update campus");
    }
  };

  const removeCampus = async (id: string) => {
    try {
      await callApi(`fuc/AcademicManagement/campus/${id}`, {
        method: "DELETE",
      });
      alert("Campus removed successfully");
    } catch (error) {
      console.error("Error removing campus:", error);
      alert("Failed to remove campus");
    }
  };

  return { fetchCampusList, addCampus, updateCampus, removeCampus };
};