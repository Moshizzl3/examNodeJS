<script>
  import { Card, Button, Toggle, Avatar } from "flowbite-svelte";
  import AvatarDetailed from "./AvatarDetailed.svelte";
  import CommentSection from "./CommentSection.svelte";
  import { BASE_URL } from "../store/global";
  import { onMount } from "svelte";
  let hCard = false;
  export let post;
  let imageObjectURL;

  if (post.image_url) {
    async function load_pic() {
      const url = `${$BASE_URL}/posts/image/${post.image_url}`;
      const options = {
        method: "GET",
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

    onMount(load_pic);
  }
</script>

<div class="w-full border main-container container p-2">
  <div class="user-container">
    <AvatarDetailed
      userImage={post.profile_image_url}
      postDate="{post.created_on}"
      userName={post.first_name}
      />
  </div>
  <div class="mt-2 flex justify-center w-full">
    <Card img={imageObjectURL} horizontal reverse={hCard} class="w-full h-full">
      <p
        class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight"
      >
        {post.text}
      </p>
    </Card>
  </div>
  <div>
    <CommentSection postId={post.id} commentId={null} />
  </div>
</div>
