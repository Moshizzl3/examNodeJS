<script>
  import {
    Hr,
    P,
    Label,
    Input,
    Button,
    DarkMode,
    Img,
    Modal,
    Fileupload,
  } from "flowbite-svelte";
  import { BASE_URL, cookie } from "../../store/global";
  import toastr from "toastr";
  import { onMount } from "svelte";
  let profileImageObjectURL;
  let coverImageObjectURL;
  let profileImageModal = false;
  let coverImageModal = false;
  let imageFiles;
  let imageName;

  let user = {
    firstName: "",
    lastName: "",
    mail: "",
    password: "",
    profileImageUrl: "",
    coverImageUrl: "",
  };

  async function updatePassword() {
    const response = await fetch(`${$BASE_URL}/api/users/password`, {
      method: "PATCH",
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    toastr.options.timeOut = 3000;
    toastr.success("Password was updated, and you will be logged out");
    setTimeout(() => {
      window.location.replace("/");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }, 3000);
  }

  async function updateUserInfo() {
    const response = await fetch(`${$BASE_URL}/api/users`, {
      method: "PATCH",
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      toastr.options.timeOut = 3000;
      toastr.success("User info was updated");
    }
  }

  async function deleteUser() {
    const response = await fetch(`${$BASE_URL}/api/users`, {
      method: "DELETE",
      headers: {
        Authorization: $cookie,
      },
    });

    if (response.ok) {
      toastr.options.timeOut = 3000;
      toastr.success("Account was deleted, and you will be logged out");
      setTimeout(() => {
        window.location.replace("/");
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }, 3000);
    }
  }

  async function getUserInfo() {
    const response = await fetch(`${$BASE_URL}/api/users`, {
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      user = data.data;
    }
  }

  async function loadProfilePic() {
    const url = `${$BASE_URL}/users/profile-image`;
    const options = {
      method: "GET",
      headers: {
        Authorization: $cookie,
        "Content-type": "application-json",
      },
    };
    let response = await fetch(url, options);
    if (response.status === 200) {
      const imageBlob = await response.blob();
      profileImageObjectURL = URL.createObjectURL(imageBlob);
      return profileImageObjectURL;
    }
  }

  async function loadCoverPic() {
    const url = `${$BASE_URL}/users/cover-image`;
    const options = {
      method: "GET",
      headers: {
        Authorization: $cookie,
        "Content-type": "application/json",
      },
    };
    let response = await fetch(url, options);
    if (response.status === 200) {
      const imageBlob = await response.blob();
      coverImageObjectURL = URL.createObjectURL(imageBlob);
      return coverImageObjectURL;
    }
  }

  async function updateProfileImage() {
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
        user.profileImageUrl = imageUrl;
        updateUserInfo();
        loadProfilePic();
      }
      console.info(user);
      imageFiles = "";
      imageName = "";
    }
  }

  async function updateCoverImage() {
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
        user.coverImageUrl = imageUrl;
        updateUserInfo();
        loadCoverPic();
      }
      console.info(user);
      imageFiles = "";
      imageName = "";
    }
  }

  onMount(loadCoverPic);
  onMount(loadProfilePic);
  onMount(getUserInfo);
</script>

<div
  class="container p-2 content-container w-full max-h-full flex flex-col m-2 rounded overflow-auto"
>
  <div class="flex flex-col justify-start">
    <div class="container flex justify-start h-1/2">
      <div class="w-2/4 p-2 border-r">
        <P>Edit profile</P>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <Label for="first_name" class="mb-2">First name</Label>
            <Input
              bind:value={user.firstName}
              type="text"
              id="first_name"
              placeholder="John"
              required
            />
          </div>
          <div>
            <Label for="last_name" class="mb-2">Last name</Label>
            <Input
              bind:value={user.lastName}
              type="text"
              id="last_name"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div class="mb-6">
          <Label for="email" class="mb-2">Email address</Label>
          <Input
            bind:value={user.mail}
            type="email"
            id="email"
            placeholder="john.doe@company.com"
          />
        </div>
        <Button outline color="green" type="button" on:click={updateUserInfo}
          >Confirm</Button
        >
      </div>
      <div class="w-1/2 m-2 ">
        <P>Change password</P>
        <div class="mb-6 mt-1">
          <Label for="password" class="mb-2">Password</Label>
          <Input
            bind:value={user.password}
            type="password"
            id="password"
            placeholder="•••••••••"
          />
        </div>
        <div class="mb-6">
          <Label for="confirm_password" class="mb-2">Confirm password</Label>
          <Input
            type="password"
            id="confirm_password"
            placeholder="•••••••••"
            required
          />
        </div>
        <Button outline color="green" type="button" on:click={updatePassword}
          >Confirm</Button
        >
      </div>
    </div>
    <Hr class="my-3" height="h-px" />
    <div class="flex">
      <div
        class="w-1/2 h-full m-1 flex flex-col items-center"
        on:click={() => (profileImageModal = true)}
      >
        <P class="text-sm mb-2">Change profile picture</P>
        <Img
          src={profileImageObjectURL}
          alt="sample 1"
          class="rounded-lg object-cover"
          imgClass="h-full"
        />
      </div>
      <div
        class="w-1/2 m-1 flex flex-col items-center"
        on:click={() => (coverImageModal = true)}
      >
        <P class="text-sm mb-2">Change cover picture</P>
        <Img
          src={coverImageObjectURL}
          alt="sample 1"
          class="rounded-lg object-cover"
          imgClass="h-full"
        />
      </div>
    </div>

    <Hr class="my-8" height="h-px" />
    <div class="w-full flex flex-col justify-start">
      <P>Set darkmode</P>
      <div class="flex justify-start p-2">
        <DarkMode />
      </div>
    </div>
    <Hr class="my-8" height="h-px" />
    <div class="w-full flex flex-col justify-start">
      <P>Delete user</P>
      <div class="flex justify-center p-2">
        <Button outline color="red" on:click={deleteUser}>Delete</Button>
      </div>
    </div>
    <Hr class="my-8" height="h-px" />
  </div>
</div>

<div>
  <Modal bind:open={profileImageModal} size="xs" autoclose={false}>
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
      <Button
        on:click={async () => {
          await updateProfileImage();
          profileImageModal = false;
        }}
        class="w-full1">confirm</Button
      >
    </form>
  </Modal>
  <Modal bind:open={coverImageModal} size="xs" autoclose={false}>
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
      <Button
        on:click={async () => {
          coverImageModal = false;
          await updateCoverImage();
        }}
        class="w-full1">confirm</Button
      >
    </form>
  </Modal>
</div>
