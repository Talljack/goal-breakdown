import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { to, subject, text } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'Goal Breakdown <noreply@goalbreakdown.com>',
      to,
      subject,
      text,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}