import axios from "axios";

const baseUrl = `${process.env.API_ENDPOINT || "https://api.solvechess.xyz"}/auth`;

export const getUserId = async (): Promise<string | null> => {
    try {
        const endpoint = `${baseUrl}/userId`;
        const userDataResponse = await axios.get(endpoint, { withCredentials: true });

        const userId = userDataResponse.data !== "" ? userDataResponse.data : null;

        return userId;
    } catch(error) {
        console.error('Error fetching userId:', error);
        throw error;
    }
};

export const googleLogin = async (accessToken: string) => {
    try {
        const endpoint = `${baseUrl}/google-login`;
        await axios.post(endpoint, { accessToken }, { withCredentials: true });
    } catch(error) {
        console.error('Error authenticating with google:', error);
        throw error;
    }
}

export const logout = async () => {
    try {
        const endpoint = `${baseUrl}/logout`;
        await axios.post(endpoint, null, { withCredentials: true });
    } catch(error) {
        console.error('Error logging out:', error);
        throw error;
    }
}