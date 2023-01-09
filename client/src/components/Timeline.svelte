<script>
  import { Activity, ActivityItem } from "flowbite-svelte";
  let activities = [
    {
      title:
        'Bonnie moved <a href="/" class="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Jese Leos</a> to <span class="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">Funny Group</span>',
      date: "just now",
      alt: "image alt here",
      src: "/img/mo.jpeg",
    },
    {
      title: "We don’t serve their kind here! What? Your droids. ",
      date: "2 hours ago",
      alt: "image alt here",
      src: "/img/mo.jpeg",
      text: "The approach will not be easy. You are required to maneuver straight down this trench and skim the surface to this point. The target area is only two meters wide. ",
    },
    {
      title: "They’ll have to wait outside. We don’t want them here. ",
      date: "1 day ago",
      alt: "/img/mo.jpeg",
      src: "/img/mo.jpeg",
      text: "heeelo",
    },
  ];
</script>

<div class="mt-2">
  <Activity>
    <ActivityItem {activities} />
  </Activity>
</div>
