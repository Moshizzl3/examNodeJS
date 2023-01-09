<script>
  import { useNavigate, useLocation } from "svelte-navigator";
  import { cookie } from "../../store/global.js";

  const navigate = useNavigate();
  const location = useLocation();


  $: if (!$cookie) {
    navigate("/", {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

{#if $cookie}
  <slot />
{/if}
