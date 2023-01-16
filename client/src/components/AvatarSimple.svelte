<script>
  import { Avatar } from "flowbite-svelte";
  import { BASE_URL, cookie } from "../store/global.js";
  import { onMount } from "svelte";

  let userName;
  let profileImageObjectURL;

  async function load_profile_pic() {
    const url = `${$BASE_URL}/users/profile-image`;
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
      profileImageObjectURL = URL.createObjectURL(imageBlob);
      return profileImageObjectURL;
    }
  }

  async function getUserName() {
    const url = `${$BASE_URL}/api/users/name`;
    const options = {
      method: "GET",
      headers: {
        Authorization: $cookie,
        "Content-type": "application-json",
      },
    };
    let response = await fetch(url, options);
    const data = await response.json();
    userName = data.data;
  }
  onMount(load_profile_pic);
  onMount(getUserName);
</script>

<div class="flex items-center space-x-4">
  <Avatar src={profileImageObjectURL} rounded class="object-cover"/>
  <div class="space-y-1 font-medium dark:text-white w-full flex space-x-4">
    <div
      class="flex justify-start w-full"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Hej {userName}, hvad har du på hjertet?
      </p>
    </div>
    <div
      class="flex justify-end w-full text-sm text-gray-500 dark:text-gray-400"
    />
  </div>
</div>
