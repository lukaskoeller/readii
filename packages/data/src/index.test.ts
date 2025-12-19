import { expect, test } from "vitest";
import { suggestionsByCategory } from "./index";
import suggestionsJson from "./suggestions.json";

test("should have valid suggestions by category", () => {
    const expectedCategories = suggestionsJson.map((suggestion) => suggestion.categories).flat();
    const categories = Object.keys(suggestionsByCategory);
    for (const category of expectedCategories) {
        expect(categories).toContain(category);
    }
});