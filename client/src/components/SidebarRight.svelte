<script>
  import {
    Sidebar,
    SidebarGroup,
    Input,
    SidebarWrapper,
  } from "flowbite-svelte";
  import Post from "./Post.svelte";
  import SearchResultPost from "./SearchResultPost.svelte";
  import Timeline from "./Timeline.svelte";
</script>

<div
  class="container w-1/3  p-2 sidebar-container md:flex max-h-full flex-col items-start justify-center"
>
  <div class="hidden relative md:block m-2">
    <div
      class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 dark:text-white"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        /></svg
      >
    </div>
    <Input id="search-navbar" class="pl-10" placeholder="Search..." />
  </div>
  <div class="mt-2">
    <p class="dark:bg-white">Feed</p>
  </div>
  <div class="container flex flex-col items-start">
    <Timeline />
  </div>
</div>
