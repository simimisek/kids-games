import { test, expect } from '@playwright/test';

test.describe('Úvodní stránka - dostupnost her', () => {

  test('sekce Matematika obsahuje všechny hry', async ({ page }) => {
    await page.goto('https://simimisek.github.io/kids-games/');

    // Ověř že sekce Matematika existuje
    await expect(page.getByText('Matematika')).toBeVisible();

    // Hledáme hry uvnitř sekce Matematika - aby nedošlo k záměně s jinými sekcemi
    const matematika = page.locator('section', { hasText: 'Matematika' });

    // Ověř všechny hry v sekci Matematika
    await expect(matematika.getByRole('link', { name: /Sčítání a odčítání/ })).toBeVisible();
    await expect(matematika.getByRole('link', { name: /Vyber správný výsledek/ })).toBeVisible();
    await expect(matematika.getByRole('link', { name: /Pyramida čísel/ })).toBeVisible();
    await expect(matematika.getByRole('link', { name: /Vymysli příklad/ })).toBeVisible();
    await expect(matematika.getByRole('link', { name: /Had čísel/ })).toBeVisible();
    await expect(matematika.getByRole('link', { name: /Závodní auto/ })).toBeVisible();
    await expect(matematika.getByRole('link', { name: /Kočka a myši/ })).toBeVisible();
  });

  test('sekce Čeština obsahuje všechny hry', async ({ page }) => {
    await page.goto('https://simimisek.github.io/kids-games/');

    // Ověř že sekce Čeština existuje
    await expect(page.getByText('Čeština')).toBeVisible();

    // Ověř všechny hry v sekci Čeština
    await expect(page.getByRole('link', { name: /Slabiková hra/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Osmisměrka/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Doplň písmeno/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Skládej slova/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Páry písmen/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Psací páry/ })).toBeVisible();
  });

});
