<script>
    import { signIn,loggedInUser,signOut } from "$lib/pocketbase";
    import Header from "../components/Header.svelte"
</script>

<Header/>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


{#if $loggedInUser && $loggedInUser.email }

    <button on:click={signOut}>Sign Out</button>
    
{:else}
<button on:click={()=>{ signIn('google') }}>Sign In with Google</button>
<button on:click={()=>{ signIn('github') }}>Sign In with Github</button>
{/if}




