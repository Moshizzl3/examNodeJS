<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Avatar,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { cookie, BASE_URL } from "../store/global.js";

  let followingList = [];
  let imageObjectURL;

  async function getFollowers() {
    const response = await fetch(`${$BASE_URL}/followers`, {
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.data);
      followingList = data.data;
    }
  }

  async function load_pic(following) {
    const url = `${$BASE_URL}/posts/image/${following}`;
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

  onMount(getFollowers);
</script>

<Table color="default" hoverable={true}>
  <TableHead>
    <TableHeadCell />
    <TableHeadCell>Name</TableHeadCell>
    <TableHeadCell>Following since</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each followingList as following}
      <TableBodyRow>
        <TableBodyCell>
          <div class="w-full flex justify-center">
            {#await load_pic(following.profile_image_url) then imgUrl}
              <Avatar src={imgUrl} rounded class="object-cover" />
            {/await}
          </div>
        </TableBodyCell>
        <TableBodyCell>{following.first_name}</TableBodyCell>
        <TableBodyCell>Laptop</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
