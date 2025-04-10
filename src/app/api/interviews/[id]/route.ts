import { NextRequest, NextResponse } from "next/server";
import { deleteAudio } from "@/lib/gridfs";
import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "Interview ID is required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    if (!db) {
      throw new Error("Failed to connect to database");
    }

    const interview = await db
      .collection("interviews")
      .findOne({ _id: new ObjectId(id) });

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    if (interview.audioId) {
      await deleteAudio(interview.audioId);
    }

    await db.collection("interviews").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting interview:", error);
    return NextResponse.json(
      { error: "Failed to delete interview" },
      { status: 500 }
    );
  }
}
