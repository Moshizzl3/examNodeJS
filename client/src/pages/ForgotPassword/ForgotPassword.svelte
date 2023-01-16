<script>
  import { Footer } from "flowbite-svelte";

  import ForgotPasswordForm from "../../components/contentComponents/ForgotPassword.svelte";
</script>

<div
  class="container w-100 md:flex items-start justify-start main-container p-2"
>
  <div class="container mainContainer ">
    <div class="row d-flex justify-content-center">
      <div class="container col-8 textContainer">
        <p>Forgot Password</p>
      </div>
    </div>

    <div
      class="row d-flex justify-content-center align-content-center h-75 changePasswordContent"
    >
      <!-- change password content -->
      <div
        class="container col-sm-4 border-secondary contentContainer p-4 rounded"
      >
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
