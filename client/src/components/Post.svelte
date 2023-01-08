<script>
  import { Card, Button, Toggle, Avatar } from "flowbite-svelte";
  import AvatarDetailed from "./AvatarDetailed.svelte";
  import CommentSection from "./CommentSection.svelte";
  let hCard = false;
</script>

<div class="w-3/4 border main-container container bg-white p-2">
    <div class="user-container">
        <AvatarDetailed/>
    </div>
    <div class="mt-2 flex justify-center">
        <Card img="/img/test.jpg" href="/" horizontal reverse={hCard}>
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Noteworthy technology acquisitions 2021
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in
              reverse chronological order.
            </p>
          </Card>
    </div>
    <div>
        <CommentSection />
    </div>
</div>
