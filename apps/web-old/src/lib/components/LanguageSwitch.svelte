<script>
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
</script>

<fieldset
	class="switch-group"
	onchange={(e) => {
		console.log(e.target.value);
		setLocale(e.target.value);
	}}
>
	<legend>{m.language()}</legend>
	<div class="group-switch">
		<input
			checked={getLocale() === 'de'}
			type="radio"
			name="language"
			id="language-de"
			value="de"
		/>
		<label for="language-de">DE</label>
	</div>
	<div class="group-switch">
		<input
			checked={getLocale() === 'en'}
			type="radio"
			name="language"
			id="language-en"
			value="en"
		/>
		<label for="language-en">EN</label>
	</div>
</fieldset>

<style>
	.switch-group {
		font-family: var(--font-family-default);
		/* inline layout with minor space between */
		display: flex;
		gap: var(--spacing-nearest);

		/* defensive against flex/grid stretching */
		max-inline-size: max-content;

		/* card surface should sit above background */
		background: var(--color-surface-subtle);
		padding: var(--spacing-nearest);
		border-radius: var(--border-radius-medium);
		/* box-shadow: var(--shadow-2); */

		/* remove fieldset border */
		border: none;

		/* animate box-shadow as it changes */
		transition: box-shadow 0.5s var(--ease-squish-3);

		/* change box-shadow when focus is inside */
		&:is(:focus-within, :hover) {
			/* box-shadow: var(--shadow-4); */
		}

		/* legend is useful to AT's but not our visible UI */
		& > legend {
			visibility: hidden;
			block-size: 0;
		}
	}

	.group-switch {
		/* single cell grid, prepare for the pile */
		display: grid;
		place-items: center;
		padding-block: var(--spacing-nearest);
		padding-inline: var(--spacing-near);

		/* sets width */
		inline-size: auto;

		/* soft corner */
		/* is considerate of being a nested radius */
		/* https://codepen.io/BrianCross/pen/KKmgmXb */
		border-radius: calc(var(--border-radius-medium) * 0.5);

		@media (--motionOK) {
			transition:
				outline-offset 0.3s ease,
				background-color 0.3s ease;
		}

		/* when not pressed via keyboard */
		/* has the side effect of creating an animation */
		/* because :active will be 0 offset */
		&:not(:has(:active)) {
			outline-offset: 2px;
		}

		/* if focus is showing and there's focus within */
		/* provide a nice outline style */
		&:has(:focus-visible):focus-within {
			outline: 1px solid var(--color-border-base);
		}

		/* if the radio inside is checked */
		/* this switch is selected */
		&:has(:checked) {
			color: var(--color-text-base);
		}

		& :checked ~ :is(svg, label) {
			color: var(--color-text-base);
		}

		/* stylish hover/selected background */
		&:has(:checked),
		&:hover {
			background: var(--color-surface-base);
		}

		/* all direct children pile into the single grid cell */
		& > :is(input, label, svg) {
			grid-area: 1/1;
			inline-size: 100%;
			block-size: 100%;
			font-weight: var(--font-weight-strong);
		}

		/* and dont just grow to fit, but max the size to fit */
		/* if not the SVG icon */
		/* content is there and interactive, just not visible */
		& > :is(input) {
			opacity: 0;
			overflow: hidden;
			white-space: nowrap;
		}

		/* icon color to follow the text color set on the switch parent */
		& > svg {
			fill: currentColor;
		}
	}
</style>
