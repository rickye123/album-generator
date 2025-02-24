import { getCurrentUser } from "@aws-amplify/auth";

export async function fetchUser() {
    try {
        const user = await getCurrentUser();
        console.log("User Info:", user);
        if (user.signInDetails) {
            console.log("User ID (sub):", user.signInDetails.loginId); // 👈 Correct way to get userId
        } else {
            console.log("User signInDetails is undefined");
        }
        return user;
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