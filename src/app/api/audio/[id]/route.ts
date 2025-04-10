import { NextResponse } from "next/server";
import { getAudioStream } from "@/lib/gridfs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Audio ID is required" },
        { status: 400 }
      );
    }

    const stream = await getAudioStream(id);

    // Convert Node.js Readable stream to Response
    const response = new Response(stream as unknown as ReadableStream, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });

    return response;
  } catch (error) {
    console.error("Error streaming audio:", error);
    return NextResponse.json(
      { error: "Failed to stream audio" },
      { status: 500 }
    );
  }
}
