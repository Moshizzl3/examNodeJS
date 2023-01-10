<script>
  import Post from "../components/Post.svelte";
  import NewPost from "../components/NewPost.svelte";
</script>

<div
  class="container p-2 content-container w-full max-h-full flex flex-col justify-end m-2 rounded"
>
  <div
    class="container p-2 w-full max-h-full overflow-auto flex flex-col items-center m-2 rounded"
  >
    <NewPost />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
  </div>
  
</div>
