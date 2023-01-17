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

  async function getMyFollowings() {
    const response = await fetch(`${$BASE_URL}/api/followers`, {
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      followingList = data.data;
    }
  }

  async function loadPic(id) {
    const url = `${$BASE_URL}/api/images/profile-image/follower/${id}`;
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

  onMount(getMyFollowings);
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
            {#await loadPic(following.following_user_id)}
              <p>loading</p>
            {:then}
              <Avatar src={imageObjectURL} rounded class="object-cover" />
            {/await}
          </div>
        </TableBodyCell>
        <TableBodyCell>
          <A href={`profile/follower/?user=${following.following_user_id}`}>
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
