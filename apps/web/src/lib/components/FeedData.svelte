<script lang="ts">
	import { getFeed } from './feed.remote';
</script>

<div>
	<ul>
		{#each await getFeed() as item}
			<li>
				<pre>{JSON.stringify(item, null, 2)}</pre>
			</li>
		{/each}
	</ul>
</div>
