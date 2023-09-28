<script lang="ts">
	import { Header } from '$lib/components';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex h-full min-h-full flex-col">
	<div class="w-full shadow-sm bg-white">
		<div class="container h-auto flex-initial mx-auto">
			<Header path={data.url.pathname} />
		</div>
	</div>
	<div class="h-full flex-auto container mx-auto pt-8">
		<slot />
	</div>
</div>

<style>
	:global(body) {
		background-color: #fafafa;
	}
</style>
