<script >
    import { goto } from '$app/navigation';
    import { getUserId } from '../../utils/auth';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import Alerts from '../../components/Alerts.svelte';
	import { alerts } from '../../utils/alerts.js';

    let formErrors = ''
	let spin = false

    async function newJob(evt) {
        evt.preventDefault()
		spin = true

        const id = getUserId()


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
        }

        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });

      console.log(resp.status)
		console.log(resp.headers.get("Content-Type"))
  
      if (resp.status == 200) {
        goto('/')
		warningAlert.set(false)
      } else {
		spin = false
        const res = await resp.json();
        formErrors = res.data;
		alerts.setAlert('Darn, something went wrong, please try again', 'warning')
			setTimeout(() => {
				alerts.clearAlert()
			}, 3000)
      }
    }
</script>

<article class="flex justify-center py-[150px] bgImg">
	<form on:submit={newJob}>
		<div class="bg-accent p-5 rounded-3xl">
			<div class="flex justify-center w-full">
				<p class="text-3xl font-mono my-3">Add A Job</p>
			</div>
            {#if formErrors}
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
					<span>Uh oh! </span>{formErrors}
				</div>
			{/if}
			<div class="form-control w-full">
				<label class="label" for="title">
					<span class="label-text font-mono">Job Type </span>
				</label>
				<textarea
					name="title"
					cols="40"
					rows="10"
					class="input input-bordered w-full"
					placeholder="Software Developer"
				></textarea>
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
					placeholder="Facebook"
				></textarea>
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
					placeholder="New York"
				></textarea>
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
					placeholder=""
				></textarea>
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
					placeholder=""
				></textarea>
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
					placeholder=""
				></textarea>
			</div>

            <div class="form-control w-full">
				<label class="label" for="minAnnualCompensation">
					<span class="label-text font-mono">Minimum Annual Salary In USD</span>
				</label>
				<input type="number" class="input input-bordered w-full" name="minAnnualCompensation">
			</div>

            <div class="form-control w-full">
				<label class="label" for="maxAnnualCompensation">
					<span class="label-text font-mono">Maximum Annual Salary In USD</span>
				</label>
				<input type="number" class="input input-bordered w-full" name="maxAnnualCompensation">
			</div>



			<div class="form-control w-full mt-4">
				{#if spin === true}
				<button class="btn btn-primary">
                    <span class="loading loading-infinity loading-lg"></span>Create this Job
                </button>
				{:else} 
				<button class="btn btn-primary">
                    Create this Job
                </button>
				{/if}
			</div>
		</div>
	</form>
</article>
