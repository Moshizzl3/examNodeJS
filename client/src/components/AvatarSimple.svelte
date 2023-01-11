<script>
  import { Avatar } from "flowbite-svelte";
  import { BASE_URL,cookie } from "../store/global.js";
  import { onMount } from "svelte";

  let userName;

  let imageObjectURL;

  async function load_pic() {
    const url = `${$BASE_URL}/users/image`
    const options = {
        method: "GET",
        headers: {
        Authorization: $cookie,
        "Content-type": "application-json",
      },
    }
    let response = await fetch(url, options)
    if (response.status === 200) {
        
        const imageBlob = await response.blob()
        imageObjectURL = URL.createObjectURL(imageBlob);
        return imageObjectURL
    }
}

async function getUserName() {
  const url = `${$BASE_URL}/api/user`
    const options = {
        method: "GET",
        headers: {
        Authorization: $cookie,
        "Content-type": "application-json",
      },
    }
  let response = await fetch(url, options)  
  const data = await response.json();
  userName = data.data
}
onMount(load_pic)
onMount(getUserName)
</script>

<div class="flex items-center space-x-4">
  <Avatar src={imageObjectURL} rounded/>
  <div
    class="space-y-1 font-medium dark:text-white w-full flex space-x-4 flex"
  >
    <div class="flex justify-start w-full text-sm text-gray-500 dark:text-gray-400">
      <p>
        Hej {userName}, hvad har du på hjertet?
      </p>
    </div>
    <div class="flex justify-end w-full text-sm text-gray-500 dark:text-gray-400">
    </div>
  </div>
</div>
