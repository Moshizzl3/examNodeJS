<script>export let notifications;
</script>

{#each notifications as { likeUser, postUser, date, text, title }}
	<li class="mb-10 ml-6">
		<div
			class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600"
		>
			<div class="justify-between items-center mb-3 sm:flex">
				<time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{date}</time>
				<div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">
					{@html title}
				</div>
			</div>
			{#if text}
				<div
					class="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300"
				>
					{@html text}
				</div>
			{/if}
		</div>
	</li>
{/each}
