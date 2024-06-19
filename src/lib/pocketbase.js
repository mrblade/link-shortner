import { goto } from '$app/navigation';
import PocketBase from 'pocketbase';
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
import { writable } from 'svelte/store';
export let loggedInUser = writable(pb.authStore.model);

/**
 * @param {any} providerName
 */
export async function signIn(providerName) {
    try {
        // Authenticate using OAuth2 provider (Google in this case)
        const authData = await pb.collection('users').authWithOAuth2({ provider: providerName });

        // Check if authentication is successful
        if (authData && pb.authStore.token && pb.authStore.isValid && pb.authStore.model && pb.authStore.model.email) {
            // Update the writable store with the authenticated user's data
            loggedInUser.set(pb.authStore.model);
            goto('/dashboard')
        } else {
            // Handle the case where authentication is not successful
            loggedInUser.set(null);
            goto('/')
        }
    } catch (error) {
        // Handle any errors that occur during the authentication process
        loggedInUser.set(null);
        goto('/')
    }
}

export async function signOut(){
    pb.authStore.clear();
    loggedInUser.set(null);
    goto('/')
}