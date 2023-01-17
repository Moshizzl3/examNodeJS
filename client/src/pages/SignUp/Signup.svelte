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

  toastr.options.timeOut = 3000;

  const user = {
    firstName: "",
    lastName: "",
    mail: "",
    password1: "",
    password2: "",
  };

  async function signUp() {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const data = await response.json()
      data.errors.forEach(element => {
        toastr.error(element);
      });
      return;
    }

    toastr.success("you are now signed up, you will be redirected shortly");
    setTimeout(() => {
      window.location.replace("/");
    }, 3000);
  }
</script>

<div class="main-container">
  <div class="pb-16">
    <div class="text-center min-h-1/2">
      <Heading tag="h4" class="mb-4"
        >Are you ready to sign up, and have a blast at kViddr?</Heading
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
          <Label for="password1" class="mb-2">Password</Label>
          <Input
            bind:value={user.password1}
            type="password"
            id="password1"
            placeholder="•••••••••"
            required
          />
        </div>
        <div class="mb-6">
          <Label for="password2" class="mb-2">Confirm password</Label>
          <Input
            bind:value={user.password2}
            type="password"
            id="password2"
            placeholder="•••••••••"
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
