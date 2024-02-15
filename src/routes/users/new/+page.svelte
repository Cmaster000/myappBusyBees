<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { authenticateUser } from './../../../utils/auth.js';
	import Alerts from '../../../components/Alerts.svelte';
	import { alerts } from '../../../utils/alerts';

	let formErrors = {};
	let spin = false

	function postSignUp() {
		goto('/');
	}

	async function createUser(evt) {
		evt.preventDefault();
		spin = true

		if (evt.target['password'].value != evt.target['password-confirmation'].value) {
			formErrors['password'] = { message: 'Password confirmation does not match' };
			return;
		} else if (evt.target['password'].value) {

    }

		const userData = {
			username: evt.target['username'].value,
			email: evt.target['email'].value,
			password: evt.target['password'].value,
			passwordConfirm: evt.target['password-confirmation'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		if (resp.status == 200) {
			const res = await authenticateUser(userData.username, userData.password);

			if (res.success) {
				postSignUp();
        
			} else {
				throw 'Sign up succeeded but authentication failed';
			}
		} else {
			const res = await resp.json();
			formErrors = res.data;
			spin = false
			alerts.setAlert('Darn, something went wrong with the sign up, please try again', 'warning')
			setTimeout(() => {
				alerts.clearAlert()
			}, 3000)
		}
	}
</script>

<div class="text-center"></div>
<div class="flex py-[150px] justify-center bgImg">
	<div class="absolute top-20"><Alerts /></div>
	<form on:submit={createUser} class="w-1/3">
		<div class="bg-accent p-5 rounded-3xl">
			<div class="flex justify-center w-full">
				<p class="text-3xl font-mono my-3">Sign Up</p>
			</div>
			{#if 'username' in formErrors}
				<div role="alert" class="alert alert-warning">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/></svg
					>
					<span>Uh oh! </span>{formErrors['username'].message}
				</div>
			{/if}
      		{#if 'email' in formErrors}
				<div role="alert" class="alert alert-warning">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/></svg
					>
					<span>Uh oh! </span>{formErrors['email'].message}
				</div>
			{/if}
      		{#if 'password' in formErrors}
				<div role="alert" class="alert alert-warning">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/></svg
					>
					<span>Uh oh! </span>{formErrors['password'].message}
				</div>
			{/if}
			<div class="form-control w-full">
				<label class="label" for="username">
					<span class="label-text font-mono">Username</span>
				</label>
				<input
					type="text"
					name="username"
					placeholder="johndoe"
					class="input input-bordered w-full"
				/>
				{#if 'username' in formErrors}
					<label class="label" for="username">
						<span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full">
				<label class="label" for="email">
					<span class="label-text font-mono">Email</span>
				</label>
				<input
					type="email"
					name="email"
					placeholder="john@example.com"
					class="input input-bordered w-full"
					required
				/>
				{#if 'email' in formErrors}
					<label class="label" for="email">
						<span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full">
				<label class="label" for="password">
					<span class="label-text font-mono">Password</span>
				</label>
				<input
					type="password"
					name="password"
					placeholder=""
					class="input input-bordered w-full"
					required
				/>
				{#if 'password' in formErrors}
					<label class="label" for="password">
						<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full">
				<label class="label" for="password">
					<span class="label-text font-mono">Confirm Password</span>
				</label>
				<input
					type="password"
					name="password-confirmation"
					placeholder=""
					class="input input-bordered w-full"
					required
				/>
				{#if 'password' in formErrors}
					<label class="label" for="password">
						<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full mt-4">
				{#if spin === true}
				<button class="btn btn-primary w-full mt-4">
                    <span class="loading loading-infinity loading-lg"></span>Sign Up
                </button>
				{:else} 
				<button class="btn btn-primary w-full mt-4">
                    Sign Up
                </button>
				{/if}
			</div>

			<a class="link-hover italic text-xs" href="/login"
				>Already have an account? Click here to login instead.</a
			>
		</div>
	</form>
</div>
