import { test, expect } from '@playwright/test';

test.describe('Formulář - návrh nové hry', () => {

  test('formulář je viditelný na stránce', async ({ page }) => {
    await page.goto('https://simimisek.github.io/kids-games/');

    // Ověř že sekce s formulářem existuje
    await expect(page.getByText('Navrhněte hru')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Chcete novou hru na míru?' })).toBeVisible();
  });

  test('odeslání formuláře zobrazí potvrzení', async ({ page }) => {
    await page.goto('https://simimisek.github.io/kids-games/');

    // Vyplň formulář
    await page.getByRole('textbox', { name: 'Vaše jméno (nepovinné)' }).fill('Test');
    await page.getByRole('textbox', { name: 'Věk dítěte (nepovinné)' }).fill('6');
    await page.getByRole('textbox', { name: 'Popište hru nebo látku,' }).fill('Testovací návrh hry');

    // Odešli formulář
    await page.getByRole('button', { name: 'Odeslat nápad ✉️' }).click();

    // Ověř potvrzovací zprávu
    await expect(page.getByText('Díky! Váš nápad byl odeslán.')).toBeVisible();
  });

});
