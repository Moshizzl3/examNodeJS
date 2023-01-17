<script>
  import { cookie, BASE_URL } from "../../store/global.js";
  import {
    Button,
    Tabs,
    TabItem,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Avatar,
    A,
  } from "flowbite-svelte";
  import Post from "../Post.svelte";
  import Input from "flowbite-svelte/forms/Input.svelte";

  let isApproved = false;
  let searchParameters = "";
  let searchResultPosts = [];
  let searchResultPeople = [];
  let imageObjectURL;

  async function searchPosts() {
    searchResultPosts = [];
    const body = { searchParameters };
    const response = await fetch(`${$BASE_URL}/api/posts/search`, {
      method: "POST",
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      isApproved = false;
    }
    const data = await response.json();
    searchResultPosts = data.data;
    isApproved = true;
  }

  async function searchPeople() {
    searchResultPeople = [];
    const body = { searchParameters };
    const response = await fetch(`${$BASE_URL}/api/users/search`, {
      method: "POST",
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      isApproved = false;
    }
    const data = await response.json();
    searchResultPeople = data.data;
    isApproved = true;
  }

  async function loadPic(imgUrl) {
    const url = `${$BASE_URL}/api/images/img-name/${imgUrl}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: $cookie,
      },
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

  async function followPerson(followingId) {
    const response = await fetch(`${$BASE_URL}/api/followers`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: $cookie,
      },
      body: JSON.stringify({ followingId }),
    });
    if (!response.ok) {
    }
  }
</script>

<div
  class="container p-2 content-container w-full  max-h-full flex flex-col justify-end m-2 rounded"
>
  <div
    class="container p-2 w-full max-h-full overflow-auto flex flex-col m-2 rounded"
  >
    <div class="container w-full flex">
      <div class="w-full flex ">
        <Input class="m-1" type="text" bind:value={searchParameters} />
        <Button class="m-1" color="alternative" size="xs" on:click={searchPosts}
          >Search</Button
        >
      </div>
    </div>
    <div class="flex w-full justify-end items-center">
      <div class="container p-2 w-full  flex flex-col m-2 rounded">
        <Tabs defaultClass="flex" contentClass="bg-inherit">
          <TabItem open title="Kvidr's">
            <div class="mt-2">
              {#if isApproved}
                {#each searchResultPosts as post}
                  <Post {post} />
                {/each}
              {/if}
            </div>
          </TabItem>
          <TabItem title="People" on:click={searchPeople}>
            {#if isApproved}
              <Table color="default" hoverable={true}>
                <TableHead>
                  <TableHeadCell />
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Country</TableHeadCell>
                  <TableHeadCell />
                </TableHead>
                <TableBody>
                  {#each searchResultPeople as people}
                    <TableBodyRow>
                      <TableBodyCell>
                        <div class="w-full flex justify-center">
                          {#await loadPic(people.profile_image_url) then imgUrl}
                            <Avatar src={imgUrl} rounded class="object-cover" />
                          {/await}
                        </div>
                      </TableBodyCell>
                      <TableBodyCell>
                        <A href={`profile/follower/?user=${people.id}`}>
                          {people.first_name}
                        </A></TableBodyCell
                      >
                      <TableBodyCell>{people.first_name}</TableBodyCell>
                      <TableBodyCell>
                        <div class="w-full flex justify-center">
                          <Button
                            class="m-1 w-1/2"
                            color="alternative"
                            size="xs"
                            on:click={() => followPerson(people.id)}
                            >Follow</Button
                          >
                        </div>
                      </TableBodyCell>
                    </TableBodyRow>
                  {/each}
                </TableBody>
              </Table>
            {/if}
          </TabItem>
        </Tabs>
      </div>
    </div>
  </div>
</div>
