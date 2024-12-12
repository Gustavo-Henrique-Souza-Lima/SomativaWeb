// SRC/AUTH.JS
export function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

export function logout() {
    localStorage.removeItem('token');
}