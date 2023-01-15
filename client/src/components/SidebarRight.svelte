<script>
  import { Input } from "flowbite-svelte";
  import Timeline from "./Timeline.svelte";
  import { BASE_URL, webSocket, cookie } from "../store/global.js";
  import { onMount } from "svelte";

  let isApproved = false;
  let notificationList = [];
  $webSocket.on("notification", (data) => {
    notificationList = [data, ...notificationList];
  });

  async function getRecent() {
    const response = await fetch(`${$BASE_URL}/likes/post`, {
      headers: {
        Authorization: $cookie,
        "Content-type": "application-json",
      },
    });

    const data = await response.json();

    notificationList = [...notificationList, ...data.data];
    isApproved = true;
    console.log(notificationList);
  }

  onMount(getRecent);
</script>

<div
  class="container w-1/2  p-2 sidebar-container md:flex max-h-full flex-col items-start justify-center"
>
  <div class="mt-2">
    <p class="dark:bg-white">Feed</p>
  </div>
  <div class="container flex flex-col p-5 items-start overflow-y-auto">
    <Timeline notifications={notificationList} />
  </div>
</div>
