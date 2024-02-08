<script>
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { getTokenFromLocalStorage } from '../../../../utils/auth';
    import { getUserId } from '../../../../utils/auth';
    export let data

    let formErrors = {} 
    let getToken = getTokenFromLocalStorage()
    let id = getUserId()
	let spin = false

	console.log(id)

	async function editJob(evt) {
		evt.preventDefault();
		spin = true

		const jobData = {
            user: id,
			title: evt.target['title'].value,
			employer: evt.target['employer'].value,
			location: evt.target['location'].value,
			description: evt.target['description'].value,
			applicationInstructions: evt.target['applicationInstructions'].value,
			requirements: evt.target['requirements'].value,
			minAnnualCompensation: evt.target['minAnnualCompensation'].value,
			maxAnnualCompensation: evt.target['maxAnnualCompensation'].value
		};

		console.log(jobData)

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
			method: 'PATCH',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': getToken
			},
			body: JSON.stringify(jobData)
		});

		console.log(resp.status)
		console.log(resp.headers.get("Content-Type"))

        const res = await resp.json();
        console.log(res)

		if (resp.status === 204) {
        goto('/');
		spin = false
		}
		// else if (resp.status == 200) {
		// 	goto('/')
		// } else {
		// 	formErrors = res.data;
		// }

		// if (resp.status == 200) {
		// 	goto('/');
		// } else {
		// 	formErrors = res.data;
		// }
	}
</script>

<article class="flex justify-center py-[150px] bg-honeycomb">
	<form on:submit={editJob}>
		<div class="bg-accent p-5 rounded-3xl">
			<div class="flex justify-center w-full">
				<p class="text-3xl font-mono my-3">Edit Your Job</p>
			</div>
			<div class="form-control w-full">
				<label class="label" for="title">
					<span class="label-text font-mono">Job Type </span>
				</label>
				<textarea
					name="title"
					cols="40"
					rows="10"
					class="input input-bordered w-full"
					>{data.job.title}</textarea
				>
			</div>

			<div class="form-control w-full">
				<label class="label" for="employer">
					<span class="label-text font-mono">Company</span>
				</label>
				<textarea
					name="employer"
					cols="40"
					rows="10"
					class="input input-bordered w-full"
					
				>{data.job.employer}</textarea>
			</div>

			<div class="form-control w-full">
				<label class="label" for="location">
					<span class="label-text font-mono">Location</span>
				</label>
				<textarea
					name="location"
					cols="40"
					rows="10"
					class="input input-bordered w-full"
					
				>{data.job.location}</textarea>
			</div>

			<div class="form-control w-full">
				<label class="label" for="description">
					<span class="label-text font-mono">Description</span>
				</label>
				<textarea
					name="description"
					cols="40"
					rows="10"
					class="input input-bordered w-full"
					
				>{data.job.description}</textarea>
			</div>

			<div class="form-control w-full">
				<label class="label" for="applicationInstructions">
					<span class="label-text font-mono">Instructions</span>
				</label>
				<textarea
					name="applicationInstructions"
					cols="40"
					rows="10"
					class="input input-bordered w-full"
					
				>{data.job.applicationInstructions}</textarea>
			</div>

			<div class="form-control w-full">
				<label class="label" for="requirements">
					<span class="label-text font-mono">Requirements</span>
				</label>
				<textarea
					name="requirements"
					cols="40"
					rows="10"
					class="input input-bordered w-full"
					
				>{data.job.requirements}</textarea>
			</div>

			<div class="form-control w-full">
				<label class="label" for="minAnnualCompensation">
					<span class="label-text font-mono">Minimum Annual Salary In USD</span>
				</label>
				<input type="number" class="input input-bordered w-full" name="minAnnualCompensation" value="{data.job.minAnnualCompensation}" />
			</div>

			<div class="form-control w-full">
				<label class="label" for="maxAnnualCompensation">
					<span class="label-text font-mono">Maximum Annual Salary In USD</span>
				</label>
				<input type="number" class="input input-bordered w-full" name="maxAnnualCompensation" value="{data.job.maxAnnualCompensation}"/>
			</div>

			<div class="form-control w-full mt-4">
				{#if spin === true}
				<button class="btn btn-primary w-full mt-4">
                    <span class="loading loading-infinity loading-lg"></span>Submit Changes
                </button>
				{:else} 
				<button class="btn btn-primary w-full mt-4">
                    Submit Changes
                </button>
				{/if}
			</div>
		</div>
	</form>
</article>
