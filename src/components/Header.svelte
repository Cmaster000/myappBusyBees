<script>
    import { loggedIn, logOut } from "../utils/auth";
    import { onMount } from 'svelte'

    function changeTheme(event) {
        const theme = event.target.value
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }

    onMount(() => {
        let currentTheme = localStorage.getItem('theme') || 'bumblebee'
        document.documentElement.setAttribute('data-theme', currentTheme)
        return currentTheme
    })

    let nowTheme = onMount()
</script>

<header class ="w-full bg-accent flex px-5 py-3" >

    <a href="/" class="self-center text-3xl italic font-mono">BusyBees</a>
    <div class="flex justify-end w-full">
        <a class="btn btn-primary mx-5" href="/">Home</a>
        {#if $loggedIn}
        <a class="btn btn-primary mx-5" href="/newjob">Add New Job</a>
        <button on:click={logOut} class="btn btn-primary mx-5">Log out</button>
        {:else}
        <a class="btn btn-primary mx-5" href="/login">Add New Job</a>
        <a class="btn btn-primary mx-5" href="/login">Login</a>
        <a class="btn btn-primary mx-5" href="/users/new">Sign Up</a>
        {/if}
        
        {#if nowTheme === 'bumblebee'}
        <select on:change={changeTheme} class="btn mx-5 btn-primary">
            <option value="bumblebee">Light</option>
            <option value="coffee">Dark</option>
        </select>
        {:else}
        <select on:change={changeTheme} class="btn mx-5 btn-primary">
            <option value="coffee">Dark</option>
            <option value="bumblebee">Light</option>
        </select>
        {/if}
    </div>
</header>