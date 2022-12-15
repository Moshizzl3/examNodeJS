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
    Footer,
    FooterLinkGroup,
    FooterLink,
    FooterCopyright,
  } from "flowbite-svelte";

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

<div class="main-container border-4">
  <div class="pb-16">
    <div class="text-center min-h-1/2">
      <Heading
        tag="h1"
        class="mb-4"
        customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
        >Sign up</Heading
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
<div class="mt-2">
  <Footer>
    <FooterCopyright href="/" by="Flowbite™" year={2022} />
    <FooterLinkGroup
      ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
    >
      <FooterLink href="/">About</FooterLink>
      <FooterLink href="/">Privacy Policy</FooterLink>
      <FooterLink href="/">Licensing</FooterLink>
      <FooterLink href="/">Contact</FooterLink>
    </FooterLinkGroup>
  </Footer>
</div>

<style>
  .main-container {
    min-height: calc(100vh - 15vh);
  }
</style>
