<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { authenticateUser } from './../../../utils/auth.js';
    import { writable } from 'svelte/store';

    const isLoggedIn = writable(false)
    let formErrors = {};
  
    function postSignUp() {
      goto('/routes');
    }
  
    async function createUser(evt) {
      evt.preventDefault()
  
      if (evt.target['password'].value != evt.target['password-confirmation'].value) {
        formErrors['password'] = { message: 'Password confirmation does not match' };
        return;
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
      }
    }
  </script>
  
  <div class="text-center">
      
  </div>
  <div data-theme="bumblebee" class="h-[700px] flex pt-[150px] justify-center bg-[url('https://imgs.search.brave.com/4ZNbIFuWsE6uhP7mZzgY0SDS5hGII-lNFHstawFVVpY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzY0LzgzLzU4/LzM2MF9GXzY0ODM1/ODE4X1J3Q3hxWE12/UTdPWEYzYkR6d2FN/YnVzalFqRG1ZWjNx/LmpwZw')]">
      <form on:submit={createUser} class="w-1/3">
        <div class="bg-accent p-5 rounded-3xl">

            <div class="flex justify-center w-full">
                <p class="text-3xl font-mono my-3">Sign Up</p>
            </div>
          <div class="form-control w-full">
              <label class="label" for="username">
                  <span class="label-text font-mono">Username</span>
              </label>
              <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />
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
              <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
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
              <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
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
              <input type="password" name="password-confirmation" placeholder="" class="input input-bordered w-full" required />
              {#if 'password' in formErrors}
              <label class="label" for="password">
                  <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full mt-4">
              <button class="btn btn-primary">Create an Account</button>
          </div>

          <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
        </div>
      </form>
  </div>