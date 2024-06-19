<script>
    import { isValidUrl, userAvatar,userName } from '$lib/helper';
    import Header from '../../components/Header.svelte';
    import { loggedInUser,signOut,pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
	import { onMount } from 'svelte';
    import { sanitizeUrl } from '@braintree/sanitize-url';
    if(!$loggedInUser && browser){
        goto('/');
    }

  
    /**
	 * @type {string | any[]}
	 */
    let links = [];
    let linksLoading = true;
    /**
	 * @type {string | null}
	 */
    let linksError = null;

    async function createShortLink(){
        var input = prompt('Enter long url');
        if(input && isValidUrl(input)){
            try {
                let results = await pb.collection('links').create({
                    url: sanitizeUrl(input),
                    // @ts-ignore
                    user: $loggedInUser.email
                })
                if(!results.id){
                    alert('Failed to create short link')
                }
                else{
                    getLinks();
                }
            } catch (error) {
                alert('API error')
            }
        }
        else{
            alert('Invalid URL')
        }

    }

    async function getLinks() {
        try {
            links = await pb.collection('links').getFullList({
                sort: '-created',
            });
        } catch (err) {
            linksError = 'API failed';
        } finally {
            linksLoading = false;
        }
    }

    /**
	 * @param {number} index
	 */
    async function deleteLink(index){
        try {
            await pb.collection('links').delete(links[index].id);
            getLinks();
        } catch (error) {
            alert('API Error');
        }
    }

    onMount(()=>{
        console.log(import.meta.env.VITE_POCKETBASE_URL);
        getLinks();
    })

</script>


<Header/>

{#if $loggedInUser }
<div class="avatar">{@html userAvatar($loggedInUser.email)}</div>
<h3>Hello, {userName($loggedInUser.email)}</h3>
<p>{$loggedInUser.email}</p>
<button on:click={signOut}>Sign Out</button>
<button on:click={createShortLink}>Create Link</button>

<!-- Links -->
{#if linksLoading}
    <p>Loading...</p>
{:else if linksError}
    <p>Error: {linksError}</p>
{:else if links.length}
    {#each links as item,index}
        <div>
            <h4><a target="_blank" href="{window.location.origin + '/l/' + item.id}">{window.location.origin + '/l/' + item.id}</a></h4>
            <p>{item.url}</p>
            <button on:click={()=>{ deleteLink(index) }}>Delete</button>
        </div>
        <hr>
    {/each}
{:else}
    <p>No links found.</p>
{/if}

{/if}

<style>
   .avatar{ display: flex; border-radius: 100%; overflow: hidden; width: 5rem;}
</style>