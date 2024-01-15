<script setup lang="ts">
import { reactive, ref } from 'vue';
import instance from '../utils/axios.ts';
import router from '../router';
import {UserIcon} from "@heroicons/vue/24/solid";

const userData = reactive({
  username: '',
  password: '',
});
const loginError = ref<boolean>(false);
const login = () => {
  instance
    .post('/login', {
      username: userData.username,
      password: userData.password,
    })
    .then(function (response) {
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.username));
      router.push({ name: 'Dashboard' });
    })
    .catch(function () {
      loginError.value = true;
    });
};
</script>

<template>
  <main
    class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
      <div class="flex flex-col items-center">
        <user-icon class="h-12 w-12 text-gray-500" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <input type="hidden" value="true" name="remember" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
              for="email-address"
            >
              Username
            </label>
            <input
              class="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              id="username"
              required
              placeholder="Username"
              type="text"
              name="username"
              v-model="userData.username"
            />
          </div>
          <div>
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
              for="password"
            >
              Password
            </label>
            <input
              class="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              id="password"
              required
              placeholder="Password"
              type="password"
              name="password"
              v-model="userData.password"
            />
          </div>
        </div>
        <div>
          <button
            class="items-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Sign in
          </button>
          <p v-show="loginError" id="login-error" class="mt-2 text-center text-sm text-red-600">
            Invalid login credentials. Please try again.
          </p>
        </div>
        <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
          <div class="flex">
            <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
              <p class="font-bold">Use this credentials</p>
              <p class="text-sm">username: user1</p>
              <p class="text-sm">password: password1</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
