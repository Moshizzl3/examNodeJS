<script>
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  let isAccepted = false;

  function acceptCookies() {
    sessionStorage.setItem("cookieConsent", "true");
    isAccepted = true;
  }

  function checkCookieConcent() {
    const hasAccepted = sessionStorage.getItem("cookieConsent");
    if (hasAccepted) {
      isAccepted = true;
    }
  }

  onMount(checkCookieConcent)
</script>

{#if !isAccepted}
  <div class="container mx-auto px-20 relative botton-12 right-48 dark:bg-inherit">
    <div>
      <div class="w-72 dark:bg-white rounded-lg shadow-md p-6" style="cursor: auto;">
        <div class="w-16 mx-auto relative -mt-10 mb-3">
          <img
            class="-mt-1"
            src="https://www.svgrepo.com/show/30963/cookie.svg"
            alt="Cookie Icon SVG"
          />
        </div>
        <span
          class="w-full sm:w-48  block leading-normal text-gray-800 text-md mb-3"
          >We use cookies once logged in to provide a better user experience.</span
        >
        <div class="flex items-center justify-between">
          <a class="text-xs text-gray-400 mr-1 hover:text-gray-800" href="/"
            >Privacy Policy</a
          >
          <div class="w-1/2">
            <Button
              on:click={acceptCookies}
              type="button"
              class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >Accept</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
