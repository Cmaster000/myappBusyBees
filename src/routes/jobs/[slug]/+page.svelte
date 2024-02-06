<script>
	import SvelteMarkdown from 'svelte-markdown';
	import humanize from 'humanize-plus';
	export let data;
</script>

<main class="bg-accent p-5 min-h-screen">
	<div class="">
		<div class="flex justify-center w-full">
			<div class="max-w-min flex justify-center flex-wrap">
				<h1 class="text-3xl font-extrabold text-nowrap">{data.job.title}</h1>
				<div class="flex-nowrap">
					<p class="mr-2">for</p>
					<p class="text-xl ml-2">{data.job.employer}</p>
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
                <p>Posted {new Date(data.job.created).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
			</div>
		</div>
	</div>
</main>
