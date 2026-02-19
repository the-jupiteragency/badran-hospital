import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, phone, subject, message } = await req.json();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Cairo",
      dateStyle: "long",
      timeStyle: "short",
    });

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f8;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.12);">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#008DC3 0%,#004268 100%);padding:40px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Logo / Brand -->
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.7);">
                      Badran Hospital
                    </p>
                    <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">
                      New Contact Message
                    </h1>
                  </td>
                  <!-- Icon badge -->
                  <td align="right" valign="top">
                    <div style="display:inline-block;width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.15);text-align:center;line-height:52px;font-size:26px;">
                      ✉️
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Divider wave effect -->
              <div style="margin-top:24px;height:4px;border-radius:2px;background:rgba(255,255,255,0.25);"></div>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Greeting -->
              <p style="margin:0 0 24px;font-size:15px;color:#4a5568;line-height:1.6;">
                A visitor has submitted the contact form on <strong>badranhospital.com</strong>.
                Here are the details:
              </p>

              <!-- ── Sender name highlight ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background:linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 100%);border-left:4px solid #008DC3;border-radius:0 8px 8px 0;margin-bottom:24px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 2px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#008DC3;font-weight:600;">From</p>
                    <p style="margin:0;font-size:20px;font-weight:700;color:#004268;">${name}</p>
                  </td>
                </tr>
              </table>

              <!-- ── Info pills row ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <!-- Phone -->
                  <td width="48%" style="vertical-align:top;padding-right:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                           style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 16px;">
                          <p style="margin:0 0 4px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;font-weight:600;">
                            📞 &nbsp;Phone
                          </p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#1e293b;">${phone}</p>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- Subject -->
                  <td width="52%" style="vertical-align:top;padding-left:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                           style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 16px;">
                          <p style="margin:0 0 4px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;font-weight:600;">
                            🏷️ &nbsp;Subject
                          </p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#1e293b;">${subject || "No subject"}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ── Message block ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px 20px;">
                    <p style="margin:0 0 10px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;font-weight:600;">
                      💬 &nbsp;Message
                    </p>
                    <p style="margin:0;font-size:15px;color:#334155;line-height:1.75;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;">
                Submitted on ${submittedAt} (Cairo Time)
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                © ${new Date().getFullYear()} Badran Hospital &nbsp;·&nbsp;
                <a href="https://badranhospital.com" style="color:#008DC3;text-decoration:none;">badranhospital.com</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
    `.trim();

    const data = await resend.emails.send({
      from: "Badran Hospital <onboarding@resend.dev>", // Replace with verified domain sender
      to: ["info@badranhospital.com"],
      subject: `📩 New Contact Form Submission: ${subject || "No subject"}`,
      html: emailHtml,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
