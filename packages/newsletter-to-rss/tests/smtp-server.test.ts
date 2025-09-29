import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createTransport } from 'nodemailer';
import { PORT } from '../src/constants';
import { UI_DEV_TEST_MAIL } from './testMails.ts';

beforeAll(async () => {
  // Server is started in index.ts, nothing to do here
});

afterAll(async () => {
  // No need to close the server, it's managed in index.ts
});

describe('SMTP Server', () => {
  it('should receive an email and log the subject', async () => {
    const transport = createTransport({
      port: PORT,
      host: 'localhost',
      secure: false,
      tls: { rejectUnauthorized: false },
    });

    const info = await transport.sendMail({
      from: 'sender@example.com',
      to: 'receiver@localhost',
      subject: 'Test Subject',
      text: UI_DEV_TEST_MAIL,
    });

    expect(info.accepted).toContain('receiver@localhost');
  });
});
