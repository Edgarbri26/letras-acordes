export const getUserFromToken = (token) => {
    if (!token) return null;
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return payload;
    } catch (e) {
        console.error("Error parsing token:", e);
        return null;
    }
};

export const hasPermission = (user, permission) => {
    if (!user) return false;
    // Admin always has permission (fallback) or if explicitly in list
    if (user.role === 'ADMIN') return true;
    return user.permissions?.includes(permission) || false;
};
