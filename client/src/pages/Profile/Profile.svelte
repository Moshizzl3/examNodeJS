<script>
  import Footer from "../../components/Footer.svelte";
  import ProfileContent from "../../components/contentComponents/ProfileContent.svelte";
  import SideBar from "../../components/SidebarLeft.svelte";
  import SidebarRight from "../../components/SidebarRight.svelte";


</script>

<div class="container w-100 h-full md:flex items-start justify-start main-container p-2">
  <SideBar/>
  <ProfileContent/>
  <SidebarRight/>
</div>

<Footer />

<style>
  .main-container {
    max-height: calc(100vh - 15vh);
  }

</style>
