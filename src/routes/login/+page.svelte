<script>
	import { authenticateUser } from '../../utils/auth';
	import { goto } from '$app/navigation';

	let errorMessage = ' ';
	let spin = false

	async function loginFunc(evt) {
		evt.preventDefault();
		spin = true

		const userLoginData = {
			username: evt.target['username'].value,
			password: evt.target['password'].value
		};

		const res = await authenticateUser(userLoginData.username, userLoginData.password);

		if (res.success) {
			goto('/');
			errorMessage = ' ';
		} else {
			spin = false
			errorMessage = 'Login Failed, please try again';
		}
	}
</script>



<article class="">
	<main
		class="flex py-[150px] justify-center bg-honeycomb"
	>
		<form on:submit={loginFunc} class="w-1/3">
			<div class="bg-accent p-5 rounded-3xl">
				<div class="flex justify-center w-full">
					<p class="text-3xl font-mono my-3">Login</p>
				</div>
				{#if errorMessage !== ' '}
				<div role="alert" class="alert alert-warning">
					<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
					<span>Uh oh! </span>{errorMessage}
				</div>
				{/if}
				<label class="label" for="username">
					<span class="label-text font-mono">Username</span>
				</label>
				<input
					name="username"
					type="text"
					class="input input-bordered w-full"
					placeholder="johndoe"
				/>
				<label class="label" for="password">
					<span class="label-text font-mono">Password</span>
				</label>
				<input name="password" type="password" class="input input-bordered w-full" />
				<br />
				
				{#if spin === true}
				<button class="btn btn-primary w-full mt-4">
                    <span class="loading loading-infinity loading-lg"></span>Submit
                </button>
				{:else} 
				<button class="btn btn-primary w-full mt-4">
                    Submit
                </button>
				{/if}
				<a class="link-hover italic text-xs" href="/users/new"
					>Don't have an account? Click here to sign up instead.</a
				>
			</div>
		</form>
	</main>
</article>
