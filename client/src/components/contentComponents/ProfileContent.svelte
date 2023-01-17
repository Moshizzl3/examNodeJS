<script>
  import Post from "../Post.svelte";
  import { cookie, BASE_URL } from "../../store/global.js";
  import { onMount } from "svelte";
  import { Button } from "flowbite-svelte";
  import { Tabs, TabItem } from "flowbite-svelte";
  import ProfileDesign from "../ProfileDesign.svelte";
  import Following from "../Following.svelte";
  import Followers from "../Followers.svelte";
  let isApproved = false;
  let posts;
  let userName;

  async function getPosts() {
    const response = await fetch(`${$BASE_URL}/api/posts`, {
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

  onMount(getPosts);
  onMount(getUserName);
</script>

<div
  class="container p-2 content-container w-full max-h-full flex flex-col m-2 rounded overflow-auto"
>
  <div class="overflow-auto relative">
    <div class="w-full relative">
      <ProfileDesign />
      <div class="relative bottom-16 left-0">
        <div class="w-full flex">
          <div class="flex flex-col w-full justify-start mt-5">
            <p class="text-left dark:text-white">{userName}</p>
          </div>
        </div>
        <div class="flex w-full justify-end relative bottom-12 left-0">
          <Button color="alternative" size="xs">Edit profile</Button>
        </div>
      </div>
    </div>

    <div
      class="container p-2 w-full  flex flex-col m-2 rounded relative  bottom-16 left-0 "
    >
      <Tabs defaultClass="flex justify-between" contentClass="bg-inherit">
        <TabItem open title="Kvidr's">
          {#if isApproved}
            {#each posts as post}
              <Post {post} />
            {/each}
          {:else}
            <h1>No Content</h1>
          {/if}
        </TabItem>
        <TabItem title="Following">
          <Following />
        </TabItem>
        <TabItem title="Followers">
          <Followers />
        </TabItem>
      </Tabs>
    </div>
  </div>
</div>
