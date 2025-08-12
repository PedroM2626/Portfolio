import { test, expect } from '@playwright/test';

// Este teste de aceitação valida o envio do formulário na UI.
// Ele está marcado como skip por padrão para evitar falhas quando o servidor
// não estiver em execução ou browsers não instalados. Para executar:
// 1) npm run dev (em um terminal)
// 2) npm run test:e2e (em outro terminal)
// 3) Caso necessário, instale os browsers: npx playwright install

test.skip('envia o formulário de contato com sucesso', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  await page.getByPlaceholder('Nome *').fill('Tester');
  await page.getByPlaceholder('Email *').fill('tester@example.com');
  await page.getByPlaceholder('Assunto *').fill('Assunto teste');
  await page.getByPlaceholder('Mensagem *').fill('Mensagem de aceitação');

  const dialogPromise = page.waitForEvent('dialog');
  await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
  const dialog = await dialogPromise;
  expect(dialog.message()).toMatch(/sucesso/i);
  await dialog.dismiss();
});


