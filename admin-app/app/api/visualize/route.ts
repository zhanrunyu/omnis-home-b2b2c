import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer"; // ✅ add this line

// small helper
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  try {
    const { room_image_url, placements } = await req.json();

    // simulate ~1s processing
    await sleep(800);

    // TEMP: fixed stock image while the CTO builds the real endpoint
    const composite_url =
      "https://res.cloudinary.com/demo/image/upload/w_1200,h_800,c_fill/sample.jpg";

    // optional: write to visual_jobs so you can see rows appearing
    try {
      const supabase = createClient(); // ✅ now this works
      await supabase.from("visual_jobs").insert([
        {
          room_image_url,
          placements: Array.isArray(placements) ? placements : [],
          composite_url,
          status: "done",
        },
      ]);
    } catch {
      // non-blocking insert errors ignored
    }

    return NextResponse.json({ composite_url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Bad Request" },
      { status: 400 }
    );
  }
}
