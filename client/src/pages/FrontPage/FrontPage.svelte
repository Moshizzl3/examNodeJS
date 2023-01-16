<script>
  import Footer from "../../components/Footer.svelte";
  import { BASE_URL } from "../../store/global";
  import toastr from "toastr";
  import {
    Card,
    Button,
    Input,
    Label,
  } from "flowbite-svelte";

  let mail = "";
  let password = "";
  let messageToUser = "";

  async function login() {
    const user = { mail: mail, password: password };

    const response = await fetch(`${$BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.token}`;
      window.location.replace("/home");
      mail = "";
      password = "";
      messageToUser = "";
    } else {
      toastr.options.timeOut = 3000;
      toastr.error("Wrong email or password, please try again");
    }
  }
</script>

<div class="h-full  main-container">
  <div class="flex flex-col items-center justify-center h-full w-full">
    <Card class="w-1/2">
      <form class="flex flex-col space-y-8">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
          Sign in to Kvidr
        </h3>
        <Label class="space-y-2">
          <span>Email</span>
          <Input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
            bind:value={mail}
          />
        </Label>
        <Label class="space-y-2">
          <span>Your password</span>
          <Input
            type="password"
            name="password"
            placeholder="•••••"
            required
            bind:value={password}
          />
        </Label>
        <div class="">
          <a
            href="/forgot-password"
            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >Forgot password?</a
          >
        </div>

        <Button on:click={login} class="w-full">Login to your account</Button>

        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a
            href="/signup"
            class="text-blue-700 hover:underline dark:text-blue-500"
            >Create account</a
          >
        </div>
      </form>
    </Card>
  </div>
</div>
<Footer />


<style>
  .main-container {
    min-height: calc(100vh - 20vh);
    min-width: calc(100vw - 40vh);
  }
</style>
