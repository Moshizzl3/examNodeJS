<script>
      import {
    Footer,
    FooterLinkGroup,
    FooterLink,
    FooterCopyright,
  } from "flowbite-svelte";

</script>

<div class="mt-2 w-full">
    <Footer>
      <FooterCopyright href="/home" by="Kvidr" year={2022} />
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