import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";
const customFetch = async (url, { body, ...customConfig }) => {
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const headers = {
        'content_type': 'application/x-www-form-url-encoded',
    }
    
    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }


    const config = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        },
    };

    if(body) {
        config.body = getFormBody(body);
    }


    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if(data.success) {
            return {
                data: data.data,
                success: true
            };
        }

        throw new Error(data.message);
    } catch (error) {
        console.error('error', error);
        return {
            message: error.message,
            success: false,
        }
    }
};

export const getPosts = (page = 1, limit = 5) => {
    return customFetch(API_URLS.posts(page, limit), {
        method: 'GET',
    });
}

export const login = (email, password) => {
    return customFetch(API_URLS.login(), {
        method: 'POST',
        body: {email, password}
    });
};
