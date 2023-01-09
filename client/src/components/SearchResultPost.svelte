<script>
  import { Card, Listgroup, Avatar } from "flowbite-svelte";
  let list = [
    {
      img: { src: "/images/profile-picture-1.webp", alt: "Neil Sims" },
      name: "Neil Sims",
      email: "email@windster.com",
      value: "$320",
    },
    {
      img: { src: "/images/profile-picture-2.webp", alt: "Bonnie Green" },
      name: "Bonnie Green",
      email: "email@windster.com",
      value: "$3467",
    },
    {
      img: { src: "/images/profile-picture-3.webp", alt: "Michael Gough" },
      name: "Michael Gough",
      email: "email@windster.com",
      value: "$67",
    },
  ];
</script>

<div class="mt-1">
  <Card padding="xl" size="sm">
    <div class="flex items-center space-x-4">
      <Avatar
        src={list[0].img.src}
        alt={list[0].img.alt}
        class="flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <p class="text-sm font-small text-gray-900 truncate dark:text-white">
          {list[0].name}
        </p>
        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat nam
          facilis eveniet officiis temporibus esse fugit rerum quisquam non ut,
          maiores aliquid laboriosam accusamus nisi adipisci aperiam obcaecati
          neque veritatis.
        </p>
      </div>
    </div>
  </Card>
</div>

