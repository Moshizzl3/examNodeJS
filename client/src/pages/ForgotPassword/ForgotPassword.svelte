<script>
  import Footer from "../../components/Footer.svelte";

  import ForgotPasswordForm from "../../components/contentComponents/ForgotPassword.svelte";
</script>

<div class="container flex w-screen items-center mainContainer p-2">
  <div class="container h-full flex flex-col items-center">
    <div>
      <p class="dark:text-white">Forgot Password</p>
    </div>
    <!-- change password content -->
    <div>
      <div>
        <ForgotPasswordForm />
      </div>
    </div>
  </div>
</div>
<Footer />

<style>
  .mainContainer {
    min-height: calc(100vh - 15vh);
  }
</style>
