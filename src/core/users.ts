import { getCurrentUser } from "@aws-amplify/auth";

export async function fetchUser() {
    try {
        return await getCurrentUser();
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
}

export async function getCurrentUserId() {
    const user = await fetchUser();
    if (user && user.signInDetails) {
        return user.userId;
    }
    return undefined;
}