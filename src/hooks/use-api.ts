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
        const { method = "GET", body } = options;
        const currentToken = getToken(); // Lấy token đã cập nhật

        if (!currentToken) {
            console.error("Không tìm thấy token! Người dùng có thể chưa đăng nhập.");
            throw new Error("Unauthorized - Token is missing");
        }

        let headers: HeadersInit = {
            "Authorization": `Bearer ${currentToken}`,
        };

        let requestBody: BodyInit | undefined = undefined;

        if (body instanceof FormData) {
            // Nếu là FormData, giữ nguyên body, không cần headers "Content-Type"
            requestBody = body;
        } else if (body && typeof body === "object") {
            // Nếu là object, stringify thành JSON
            headers["Content-Type"] = "application/json";
            requestBody = JSON.stringify(body);
        }

        try {
            const response = await fetch(`https://localhost:8000/${endpoint}`, {
                method,
                headers,
                body: requestBody,
            });

            const data = await response.json();

            if (data?.isSuccess !== true) {
                console.log(data?.detail || "Something wrong please try again later");
            }

            return data;
        } catch (error) {
            console.error("API call error:", error);
            throw error;
        }
    };

    return { callApi };
};