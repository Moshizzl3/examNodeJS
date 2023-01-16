<script>
  import {
    Textarea,
    Toolbar,
    ToolbarButton,
    ToolbarGroup,
    Button,
    Modal,
    Label,
    Input,
    Fileupload,
    Img
  } from "flowbite-svelte";
  import AvatarDetailed from "./AvatarDetailed.svelte";
  import { BASE_URL, cookie } from "../store/global.js";
  import { createEventDispatcher } from "svelte";
  import AvatarSimple from "./AvatarSimple.svelte";

  let formModal = false;
  let postText;
  let imageFiles;
  let imageName;

  const dispatcher = createEventDispatcher();

  //new post, first we uploade image if one is present, then we get new url back, that we use to retrive picture again
  async function newPost() {
    let post = { text: postText };
    let imageUrl;
    if (imageFiles) {
      const formData = new FormData();
      formData.append("files", imageFiles[0]);
      const response = await fetch(`${$BASE_URL}/upload_image`, {
        headers: {
          Authorization: $cookie,
        },
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        imageUrl = data.data;
      }
      post.imageUrl = imageUrl
      postText=""
      imageFiles=""
      imageName=""
    }

    const response = await fetch(`${$BASE_URL}/posts`, {
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(post),
    });
    if (response.ok) {
      dispatcher("message", { text: "ok" });
      postText=""
      imageFiles=""
      imageName=""
    }
  }
</script>

<div class="w-full border container bg-green p-2">
  <div class="user-container">
    <AvatarSimple/>
  </div>
  {#if imageFiles}
  <Img size="max-w-md"  alignment="mx-auto" src={URL.createObjectURL(imageFiles[0])} alt="sample 1"/>
  {/if}
  <div class="mt-2 flex justify-center">
    <form class="w-full">
      <label for="editor" class="sr-only">Publish post</label>
      <Textarea
        id="editor"
        rows="3"
        class="test"
        placeholder="Write a comment"
        bind:value={postText}
      >
        <Toolbar slot="header" embedded>
          <ToolbarGroup>
            <ToolbarButton
              name="Upload image"
              on:click={() => (formModal = true)}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                /></svg
              ></ToolbarButton
            >
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarButton name="Add emoji"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                /></svg
              ></ToolbarButton
            >
          </ToolbarGroup>
          <ToolbarButton name="send" slot="end" on:click={newPost}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              /></svg
            ></ToolbarButton
          >
        </Toolbar>
      </Textarea>
    </form>
  </div>

  <Modal bind:open={formModal} size="xs" autoclose={false}>
    <form class="flex flex-col space-y-6" action="#">
      <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
        Upload image
      </h3>
      <div>
        <Label class="space-y-2 mb-2">
          <span>Upload file</span>
          <Fileupload
            bind:files={imageFiles}
            bind:value={imageName}
            name="files"
          />
        </Label>
        <Label>File: {imageName}</Label>
      </div>
      <Button on:click={() => (formModal = false)} class="w-full1"
        >confirm</Button
      >
    </form>
  </Modal>
</div>
