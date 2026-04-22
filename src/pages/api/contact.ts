import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend('re_123456789'); // Placeholder, user will need to add their API KEY

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Only send if API Key is configured
    if (resend.key && resend.key !== 're_123456789') {
        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: 'jeanxzdev@gmail.com',
            subject: `Contact Form: ${name}`,
            text: `From: ${name} (${email})\n\nMessage:\n${message}`,
        });
    } else {
        console.log("Resend API Key not configured. Logging message instead:", body);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500 });
  }
}
