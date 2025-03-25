import { toast } from 'sonner';
import { useAuth } from '../contexts/auth-context';

interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: object;
    responseType?: "json" | "blob";
}

export const useApi = () => {
    const { token } = useAuth();

    const getToken = () => {
        return token
        // return token || localStorage.getItem("token"); // Lấy token từ Context, nếu không có thì lấy từ localStorage
    };

    const callApi = async (endpoint: string, options: ApiOptions = {}) => {
        const { method = "GET", body, responseType = "json" } = options; // Thêm responseType
        const currentToken = getToken(); // Lấy token

        if (!currentToken) {
            console.error("Không tìm thấy token! Người dùng có thể chưa đăng nhập.");
            throw new Error("Unauthorized - Token is missing");
        }

        let headers: HeadersInit = {
            "Authorization": `Bearer ${currentToken}`,
        };

        let requestBody: BodyInit | undefined = undefined;

        if (body instanceof FormData) {
            requestBody = body; // Nếu là FormData, giữ nguyên
        } else if (body && typeof body === "object") {
            headers["Content-Type"] = "application/json";
            requestBody = JSON.stringify(body);
        }

        try {
            const response = await fetch(`https://localhost:8000/${endpoint}`, {
                method,
                headers,
                body: requestBody,
            });

            // Nếu responseType là "blob", trả về blob thay vì JSON
            if (responseType === "blob") {
                return await response.blob();
            }

            const data = await response.json();

            if (data?.isSuccess !== true && data?.detail === "The specified result value is null.") {
                console.log(data?.detail || "Something went wrong, please try again later");
            } else if (data?.isSuccess !== true) {
                toast.error(data?.detail || "Something went wrong, please try again later");
            }

            return data;
        } catch (error) {
            console.error("API call error:", error);
            throw error;
        }
    };

    return { callApi };
};