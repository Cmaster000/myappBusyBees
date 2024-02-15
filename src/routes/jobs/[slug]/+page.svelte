<script>
	import SvelteMarkdown from 'svelte-markdown';
	import humanize from 'humanize-plus';
	import { getUserId, getTokenFromLocalStorage } from '../../../utils/auth.js';
	import Alerts from '../../../components/Alerts.svelte';
	import { alerts } from '../../../utils/alerts.js';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	export let data;

	const id = getUserId()
	const getToken = getTokenFromLocalStorage()

	export async function destroyJob(evt) {
  
  evt.preventDefault();
let spin = true

		const jobData = {
            user: id,
		};

  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
	  method: 'DELETE',
	  mode: 'cors',
	  headers: {
		  'Content-Type': 'application/json',
  			'Authorization': getToken
	  },
	  body: JSON.stringify(jobData)
  });

  console.log(resp.status)
  console.log(resp.headers.get("Content-Type"))

  if (resp.status === 204) {
  goto('/');
//   warningAlert.set(false)
  } else {
spin = false
alerts.setAlert('Darn, something went wrong, please try again', 'warning')
	  setTimeout(() => {
		  alerts.clearAlert()
	  }, 3000)
}
goto('/');
}
</script>

<main class="bgImg pt-3">
	<div class="bg-accent p-5 min-h-screen rounded-box mx-2">
		<div class="flex justify-center w-full">
			<div class="absolute top-20"><Alerts /></div>
			<div class="max-w-min flex justify-center flex-wrap">
				<h1 class="text-3xl font-extrabold text-nowrap">{data.job.title}</h1>
				{#if data.job.user === id}
					<div>
						<a href="/jobs/{data.job.id}/editjob" class="btn btn-primary absolute top-24 right-28">Edit</a>
					</div>
					<div>
						<button on:click={destroyJob} class="btn btn-primary absolute top-24 right-6">Delete</button>
					</div>
				{/if}
				<div class="flex-nowrap">
					<p class="mr-2">for</p>
					<p class="text-xl ml-2 text-nowrap">{data.job.employer}</p>
				</div>
			</div>
		</div>
		<div class="flex flex-row w-full mt-8">
			<div class="basis-2/3 prose max-w-none w-full">
				<h2 class="text-xl font-thin">Description</h2>
				<SvelteMarkdown source={data.job.description} />
				<div class="mt-6" />
				<h2 class="text-xl font-thin">Requirements</h2>
				<SvelteMarkdown source={data.job.requirements} />
				<div class="mt-6" />
				<h2 class="text-xl font-thin">How to Apply?</h2>
				<p>{data.job.applicationInstructions}</p>
			</div>
			<div class="basis-1/3 ml-4">
				<h2 class="text-xl font-thin">Location</h2>
				<p>{data.job.location}</p>
				<div class="mt-6" />
				<h2 class="text-xl font-thin">Salary Range</h2>
				<p>
					USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
						data.job.maxAnnualCompensation
					)}
				</p>
				<div class="mt-6" />
				<h2 class="text-xl font-thin">When It Was Posted</h2>
				<p>
					Posted {new Date(data.job.created).toLocaleDateString(undefined, {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</div>
		</div>
	</div>
</main>
