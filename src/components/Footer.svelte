<script>
  import Logo from "./Logo.svelte";
  const href =
    "https://ui.nordcode.agency/colors?styles=%7B%0A++%22fontFamilyMono%22%3A+%22monospace%22%2C%0A++%22fontFamilySans%22%3A+%22system-ui%2C+sans-serif%22%2C%0A++%22fontFamilySerif%22%3A+%22serif%22%2C%0A++%22fontFamilyDefault%22%3A+%22sans%22%2C%0A++%22fontSizeScale%22%3A+1.25%2C%0A++%22useCustomFontSizes%22%3A+false%2C%0A++%22fontSizeSmallest%22%3A+0.75%2C%0A++%22fontSizeSmall%22%3A+0.875%2C%0A++%22fontSizeBase%22%3A+1%2C%0A++%22fontSizeLarge%22%3A+1.25%2C%0A++%22fontSizeLargest%22%3A+1.5%2C%0A++%22fontSizeDisplay%22%3A+2.25%2C%0A++%22fontSizeUnit%22%3A+%22rem%22%2C%0A++%22lineHeightLarge%22%3A+3.4%2C%0A++%22lineHeightBase%22%3A+3%2C%0A++%22lineHeightSmall%22%3A+2.4%2C%0A++%22trackingTight%22%3A+-0.04%2C%0A++%22trackingStandard%22%3A+0%2C%0A++%22trackingWide%22%3A+0.06%2C%0A++%22fontWeightHeading%22%3A+600%2C%0A++%22fontWeightDefault%22%3A+400%2C%0A++%22fontWeightActive%22%3A+600%2C%0A++%22fontWeightStrong%22%3A+600%2C%0A++%22measureLarge%22%3A+88%2C%0A++%22measureBase%22%3A+72%2C%0A++%22measureSmall%22%3A+44%2C%0A++%22spacingTiny%22%3A+0.125%2C%0A++%22spacingNearest%22%3A+0.25%2C%0A++%22spacingNear%22%3A+0.5%2C%0A++%22spacingBase%22%3A+1%2C%0A++%22spacingFar%22%3A+2%2C%0A++%22spacingFarthest%22%3A+4%2C%0A++%22spacingScale%22%3A+2%2C%0A++%22borderRadiusNone%22%3A+0%2C%0A++%22borderWidthThin%22%3A+1%2C%0A++%22borderWidthMedium%22%3A+2%2C%0A++%22borderWidthThick%22%3A+4%2C%0A++%22borderWidthScale%22%3A+2%2C%0A++%22borderRadiusSmall%22%3A+2%2C%0A++%22borderRadiusMedium%22%3A+4%2C%0A++%22borderRadiusLarge%22%3A+8%2C%0A++%22borderRadiusScale%22%3A+2%2C%0A++%22shadowConfigDistanceBase%22%3A+0.8%2C%0A++%22shadowConfigDistanceScaleFactor%22%3A+1.3%2C%0A++%22shadowConfigBlurScaleFactor%22%3A+2%2C%0A++%22shadowConfigStartTransparency%22%3A+0.3%2C%0A++%22shadowConfigTransparencyScale%22%3A+0.85%2C%0A++%22shadowConfigSpreadMax%22%3A+-4%2C%0A++%22shadowConfigXOffsetFactor%22%3A+0.3%2C%0A++%22lightShadowColorLightness%22%3A+80%2C%0A++%22darkShadowColorLightness%22%3A+30%2C%0A++%22lightShadowColorChroma%22%3A+0.03%2C%0A++%22darkShadowColorChroma%22%3A+0.05%2C%0A++%22lightnessMax%22%3A+1%2C%0A++%22lightnessMin%22%3A+0%2C%0A++%22neutralChromaScale%22%3A+0.2%2C%0A++%22transparencyWeaker%22%3A+0%2C%0A++%22primaryHue%22%3A+83%2C%0A++%22primaryLightness%22%3A+72%2C%0A++%22primaryLightnessDark%22%3A+72%2C%0A++%22primaryChroma%22%3A+0.3%2C%0A++%22secondaryHue%22%3A+83%2C%0A++%22secondaryLightness%22%3A+80%2C%0A++%22secondaryLightnessDark%22%3A+80%2C%0A++%22secondaryChroma%22%3A+0.09%2C%0A++%22useSecondaryColorForFG%22%3A+false%2C%0A++%22useSecondaryColorForBG%22%3A+false%2C%0A++%22useSecondaryColorForBorders%22%3A+false%2C%0A++%22lightNeutralChromaFG%22%3A+0.03%2C%0A++%22lightNeutralChromaBG%22%3A+0.014%2C%0A++%22lightNeutralChromaBorder%22%3A+0.03%2C%0A++%22lightNeutralTextLightness%22%3A+30%2C%0A++%22lightNeutralSurfaceLightness%22%3A+100%2C%0A++%22lightNeutralBorderLightness%22%3A+87%2C%0A++%22lightTextLightnessScaleFactor%22%3A+0.2%2C%0A++%22lightSurfaceLightnessScaleFactor%22%3A+0.03%2C%0A++%22lightBorderLightnessScaleFactor%22%3A+0.1%2C%0A++%22darkNeutralChromaFG%22%3A+0.03%2C%0A++%22darkNeutralChromaBG%22%3A+0.026%2C%0A++%22darkNeutralChromaBorder%22%3A+0.05%2C%0A++%22darkNeutralTextLightness%22%3A+95%2C%0A++%22darkNeutralSurfaceLightness%22%3A+14%2C%0A++%22darkNeutralBorderLightness%22%3A+30%2C%0A++%22darkTextLightnessScaleFactor%22%3A+0.2%2C%0A++%22darkSurfaceLightnessScaleFactor%22%3A+0.075%2C%0A++%22darkBorderLightnessScaleFactor%22%3A+0.12%0A%7D";
</script>

<footer class="footer">
  <Logo size="sm" />
  <span class="info">
    built with <a {href} target="_blank" rel="noopener noreferrer">ui@nordcode</a
    >
  </span>
</footer>

<style>
  @custom-media --md-n-above (width >= 768px);

  .footer {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-near);
    align-items: center;

    @media (--md-n-above) {
      padding: var(--spacing-far);
    }
  }

  .info {
    color: var(--color-text-subtle);
  }
</style>
