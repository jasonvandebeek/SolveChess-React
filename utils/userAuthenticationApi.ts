import axios from "axios";

const baseUrl = "https://api.solvechess.xyz";

export const getUserId = async (): Promise<string | null> => {
    try {
        const endpoint = `${baseUrl}/auth/userId`;
        const userDataResponse = await axios.get(endpoint, { withCredentials: true });

        const userId = userDataResponse.data !== "" ? userDataResponse.data : null;

        return userId;
    } catch(error) {
        console.error('Error fetching userId:', error);
        throw error;
    }
};

export const googleLogin = async (accessToken: string): Promise<any> => {
    try {
        axios.post(`${baseUrl}/auth/google-login`, 
            { accessToken }, 
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch(error) {
        console.error('Error authenticating with google:', error);
        throw error;
    }
}