import { NextRequest, NextResponse } from 'next/server';

/**
 * Contact form submission endpoint.
 *
 * Right now this logs the submission server-side and returns 200 so the UI
 * can show a success state. To actually email yourself, either:
 *
 *  1) Add RESEND_API_KEY to your env and uncomment the Resend block below, or
 *  2) Wire up Nodemailer / SendGrid / Mailgun here — the payload shape is
 *     already validated.
 *
 * The client also provides a `mailto:` fallback so the form is always useful
 * even when no email provider is configured.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, projectType, description } = body as {
      fullName?: string;
      email?: string;
      projectType?: string;
      description?: string;
    };

    if (!fullName || !email || !projectType || !description) {
      return NextResponse.json(
        { ok: false, message: 'Missing required fields.' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    // Log to server console — replace with your email provider when ready.
    console.log('[contact] new enquiry', {
      fullName,
      email,
      projectType,
      descriptionPreview: description.slice(0, 200),
      receivedAt: new Date().toISOString(),
    });

    // Optional Resend integration — uncomment after installing `resend` and
    // setting RESEND_API_KEY + CONTACT_TO_EMAIL.
    //
    // const { Resend } = await import('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Portfolio <noreply@tayoadepetu.com>',
    //   to: process.env.CONTACT_TO_EMAIL!,
    //   replyTo: email,
    //   subject: `New enquiry — ${projectType}`,
    //   text: `From: ${fullName} <${email}>\nType: ${projectType}\n\n${description}`,
    // });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] error', err);
    return NextResponse.json(
      { ok: false, message: 'Unexpected error. Please try again or email me directly.' },
      { status: 500 },
    );
  }
}
