<script>
  import { BASE_URL, cookie } from "../../store/global";
  import { onMount } from "svelte";
  import toastr from "toastr";
  import { Input, Button } from "flowbite-svelte";

  let mail;
  let password;
  let hasValidToken = false;

  async function sendMail() {
    const response = await fetch(`${$BASE_URL}/api/users/${mail}`);
    const data = await response.json();
    console.log(data.data);

    if (response.ok) {
      const mailResponse = await fetch(`${$BASE_URL}/mail/forgot`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
    }
  }

  async function checkUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("Bearer");
    console.log(token);
    if (token) {
      const response = await fetch(`${$BASE_URL}/api/mail/token`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console;
        const data = await response.json();
        mail = data.data;
        hasValidToken = true;
      }
    }
  }

  async function resetPassword() {
    if (hasValidToken) {
      const user = { mail, password };
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("Bearer");
      const response = await fetch(`${$BASE_URL}/api/users/password`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        toastr.success(
          "Password has been reset, you will be redirected shortly"
        );
        setTimeout(() => {
          window.location.replace("/");
        }, 5000);
      }
    }
  }

  onMount(checkUrl);
</script>

<div class="h-full min-w-full flex justify-center items-center">
  <form id="login-form">
    <!-- New Password input -->
    <div class="w-full">
      {#if hasValidToken}
        <div class="">
          <Input
            name="password"
            type="password"
            placeholder="Indtast nyt password"
            bind:value={password}
          />
        </div>

        <div class="mt-2">
          <!-- Submit button -->
          <Button on:click={resetPassword}>Confirm Changes</Button>
        </div>
      {:else}
        <div class="">
          <Input
            name="mail"
            type="text"
            placeholder="Input your mail"
            bind:value={mail}
          />
        </div>
        <div class="row mt-2">
          <!-- Submit button -->
          <Button on:click={sendMail}>Send mail</Button>
        </div>
      {/if}
    </div>
  </form>
</div>
