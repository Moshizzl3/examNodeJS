<script>
  import Post from "../Post.svelte";
  import NewPost from "../NewPost.svelte";
  import { cookie, BASE_URL } from "../../store/global.js";
  import { onMount } from "svelte";

  let isApproved = false;
  let posts;

  function handleUpdate(){
    posts =[]
    getPosts()
  }

  async function getPosts() {
    const response = await fetch($BASE_URL + "/posts", {
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
    posts = data.data
  }

  onMount(getPosts);
</script>

<div
  class="container p-2 content-container w-full max-h-full flex flex-col justify-end m-2 rounded"
>
  <div
    class="container p-2 w-full max-h-full overflow-auto flex flex-col items-center m-2 rounded"
  >
  {#if isApproved}
  <NewPost on:message={handleUpdate}/>
  {#each posts as post}
    <Post post={post}/>
  {/each}
{:else}
  <h1>No Content</h1>
{/if}
  </div>
</div>
