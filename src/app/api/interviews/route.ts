import { NextResponse } from "next/server";
import { uploadAudio } from "@/lib/gridfs";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      throw new Error("Failed to connect to database");
    }

    const interviews = await db
      .collection("interviews")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectDB();
    if (!db) {
      throw new Error("Failed to connect to database");
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer());

    // Upload to GridFS
    const audioId = await uploadAudio(buffer, audioFile.name);
    console.log("Uploaded audio with ID:", audioId);

    // Create interview record
    const interview = await db.collection("interviews").insertOne({
      audioId,
      filename: audioFile.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Created interview:", interview);

    return NextResponse.json(interview);
  } catch (error) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { error: "Failed to create interview" },
      { status: 500 }
    );
  }
}
