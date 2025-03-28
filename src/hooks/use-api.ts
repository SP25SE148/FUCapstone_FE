import { toast } from 'sonner';
import { useAuth } from '../contexts/auth-context';

interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: object;
    responseType?: "json" | "blob";
}

export const useApi = () => {
    const { token, refreshAccessToken } = useAuth();
    const refreshToken = localStorage.getItem("refreshToken") || ""

    const getToken = () => {
        return token || localStorage.getItem("token") || ""
    };

    const callApi = async (endpoint: string, options: ApiOptions = {}) => {
        const { method = "GET", body, responseType = "json" } = options; // Thêm responseType
        const currentToken = getToken(); // Lấy token

        if (!currentToken) {
            console.error("Không tìm thấy token! Người dùng có thể chưa đăng nhập.");
            toast.error("Unauthorized - Token is missing");
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
            let response = await fetch(`https://localhost:8000/${endpoint}`, {
                method,
                headers,
                body: requestBody,
            });

            // Nếu token hết hạn (401), tự động refresh và gửi lại request
            if (response.status === 401) {
                console.log("Access token expired, refreshing...");
                await refreshAccessToken(currentToken, refreshToken);

                // Gửi lại request với token mới
                response = await fetch(`https://localhost:8000/${endpoint}`, {
                    method,
                    headers,
                    body: requestBody,
                });
            }


            // Nếu responseType là "blob", trả về blob thay vì JSON
            if (responseType === "blob") {
                return await response.blob();
            }

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (data?.isSuccess !== true && data?.detail === "The specified result value is null.") {
                console.log(data?.detail || "Something went wrong, please try again later");
            } else if (data?.isSuccess !== true) {
                toast.error(data?.detail || "Something went wrong, please try again later");
            }

            return data;
        } catch (error) {
            console.error("API call error:", error);
            toast.error(`${error}`);
        }
    };

    return { callApi };
};