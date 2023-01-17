<script>
  import { Activity, A } from "flowbite-svelte";
  export let notifications;

  let profileImageObjectURL;
</script>

<div class="w-content">
  <div class="mt-2">
    <Activity>
      {#each notifications as notification}
        <li class="mb-10 ml-6">
          <div
            class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600"
          >
            <div class="relative" />
            <div class="justify-between items-center mb-3 sm:flex">
              <time
                class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
                >{new Date(notification.created_on).toDateString()}</time
              >
              <time
                class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
                >{new Date(notification.created_on).toLocaleTimeString()}</time
              >
              <div />
            </div>

            <div
              class="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300"
            >
              <p class="text-xs">
                <A href={`profile/follower/?user=${notification.user_id}`}>
                  {notification.like_user}
                </A>
                liked
                <A href={`profile/follower/?user=${notification.post_user_id}`}>
                  {notification.post_user}
                </A>
                post
              </p>
            </div>
          </div>
        </li>
      {/each}
    </Activity>
  </div>
</div>
