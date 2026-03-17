import { test, expect } from '@playwright/test';

test.describe('Kids Games - Závodní auto', () => {

  test('hra závodní auto se spustí a lze se vrátit domů', async ({ page }) => {

    // 1. Otevři stránku
    await page.goto('https://simimisek.github.io/kids-games/');

    // 2. Ověř že sekce "Nově přidáno" je viditelná
    await expect(page.getByText('Nově přidáno')).toBeVisible();

    // 3. Klikni na hru Závodní auto v sekci Nově přidáno
    // Hledáme link UVNITŘ sekce "Nově přidáno" - hra je totiž na stránce dvakrát
    await page.locator('section', { hasText: 'Nově přidáno' })
      .getByRole('link', { name: /Závodní auto/ })
      .click();

    // 4. Ověř že se zobrazí detail hry s tlačítky Hrát a Zpět
    await expect(page.getByRole('button', { name: '🚦 Start!' })).toBeVisible();
    await expect(page.getByRole('button', { name: '🏠 Zpět na výběr' })).toBeVisible();

    // 5. Spusť hru
    await page.getByRole('button', { name: '🚦 Start!' }).click();

    // 6. Ověř že hra běží (zobrazí se první kolo)
    await expect(page.getByText(/Kolo 1/)).toBeVisible();

    // 7. Odejdi ze hry zpět domů
    await page.getByRole('link', { name: '🏠 Domů' }).click();

    // 8. Ověř že jsme zpět na hlavní stránce (index.html nebo /)
    await expect(page).toHaveURL(/simimisek\.github\.io\/kids-games/);
  });

});
