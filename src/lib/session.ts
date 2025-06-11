export const getSession = () => {
    if (typeof window !== 'undefined') {
        const session = localStorage.getItem('session');
        return session;
    }
    return null;
}
