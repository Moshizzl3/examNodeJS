<script>
  import { Activity, ActivityItem, Img } from "flowbite-svelte";
  import { BASE_URL, cookie } from "../store/global";
  import NotificationList from "./NotificationList.svelte";
  export let notifications;

  let profileImageObjectURL;

  async function load_pic(image_url) {
      const url = `${$BASE_URL}/posts/image/${image_url}`;
      const options = {
        method: "GET",
      };
      let response = await fetch(url, options);
      if (response.status === 200) {
        const imageBlob = await response.blob();
        profileImageObjectURL = URL.createObjectURL(imageBlob);
        return profileImageObjectURL;
      } else {
        console.log("HTTP-Error: " + response.status);
      }
    }

</script>

<div class="w-content">
  <div class="mt-2">
    <Activity>
      {#each notifications as notification}
        <li class="mb-10 ml-6">
          <div
            class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600"
          >
            <div class="relative">
              <Img
                src="/public/img/mo.jpeg"
                alt="sample 1"
                size="w-6"
                imgClass="h-6 object-cover"
                class="rounded-full"
              />
            </div>
            <div class="justify-between items-center mb-3 sm:flex">
              <time
                class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
                >{notification.created_on}</time
              >
              <div
                class="text-sm font-normal text-gray-500 lex dark:text-gray-300"
              />
            </div>

            <div
              class="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300"
            >
              <p class="text-xs">
                {notification.like_user} liked {notification.post_user} post
              </p>
            </div>
          </div>
        </li>
      {/each}
    </Activity>
  </div>
</div>
