import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display the hero section", async ({ page }) => {
    await page.goto("/");

    // Check that the main heading is visible
    await expect(page.getByRole("heading", { name: /build faster with bunplate/i })).toBeVisible();

    // Check that the description is visible
    await expect(page.getByText(/modern web application boilerplate/i)).toBeVisible();

    // Check that the Get Started button is visible
    await expect(page.getByRole("link", { name: /get started/i })).toBeVisible();

    // Check that the GitHub button is visible
    await expect(page.getByRole("link", { name: /github/i })).toBeVisible();
  });

  test("should navigate to dashboard when Get Started is clicked", async ({ page }) => {
    await page.goto("/");

    // Click the Get Started button
    await page.getByRole("link", { name: /get started/i }).click();

    // Should redirect to signin page (since dashboard requires auth)
    await expect(page).toHaveURL(/auth\/signin/);
  });

  test("should have working theme toggle", async ({ page }) => {
    await page.goto("/");

    // Find the theme toggle button
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();

    // Check initial state (should be light mode by default)
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    // Click to toggle to dark mode
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Click again to toggle back to light mode
    await themeToggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("should display features section", async ({ page }) => {
    await page.goto("/");

    // Check features section heading
    await expect(page.getByRole("heading", { name: /everything you need to ship fast/i })).toBeVisible();

    // Check individual feature cards
    await expect(page.getByText(/lightning fast/i)).toBeVisible();
    await expect(page.getByText(/security first/i)).toBeVisible();
    await expect(page.getByText(/mobile ready/i)).toBeVisible();
  });

  test("should display tech stack section", async ({ page }) => {
    await page.goto("/");

    // Check tech stack section heading
    await expect(page.getByRole("heading", { name: /modern tech stack/i })).toBeVisible();

    // Check some technology badges
    await expect(page.getByText("Next.js 14+")).toBeVisible();
    await expect(page.getByText("TypeScript")).toBeVisible();
    await expect(page.getByText("Tailwind CSS")).toBeVisible();
    await expect(page.getByText("Bun Runtime")).toBeVisible();
  });

  test("should have proper SEO meta tags", async ({ page }) => {
    await page.goto("/");

    // Check page title
    await expect(page).toHaveTitle(/BunPlate/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content", /Modern web application boilerplate/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /BunPlate/);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute("content", /Modern web application boilerplate/);
  });

  test("should be responsive", async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");
    
    const heroTitle = page.getByRole("heading", { name: /build faster with bunplate/i });
    await expect(heroTitle).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(heroTitle).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(heroTitle).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("should have working header links", async ({ page }) => {
    await page.goto("/");

    // Check that header is visible
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check brand link
    const brandLink = page.getByRole("link", { name: "BunPlate" });
    await expect(brandLink).toBeVisible();
    await expect(brandLink).toHaveAttribute("href", "/");
  });

  test("should have working footer", async ({ page }) => {
    await page.goto("/");

    // Check that footer is visible
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Check footer text
    await expect(footer.getByText(/Built with ❤️ using/)).toBeVisible();

    // Check external links
    const nextjsLink = footer.getByRole("link", { name: "Next.js" });
    await expect(nextjsLink).toHaveAttribute("href", "https://nextjs.org");
    await expect(nextjsLink).toHaveAttribute("target", "_blank");

    const vercelLink = footer.getByRole("link", { name: "Vercel" });
    await expect(vercelLink).toHaveAttribute("href", "https://vercel.com");
    await expect(vercelLink).toHaveAttribute("target", "_blank");
  });
});