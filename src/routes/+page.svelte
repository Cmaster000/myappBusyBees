<script>
	export let data;
	import humanize from 'humanize-plus';
	import { getUserId } from '../utils/auth';

	const id = getUserId()
</script>

<article
	class="min-h-screen"
>
	

	<div class="overflow-x-auto w-full bg-honeycomb p-5" data-theme="bumblebee">
		<h1 class="text-center text-4xl font-bold">Find Your Next Job</h1>
		{#each data.jobs as job}
			<div class="flex flex-col mt-10 bg-accent rounded-xl p-2">
				<a href="/jobs/{job.id}">
					<div class="relative">
						<h1 class="font-bold text-2xl">{job.title}</h1>
						<div class="text-sm mt-1">
							{job.employer} <br />
							{job.location} <br />
							<span class="text-sm"
								>USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(
									job.maxAnnualCompensation
								)}</span
							>
						</div>
						<div class="italic text-xs opacity-50 mt-2">
							Posted {new Date(job.created).toLocaleDateString(undefined, {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</div>
						{#if job.user === id}
						<div>
							<a href="/jobs/{job.id}/editjob" class="btn btn-primary absolute top-0 right-0">Edit</a>
						</div>
						{/if}
					</div>
				</a>

				<div class="mt-4">
					{job.description.slice(0, 240)}...
				</div>
			</div>
		{/each}
	</div>
</article>

<!-- <body data-theme="forest">
    <article>
    <header class="bg-green, text-gray">
        <a href='void'>NEXT Jobs DB</a> 
    </header>
    <main class = "bg-[url('https://images.unsplash.com/photo-1530362502708-d02c8f093039?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
    <h1>Find your next job!</h1>
    </main>
    </article>
</body> -->
