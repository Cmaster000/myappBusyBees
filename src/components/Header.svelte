<script>
    import { loggedIn, logOut } from "../utils/auth";
</script>

<header class ="w-full bg-primary flex px-5 py-3" data-theme="bumblebee">

    <a href="/" class="self-center text-3xl italic font-mono">BusyBees</a>
    <div class="flex justify-end w-full">
        <a class="btn btn-secondary mx-5" href="/">Home</a>
        {#if $loggedIn}
        <a class="btn btn-secondary mx-5" href="/newjob">Add New Job</a>
        <button on:click={logOut} class="btn btn-secondary mx-5">Log out</button>
        {:else}
        <a class="btn btn-secondary mx-5" href="/login">Add New Job</a>
        <a class="btn btn-secondary mx-5" href="/login">Login</a>
        <a class="btn btn-secondary mx-5" href="/users/new">Sign Up</a>
        {/if}
    </div>
</header>