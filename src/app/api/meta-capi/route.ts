import { NextResponse } from 'next/server';
import crypto from 'crypto';

const PIXEL_ID = "1315312920643836";
const ACCESS_TOKEN = "EAAXDM80hEXIBQ7jitd8rtigj7hR6ummZAZAup1QKnvosPYWDOz8s2PnqF2W8CFUH7YqYeHscZC8ibGXE2fsCnAR5Kb7j92jftGtcfNh6rlm2dMSXGjlvkgyJOVWEx0iNUvz1EKeV1comdh9QWJbRjHUXuDaesVbA7Hvu6yKnicbZBZAm2RClgy82jkSrJyQZDZD";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { event_name, event_source_url, fbp, fbc, external_id, event_id, custom_data } = body;

        const client_ip_address = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
        const client_user_agent = req.headers.get("user-agent") || "";
        const event_time = Math.floor(Date.now() / 1000);

        const data = [
            {
                event_name,
                event_time,
                action_source: "website",
                event_source_url,
                event_id,
                user_data: {
                    client_ip_address: client_ip_address.split(",")[0].trim(),
                    client_user_agent,
                    external_id: external_id ? [crypto.createHash('sha256').update(external_id).digest('hex')] : undefined,
                    fbp: fbp || undefined,
                    fbc: fbc || undefined,
                },
                custom_data: custom_data || undefined
            }
        ];

        const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data,
                access_token: ACCESS_TOKEN
            })
        });

        const fbResult = await response.json();
        return NextResponse.json({ success: true, fbResult, event_id });
    } catch (error) {
        console.error("Meta CAPI Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
