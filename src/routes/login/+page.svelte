<script>
	import { authenticateUser } from '../../utils/auth';
	import { goto } from '$app/navigation';

	let errorMessage = ' ';

	async function loginFunc(evt) {
		evt.preventDefault();

		const userLoginData = {
			username: evt.target['username'].value,
			password: evt.target['password'].value
		};

		const res = await authenticateUser(userLoginData.username, userLoginData.password);

		if (res.success) {
			goto('/');
		} else {
			errorMessage = 'Login Failed, please try again';
		}
	}
</script>

<article data-theme="bumblebee" class="h-[700px]">
	<main
		class="flex pt-[150px] h-[700px] justify-center bg-[url('https://imgs.search.brave.com/4ZNbIFuWsE6uhP7mZzgY0SDS5hGII-lNFHstawFVVpY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzY0LzgzLzU4/LzM2MF9GXzY0ODM1/ODE4X1J3Q3hxWE12/UTdPWEYzYkR6d2FN/YnVzalFqRG1ZWjNx/LmpwZw')]"
	>
		<form on:submit={loginFunc} class="w-1/3">
			<div class="bg-accent p-5 rounded-3xl">
				<div class="flex justify-center w-full">
					<p class="text-3xl font-mono my-3">Login</p>
				</div>
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
                {#if errorMessage}
					<div class="text-black text-center mt-2">{errorMessage}</div>
				{/if}
				<br />
				<button class="btn btn-primary w-full mt-4">Submit</button>
				<a class="link-hover italic text-xs" href="/users/new"
					>Don't have an account? Click here to sign up instead.</a
				>
			</div>
		</form>
	</main>
</article>
