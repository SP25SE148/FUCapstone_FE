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
            const response = await fetch(`http://localhost:8000/${endpoint}`, {
                method,
                headers: {
                    'Content-Type': contentType,
                    'Authorization': `Bearer ${currentToken}`,
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                throw new Error('API call failed');
            }

            return await response.json();
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    };

    return { callApi };
};