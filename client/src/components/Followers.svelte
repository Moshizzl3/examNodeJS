<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Avatar,
    A,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { cookie, BASE_URL } from "../store/global.js";

  let followingList = [];
  let imageObjectURL;

  async function getFollowers() {
    const response = await fetch(`${$BASE_URL}/followers/following`, {
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
  async function loadPic(id) {
    console.log(id);
    const url = `${$BASE_URL}/users/profile-image/follower/${id}`;
    const options = {
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
      method: "GET",
    };
    let response = await fetch(url, options);
    if (response.status === 200) {
      const imageBlob = await response.blob();
      imageObjectURL = URL.createObjectURL(imageBlob);
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
            {#await loadPic(following.user_id)}
              <p>Loading</p>
            {:then}
              <Avatar src={imageObjectURL} rounded class="object-cover" />
            {/await}
          </div>
        </TableBodyCell>
        <TableBodyCell>
          <A href={`profile/follower/?user=${following.user_id}`}>
            {following.first_name}
          </A>
        </TableBodyCell>
        <TableBodyCell
          >{new Date(following.followed_on).toDateString()}</TableBodyCell
        >
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
