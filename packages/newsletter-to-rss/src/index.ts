import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import { PORT } from "./constants.ts";

// By default, the SMTP server listens for emails sent to any address at the host/IP and port specified.
// You can send emails to anything@localhost:5425 or anything@[your-ip]:5425
const server = new SMTPServer({
	authOptional: true,
	onData(stream, _session, callback: (err?: Error | null) => void) {
		simpleParser(stream)
			.then((parsed) => {
				console.log("Subject:", parsed.subject);
                parsed.html
				callback();
			})
			.catch((err) => {
				console.error("Error parsing email:", err);
				callback(err);
			});
	}
});

server.listen(PORT, () => {
	console.log(`SMTP server listening on port ${PORT}`);
});

export { server };
