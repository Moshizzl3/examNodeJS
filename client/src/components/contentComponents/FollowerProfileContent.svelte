<script>
  import Post from "../Post.svelte";
  import { cookie, BASE_URL } from "../../store/global.js";
  import { onMount } from "svelte";
  import { Button } from "flowbite-svelte";
  import { Tabs, TabItem } from "flowbite-svelte";
  import FollowerProfileDesign from "../FollowerProfileDesign.svelte";
  let isApproved = false;
  let posts;

  let profileId = new URLSearchParams(window.location.search).get("user");

  let user = {
    id: "",
    firstName: "",
    lastName: "",
    mail: "",
    profileImageUrl: "",
    coverImageUrl: "",
  };

  async function getPosts() {
    const response = await fetch(`${$BASE_URL}/api/posts/user/${profileId}`, {
      headers: {
        Authorization: $cookie,
        "Content-type": "application-json",
      },
    });
    if (!response.ok) {
      isApproved = false;
    }
    const data = await response.json();
    isApproved = true;
    posts = data.data;
  }

  async function getUser() {
    const url = `${$BASE_URL}/api/users/${profileId}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: $cookie,
        "Content-type": "application-json",
      },
    };
    let response = await fetch(url, options);
    const data = await response.json();

    user = data.data;
  }

  onMount(getUser);
  onMount(getPosts);
</script>

<div
  class="container p-2 content-container w-full max-h-full flex flex-col m-2 rounded overflow-auto"
>
  <div class="overflow-auto relative">
    <div class="w-full relative">
      <FollowerProfileDesign />

      <div class="relative bottom-16 left-0">
        <div class="w-full flex">
          <div class="flex flex-col w-full justify-start mt-5">
            <p class="text-left">{user.firstName}</p>
            <p class="text-left">Joined January 2011</p>
          </div>
        </div>
        <div class="flex w-full justify-end relative bottom-20 left-0">
          <Button color="alternative" size="xs">Edit profile</Button>
        </div>
      </div>
    </div>

    <div
      class="container p-2 w-full  flex flex-col m-2 rounded relative  bottom-16 left-0 "
    >
      <Tabs defaultClass="flex" contentClass="bg-inherit">
        <TabItem open title="Kvidr's" defaultClass="m-1">
 
            {#if isApproved}
              {#each posts as post}
                <Post {post} />
              {/each}
            {:else}
              <h1>No Content</h1>
            {/if}

        </TabItem>
      </Tabs>
    </div>
  </div>
</div>
