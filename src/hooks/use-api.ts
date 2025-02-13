import { toast } from 'sonner';
import { useAuth } from '../contexts/auth-context';

interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: object;
}

export const useApi = () => {
    const { token } = useAuth();

    const getToken = () => {
        return token || localStorage.getItem("token"); // Lấy token từ Context, nếu không có thì lấy từ localStorage
    };

    const callApi = async (endpoint: string, options: ApiOptions = {}) => {
        const { method = 'GET', body } = options;
        const currentToken = getToken(); // Lấy token đã cập nhật

        if (!currentToken) {
            console.error("Không tìm thấy token! Người dùng có thể chưa đăng nhập.");
            throw new Error("Unauthorized - Token is missing");
        }

        let contentType = "application/json";
        if (body instanceof FormData) {
            contentType = "multipart/form-data";
        }

        try {
            const response: any = await fetch(`https://localhost:8000/${endpoint}`, {
                method,
                headers: {
                    'Content-Type': contentType,
                    'Authorization': `Bearer ${currentToken}`,
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            // Chỉ gọi response.json() một lần
            const data = await response.json();
            
            if (data?.isSuccess !== true) {
                toast.error(data?.detail);
            } 

            return data;
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    };

    return { callApi };
};