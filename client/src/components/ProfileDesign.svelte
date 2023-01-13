<script>
  import { BASE_URL, cookie } from "../store/global.js";
  import { onMount } from "svelte";
  import { Img } from "flowbite-svelte";

  let userName;

  let profileImageObjectURL;
  let coverImageObjectURL;

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

  async function load_cover_pic() {
    const url = `${$BASE_URL}/users/cover-image`;
    const options = {
      method: "GET",
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
    };
    let response = await fetch(url, options);
    if (response.status === 200) {
      const imageBlob = await response.blob();
      coverImageObjectURL = URL.createObjectURL(imageBlob);
      return coverImageObjectURL;
    }
  }
  async function getUserName() {
    const url = `${$BASE_URL}/api/user`;
    const options = {
      method: "GET",
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
    };
    let response = await fetch(url, options);
    const data = await response.json();
    userName = data.data;
  }
  onMount(load_profile_pic);
  onMount(load_cover_pic);
  onMount(getUserName);
</script>

<div>
  <div>
    <Img
      src={coverImageObjectURL}
      alt="sample 1"
      class="rounded-lg"
      imgClass="object-cover h-48 w-full"
    />
  </div>

  <div class="relative bottom-16 left-0">
    <Img
      src={profileImageObjectURL}
      alt="sample 1"
      size="w-24"
      imgClass="h-24 object-cover"
      class="rounded-full"
    />
  </div>
</div>
