<script>
  import Footer from "../../components/Footer.svelte";
  import HomeContent from "../../components/contentComponents/HomeContent.svelte";
  import SideBar from "../../components/SidebarLeft.svelte";
  import SidebarRight from "../../components/SidebarRight.svelte";
  import {webSocket} from "../../store/global.js"

</script>

<div
  class="container w-100 md:flex items-start justify-start main-container p-2"
>
  <SideBar />
  <HomeContent/>
  <SidebarRight/>
</div>



<Footer />

<style>
  .main-container {
    max-height: calc(100vh - 15vh);
  }
</style>
