import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/* ══════════════════════════════════════════════════════════
   RATE LIMITER
   ─ 3 requests per IP per 10 minutes
   ─ Falls back gracefully if Upstash env vars are missing
   ══════════════════════════════════════════════════════════ */
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url:   process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(3, '10 m'),
    analytics: false,
    prefix: 'portfolio:contact',
  });
}

/* ══════════════════════════════════════════════════════════
   TURNSTILE VERIFICATION HELPER
   ══════════════════════════════════════════════════════════ */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If secret not configured, skip verification (dev mode)
    console.warn('TURNSTILE_SECRET_KEY not set — skipping verification');
    return true;
  }

  const res = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: ip,
      }),
    }
  );

  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

/* ══════════════════════════════════════════════════════════
   POST /api/send
   ══════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  /* ── 1. Get real IP for rate limiting ── */
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1';

  /* ── 2. Rate limit check ── */
  if (ratelimit) {
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);
    if (!success) {
      const retryAfterSecs = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a few minutes.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit':     String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'Retry-After':           String(retryAfterSecs),
          },
        }
      );
    }
  }

  /* ── 3. Parse & validate body ── */
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const {
    name,
    email,
    message,
    honeypot,    // hidden field — must be empty
    cfTurnstileResponse,  // Cloudflare Turnstile token
  } = body as {
    name?: string;
    email?: string;
    message?: string;
    honeypot?: string;
    cfTurnstileResponse?: string;
  };

  /* ── 4. Honeypot check — bots fill this, humans don't ── */
  if (honeypot && honeypot.trim() !== '') {
    // Silently accept but do nothing (don't tip off the bot)
    return NextResponse.json({ success: true }, { status: 200 });
  }

  /* ── 5. Field validation ── */
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { success: false, error: 'All fields are required.' },
      { status: 400 }
    );
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { success: false, error: 'Invalid email address.' },
      { status: 400 }
    );
  }

  // Field length limits
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { success: false, error: 'Input exceeds maximum allowed length.' },
      { status: 400 }
    );
  }

  /* ── 6. Turnstile verification ── */
  if (!cfTurnstileResponse) {
    return NextResponse.json(
      { success: false, error: 'Human verification token missing.' },
      { status: 400 }
    );
  }

  const isTurnstileValid = await verifyTurnstile(cfTurnstileResponse, ip);
  if (!isTurnstileValid) {
    return NextResponse.json(
      { success: false, error: 'Human verification failed. Please try again.' },
      { status: 403 }
    );
  }

  /* ── 7. Send email via Resend ── */
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail   = process.env.RESEND_TO_EMAIL;

  if (!resendKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or RESEND_TO_EMAIL env vars');
    return NextResponse.json(
      { success: false, error: 'Server email configuration is missing.' },
      { status: 500 }
    );
  }

  const resend = new Resend(resendKey);

  const { error } = await resend.emails.send({
    from:     'Portfolio Contact <onboarding@resend.dev>',
    to:       [toEmail],
    replyTo:  email,
    subject:  `[Portfolio] New message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <div style="border-left:4px solid #f97316;padding-left:16px;margin-bottom:24px;">
          <h2 style="margin:0;color:#f97316;font-size:20px;">New Portfolio Contact</h2>
          <p style="margin:4px 0 0;color:#666;font-size:13px;">Sent from your portfolio contact form</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr>
            <td style="padding:8px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;width:80px;font-size:13px;">Name</td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;font-size:13px;">Email</td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:14px;">
              <a href="mailto:${email}" style="color:#f97316;">${email}</a>
            </td>
          </tr>
        </table>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;">
          <p style="margin:0 0 8px;font-weight:600;font-size:13px;color:#374151;">Message:</p>
          <p style="margin:0;white-space:pre-wrap;font-size:14px;color:#374151;line-height:1.6;">${message}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
