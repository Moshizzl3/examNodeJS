<script>
  import { Activity, ActivityItem } from "flowbite-svelte";
  let activities = [
    {
      title: "",
      date: "just now",
      alt: "image alt here",
      src: "/img/mo.jpeg",
      text: "The approach will not be easy. You are required to maneuver straight down this trench and skim the surface to this point. The target area is only two meters wide. ",
    
    },
    {
      title: "",
      date: "2 hours ago",
      alt: "image alt here",
      src: "/img/mo.jpeg",
      text: "The approach will not be easy. You are required to maneuver straight down this trench and skim the surface to this point. The target area is only two meters wide. ",
    },
    {
      title: "",
      date: "1 day ago",
      alt: "/img/mo.jpeg",
      src: "/img/mo.jpeg",
      text: "heeelo",
    },
  ];
</script>

<div class="w-content">
  <div class="mt-2">
    <Activity>
      <ActivityItem {activities} />
      <ActivityItem {activities} />
    </Activity>
  </div>
</div>
