import { expect, test } from "@playwright/test"

const getScrollLeft = async (scroller) => scroller.evaluate((element) => element.scrollLeft)

const loadHomePage = async (page) => {
  await page.goto("/")

  const scroller = page.locator("[data-collage-loop]")
  const previousButton = page.locator("[data-collage-prev]")
  const nextButton = page.locator("[data-collage-next]")

  await expect(scroller).toBeVisible()
  await expect(previousButton).toBeVisible()
  await expect(nextButton).toBeVisible()

  await expect
    .poll(async () => getScrollLeft(scroller), {
      message: "expected the collage loop to initialize in the center sequence"
    })
    .toBeGreaterThan(0)

  return { scroller, previousButton, nextButton }
}

test.describe("experience collage", () => {
  test("slides in both directions while hovering the arrows", async ({ page }) => {
    const { scroller, previousButton, nextButton } = await loadHomePage(page)

    const startingScrollLeft = await getScrollLeft(scroller)

    await nextButton.hover()
    await page.waitForTimeout(700)

    const afterNextHover = await getScrollLeft(scroller)
    expect(afterNextHover).toBeGreaterThan(startingScrollLeft + 40)

    await page.locator("body").hover()
    await page.waitForTimeout(400)

    const beforePreviousHover = await getScrollLeft(scroller)

    await previousButton.hover()
    await page.waitForTimeout(800)

    const afterPreviousHover = await getScrollLeft(scroller)
    expect(afterPreviousHover).toBeLessThan(beforePreviousHover - 40)
  })

  test("keeps arrow clicks working when reduced motion disables hover sliding", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })

    const { scroller, nextButton } = await loadHomePage(page)

    const startingScrollLeft = await getScrollLeft(scroller)

    await nextButton.hover()
    await page.waitForTimeout(500)

    const afterHover = await getScrollLeft(scroller)
    expect(Math.abs(afterHover - startingScrollLeft)).toBeLessThan(8)

    await nextButton.click()

    await expect
      .poll(async () => getScrollLeft(scroller), {
        message: "expected the next arrow click to move the collage even with reduced motion"
      })
      .toBeGreaterThan(startingScrollLeft + 40)
  })
})
