import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import { PORT_SMTP } from "./constants.ts";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle(process.env.DB_FILE_NAME!);

// By default, the SMTP server listens for emails sent to any address at the host/IP and port specified.
// You can send emails to anything@localhost:5425 or anything@[your-ip]:5425
const server = new SMTPServer({
	authOptional: true,
	onData(stream, _session, callback: (err?: Error | null) => void) {
		simpleParser(stream)
			.then((parsed) => {
				const subject = parsed.subject;
                const date = parsed.date;
				const content = parsed.html || parsed.textAsHtml || parsed.text;
				console.log(`Subject: ${subject}; Date: ${date}; Content: ${content && content.slice(0, 100)}`);
				// @todo Add item to sqlite database
				callback();
			})
			.catch((err) => {
				console.error("Error parsing email:", err);
				callback(err);
			});
	}
});

server.listen(PORT_SMTP, () => {
	console.log(`SMTP server listening on port ${PORT_SMTP}`);
});

export { server };
