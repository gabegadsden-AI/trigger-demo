import { schedules } from "@trigger.dev/sdk";

// ─── Data Types ───────────────────────────────────────────────────────────────

interface MacroTargets {
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

interface NutritionPlan {
  name: string;
  description: string;
  dailyCalorieTarget: number;
  macros: MacroTargets;
  sampleMeals: [string, string, string];
}

// ─── Hardcoded Nutrition Plans ────────────────────────────────────────────────

const NUTRITION_PLANS: NutritionPlan[] = [
  {
    name: "Keto",
    description:
      "Very-low-carbohydrate, high-fat diet that pushes the body into ketosis to burn fat as the primary fuel source.",
    dailyCalorieTarget: 1800,
    macros: { proteinGrams: 120, carbsGrams: 30, fatGrams: 130 },
    sampleMeals: [
      "Breakfast: 3 scrambled eggs in butter with avocado and bacon strips",
      "Lunch: Grilled salmon fillet on a bed of spinach dressed with olive oil",
      "Dinner: Ribeye steak with roasted broccoli and full-fat sour cream",
    ],
  },
  {
    name: "Mediterranean",
    description:
      "Whole-food diet rich in vegetables, legumes, whole grains, fish, and olive oil — proven to support heart health and longevity.",
    dailyCalorieTarget: 2000,
    macros: { proteinGrams: 100, carbsGrams: 250, fatGrams: 70 },
    sampleMeals: [
      "Breakfast: Greek yogurt with honey, walnuts, and fresh berries",
      "Lunch: Grilled sea bass with tabbouleh and a drizzle of extra-virgin olive oil",
      "Dinner: Lentil stew with crusty whole-grain bread and a mixed-green salad",
    ],
  },
  {
    name: "IIFYM (If It Fits Your Macros)",
    description:
      "Flexible dieting approach — no foods are off-limits as long as daily protein, carb, and fat targets are hit.",
    dailyCalorieTarget: 2200,
    macros: { proteinGrams: 165, carbsGrams: 240, fatGrams: 73 },
    sampleMeals: [
      "Breakfast: High-protein pancakes (whey protein + oats) with maple syrup",
      "Lunch: Ground turkey rice bowl with black beans, salsa, and low-fat cheese",
      "Dinner: Grilled chicken thighs with sweet potato fries and steamed green beans",
    ],
  },
  {
    name: "Carnivore",
    description:
      "Animal-product-only elimination diet — zero plant foods. Focused on red meat, organs, fish, eggs, and dairy.",
    dailyCalorieTarget: 1900,
    macros: { proteinGrams: 180, carbsGrams: 0, fatGrams: 140 },
    sampleMeals: [
      "Breakfast: 4 fried eggs in tallow with beef liver slices",
      "Lunch: 8 oz ground beef patties cooked in butter, no bun",
      "Dinner: NY strip steak with a side of pork belly and bone broth",
    ],
  },
  {
    name: "Plant-Based",
    description:
      "Whole-food, plant-only diet centered on vegetables, legumes, whole grains, nuts, and seeds — no animal products.",
    dailyCalorieTarget: 1950,
    macros: { proteinGrams: 90, carbsGrams: 290, fatGrams: 60 },
    sampleMeals: [
      "Breakfast: Overnight oats with chia seeds, almond butter, and sliced banana",
      "Lunch: Chickpea and roasted vegetable grain bowl with tahini dressing",
      "Dinner: Black bean and sweet potato tacos on corn tortillas with guacamole",
    ],
  },
];

// ─── Formatting Helpers ───────────────────────────────────────────────────────

function formatMacros(macros: MacroTargets): string {
  return `Protein: ${macros.proteinGrams}g | Carbs: ${macros.carbsGrams}g | Fat: ${macros.fatGrams}g`;
}

function logPlan(plan: NutritionPlan, index: number): void {
  const divider = "─".repeat(60);
  console.log(divider);
  console.log(`[${index + 1}] ${plan.name.toUpperCase()}`);
  console.log(divider);
  console.log(`About:    ${plan.description}`);
  console.log(`Calories: ${plan.dailyCalorieTarget} kcal/day`);
  console.log(`Macros:   ${formatMacros(plan.macros)}`);
  console.log(`Sample Meals:`);
  for (const meal of plan.sampleMeals) {
    console.log(`  • ${meal}`);
  }
}

// ─── Scheduled Task ───────────────────────────────────────────────────────────

export const dailyNutritionSummary = schedules.task({
  id: "daily-nutrition-summary",
  cron: "0 7 * * *", // 7:00 AM UTC every day

  run: async () => {
    const now = new Date().toUTCString();

    console.log("╔══════════════════════════════════════════════════════════╗");
    console.log("║           DAILY NUTRITION PLAN SUMMARY                  ║");
    console.log("╚══════════════════════════════════════════════════════════╝");
    console.log(`Run time: ${now}`);
    console.log(`Plans loaded: ${NUTRITION_PLANS.length}\n`);

    for (let i = 0; i < NUTRITION_PLANS.length; i++) {
      logPlan(NUTRITION_PLANS[i], i);
      console.log();
    }

    console.log("═".repeat(60));
    console.log("Summary complete. All nutrition plans logged successfully.");
    console.log("═".repeat(60));

    return {
      plansLogged: NUTRITION_PLANS.length,
      planNames: NUTRITION_PLANS.map((p) => p.name),
      runTime: now,
    };
  },
});
