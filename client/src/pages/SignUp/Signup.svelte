<script>
  import toastr from "toastr";
  import {
    Input,
    Label,
    Heading,
    P,
    Checkbox,
    A,
    Button,
  } from "flowbite-svelte";
  import Footer from "../../components/Footer.svelte";

  const user = {
    firstName: "",
    lastName: "",
    mail: "",
    password: "",
  };

  async function signUp() {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      toastr.success("you are now signed up, you will be redirected shortly");

      setTimeout(() => {
        window.location.replace("/");
      }, 3000);
    } else {
    }
  }
</script>

<div class="main-container">
  <div class="pb-16">
    <div class="text-center min-h-1/2">
      <Heading
        tag="h5"
        class="mb-4"
        customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
        >Are you ready to sign up, and have a blast at kViddr?</Heading
      >
      <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
        >Are you ready to sign up, and have a blast at kViddr?</P
      >
    </div>
  </div>

  <div class="container flex justify-center h-1/2">
    <div class="w-2/4">
      <form>
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
            required
          />
        </div>
        <div class="mb-6">
          <Label for="password" class="mb-2">Password</Label>
          <Input
            bind:value={user.password}
            type="password"
            id="password"
            placeholder="•••••••••"
            required
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
        <Checkbox class="mb-6 space-x-1" required
          >I agree with the <A href="/">terms and conditions</A>.</Checkbox
        >
        <Button type="button" on:click={signUp}>Submit</Button>
      </form>
    </div>
  </div>
</div>
<Footer />

<style>
  .main-container {
    min-height: calc(100vh - 15vh);
  }
</style>
