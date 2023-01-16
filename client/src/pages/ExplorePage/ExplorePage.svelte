<script>
  import ExploreContent from "../../components/contentComponents/ExploreContent.svelte";
  import Footer from "../../components/Footer.svelte";
  import HomeContent from "../../components/contentComponents/HomeContent.svelte";
  import SideBar from "../../components/SidebarLeft.svelte";
  import SidebarRight from "../../components/SidebarRight.svelte";
</script>

<div
  class="container md:flex items-start justify-center main-container p-2"
>
  <SideBar />
  <ExploreContent />
  <SidebarRight/>
</div>

<Footer />

<style>
  .main-container {
    max-height: calc(100vh - 15vh);
    min-height: calc(100vh - 15vh);
  }
</style>
