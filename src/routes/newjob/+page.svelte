<script>
    import { goto } from '$app/navigation';
    import { getUserId } from '../../utils/auth';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

    async function newJob(evt) {
        evt.preventDefault()

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
  
      if (resp.status == 200) {
        goto('/')
      } else {
        const res = await resp.json();
        let formErrors = res.data;
      }
    }
</script>

<article class="flex justify-center py-[150px] bg-honeycomb">
	<form on:submit={newJob}>
		<div class="bg-accent p-5 rounded-3xl">
			<div class="flex justify-center w-full">
				<p class="text-3xl font-mono my-3">Add A Job</p>
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
				<button class="btn btn-primary">Create This Job</button>
			</div>
		</div>
	</form>
</article>
