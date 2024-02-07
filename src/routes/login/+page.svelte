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



<article data-theme="bumblebee" class="">
	<main
		class="flex py-[150px] justify-center bg-honeycomb"
	>
		<form on:submit={loginFunc} class="w-1/3">
			<div class="bg-accent p-5 rounded-3xl">
				<div class="flex justify-center w-full">
					<p class="text-3xl font-mono my-3">Login</p>
				</div>
				<!-- {#if errorMessage}
					<Alert border><span class="font-medium">Uh oh! </span>{errorMessage}</Alert>
				{/if} -->
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
				<button class="btn btn-primary w-full mt-4">Submit</button>
				<a class="link-hover italic text-xs" href="/users/new"
					>Don't have an account? Click here to sign up instead.</a
				>
			</div>
		</form>
	</main>
</article>
