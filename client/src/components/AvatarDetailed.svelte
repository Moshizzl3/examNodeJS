<script>
  import { Avatar } from "flowbite-svelte";
  import { BASE_URL, cookie } from "../store/global.js";
  import { onMount } from "svelte";
  export let postDate;
  export let userName;
  export let userImage;


  let date;
  let time;
  let imageObjectURL;

  if (postDate) {
    date = postDate.split("T")[0];
    time = postDate.split("T")[1].split(".")[0].slice(0, 5);
  }

  async function load_profile_pic() {
    const url = `${$BASE_URL}/users/images/${userImage}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: $cookie,
        "Content-type": "application-json",
      },
    };
    let response = await fetch(url, options);
    if (response.status === 200) {
      const imageBlob = await response.blob();
      imageObjectURL = URL.createObjectURL(imageBlob);
      return imageObjectURL;
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  }
  
  onMount(load_profile_pic);
</script>

<div class="flex items-center space-x-4">
  <Avatar src={imageObjectURL} rounded class="object-cover"/>
  <div class="space-y-1 font-medium dark:text-white w-full flex space-x-4 flex">
    <div
      class="flex justify-start w-full text-sm text-gray-500 dark:text-gray-400"
    >
      <p>
        {userName}
      </p>
    </div>
    <div
      class="flex justify-end w-full text-sm text-gray-500 dark:text-gray-400"
    >
      <p>
        {#if postDate}
          posted: {new Date(postDate).toDateString()}
        {/if}
      </p>
    </div>
  </div>
</div>
