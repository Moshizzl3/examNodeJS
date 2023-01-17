<script>
  import {
    Button,
    Modal,
    Label,
    Input,
    Checkbox,
    ButtonGroup,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { BASE_URL, cookie } from "../store/global";
  import { webSocket } from "../store/global.js";
  import toastr from "toastr";

  export let postId;
  export let commentId = null;

  let likeId;
  let likeCount;

  async function likePost() {
    const body = {
      postId,
      commentId,
    };

    const response = await fetch(`${$BASE_URL}/api/likes/post`, {
      method: "POST",
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    likeId = data.data.likeId;

    $webSocket.emit("like", data.data.likeInfo);

    likeCount++;
  }

  async function unlikePost() {
    const response = await fetch(`${$BASE_URL}/api/likes/post/${likeId}`, {
      method: "DELETE",
      headers: {
        Authorization: $cookie,
      },
    });
    likeId = null;
    likeCount--;
  }

  async function getLikeStatus() {
    const response = await fetch(`${$BASE_URL}/api/likes/post/status/${postId}`, {
      headers: { Authorization: $cookie },
    });
    const data = await response.json();
    likeId = data.data;
  }

  async function getLikeCount() {
    const response = await fetch(`${$BASE_URL}/api/likes/post/count/${postId}`, {
      headers: { Authorization: $cookie },
    });
    const data = await response.json();
    likeCount = data.data;
  }

  function featureNotReady() {
    toastr.options.timeOut = 2000;
    toastr.success("Feature comming soon");
  }

  onMount(getLikeCount);
  onMount(getLikeStatus);
</script>

<div class="container w-full">
  <ButtonGroup class="justify-center mt-2 container">
    <div class="md:flex justify-between w-3/4 gap-2 mb-2 container">
      <!--insights-->
      <Button class="!p-2 border-none" on:click={featureNotReady}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><line x1="18" y1="20" x2="18" y2="10" /><line
            x1="12"
            y1="20"
            x2="12"
            y2="4"
          /><line x1="6" y1="20" x2="6" y2="14" /></svg
        ></Button
      >
      <!--comment-->
      <Button class="!p-2 border-none" on:click={featureNotReady}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          /></svg
        >
      </Button>

      <!--retweet-->
      <Button class="!p-2 border-none" on:click={featureNotReady}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><path d="M17 2.1l4 4-4 4" /><path
            d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"
          /><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" /></svg
        ></Button
      >
      <!--like-->
      <div class="flex items-center">
        {#if likeId}
          <Button class="!p-2 border-none" on:click={unlikePost}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="red"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              /></svg
            >
          </Button>
        {:else}
          <Button class="!p-2 border-none" on:click={likePost}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              /></svg
            >
          </Button>
        {/if}
        <p class="pl-1">{likeCount ? likeCount : "0"}</p>
      </div>
      <!--share-->
      <Button class="!p-2 border-none" on:click={featureNotReady}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><g fill="none" fill-rule="evenodd"
            ><path
              d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"
            /></g
          ></svg
        ></Button
      >
    </div>
  </ButtonGroup>
</div>
