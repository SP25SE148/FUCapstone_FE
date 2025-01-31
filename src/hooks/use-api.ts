import { useAuth } from '../contexts/auth-context';

interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: object;
}

export const useApi = () => {
    const { token } = useAuth();

    const callApi = async (endpoint: string, options: ApiOptions = {}) => {
        const { method = 'GET', body } = options;

        try {
            const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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