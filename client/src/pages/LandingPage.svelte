<script>
  import {
    Card,
    ToolbarButton,
    Dropdown,
    DropdownItem,
    Avatar,
    Button,
    Input,
    Label,
    Checkbox,
    Footer,
    FooterCopyright,
    FooterLink,
    FooterLinkGroup,
  } from "flowbite-svelte";
</script>
<div class="container w-full flex items-center justify-center main-container bg-teal-50">
  <div class="container">
    <div class="container latest-content h-full flex justify-center">
      <Card padding="sm" class="w-2/3">
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Latest login
        </h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Click to login again
        </p>
        <div class="flex justify-end">
          <ToolbarButton
            class="dots-menu text-gray-900 bg-white dark:text-white dark:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              /></svg
            >
          </ToolbarButton>
          <Dropdown class="w-36" triggeredBy=".dots-menu">
            <DropdownItem>Remove</DropdownItem>
          </Dropdown>
        </div>
        <div class="flex flex-col items-center pb-4">
          <Avatar size="lg" src="src/ressources/images/mo.jpeg" />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>
          <div class="flex mt-4 space-x-3 lg:mt-6">
            <Button color="light" class="dark:text-white">login</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
  <div class="container login-content">
    <Card>
      <form class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
          Sign in to our platform
        </h3>
        <Label class="space-y-2">
          <span>Email</span>
          <Input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
          />
        </Label>
        <Label class="space-y-2">
          <span>Your password</span>
          <Input type="password" name="password" placeholder="•••••" required />
        </Label>
        <div class="flex items-start">
          <Checkbox>Remember me</Checkbox>
          <a
            href="/"
            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >Lost password?</a
          >
        </div>
        <Button type="submit" class="w-full">Login to your account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a
            href="/"
            class="text-blue-700 hover:underline dark:text-blue-500"
            >Create account</a
          >
        </div>
      </form>
    </Card>
  </div>
</div>

<div class="mt-2 w-full">
  <Footer class="bg-teal-50">
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
