<script lang="ts">
	import LanguageSwitch from '$lib/components/LanguageSwitch.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<header>
	<Logo />
	<LanguageSwitch />
</header>
<main>
	<p class="text">{m.intro()}</p>
	<p class="text">{m.waitlist_paragraph()}</p>
	<form>
		<!-- COMPONENT-START: nc-input-field -->
		<div class="nc-input-field">
			<label for="input" class="nc-stack">
				<span class="nc-input-label">{m.form_waitlist_email_input()}</span>
			</label>
			<input
				id="input"
				class="nc-input input"
				aria-required="true"
				autocomplete="email"
				type="email"
				required
			/>
		</div>
		<!-- COMPONENT-END: nc-input-field -->
		<button class="nc-button -primary submit-button" type="submit"
			>{m.form_waitlist_submit_label()}</button
		>
	</form>
</main>

<style>
	@custom-media --motionOK (prefers-reduced-motion: no-preference);

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: var(--spacing-far);
	}

	.text {
		margin-block: var(--spacing-far);
	}

	.input {
		font-size: var(--font-size-display);
		padding-block: var(--spacing-base);
		block-size: 1lh;
	}

	.submit-button {
		margin-block-start: var(--spacing-base);
	}
</style>
