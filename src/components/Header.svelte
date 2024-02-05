<script>
    import { isLoggedIn } from "../utils/auth";
    import { logOut } from "../utils/auth";

    const isIn = isLoggedIn()
</script>

<header class ="w-full bg-primary flex px-5 py-3" data-theme="bumblebee">

    <a href="/routes" class="self-center text-3xl italic font-mono">BusyBees</a>
    <div class="flex justify-end w-full">
        <a class="btn btn-secondary mx-5" href="/routes">Home</a>
        {#if isIn}
        <a class="btn btn-secondary mx-5" href="/routes">New Job</a>
        {/if}
        {#if isIn}
        <button on:click={logOut} class="btn btn-secondary mx-5">Logout</button>
        {/if}
        {#if !isIn}
        <a class="btn btn-secondary mx-5" href="/login">Login</a>
        {/if}
        {#if !isIn}
        <a class="btn btn-secondary mx-5" href="/users/new">Sign Up</a>
        {/if}
    </div>
</header>