import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { name, email, subject, message } = await request.json();

	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'manickammanick39447@gmail.com',
				pass: 'shxl bdxz ypxs cebn'
			}
		});

		await transporter.sendMail({
			from: `"Portfolio Contact" <manickammanick39447@gmail.com>`,
			to: 'manickammanick39447@gmail.com',
			replyTo: email,
			subject: `Portfolio Contact: ${subject}`,
			text: `
Name: ${name}
Email: ${email}

Message:
${message}
	`
		});

		return new Response(JSON.stringify({ success: true }));
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ success: false }), { status: 500 });
	}
};
