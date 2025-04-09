import { NextResponse } from "next/server";
import { Interview } from "@/models/interview";
import fs from "fs";
import path from "path";

const INTERVIEWS_FILE = path.join(process.cwd(), "data", "interviews.json");

// Ensure the data directory exists
if (!fs.existsSync(path.dirname(INTERVIEWS_FILE))) {
  fs.mkdirSync(path.dirname(INTERVIEWS_FILE), { recursive: true });
}

// Initialize the file if it doesn't exist
if (!fs.existsSync(INTERVIEWS_FILE)) {
  fs.writeFileSync(INTERVIEWS_FILE, JSON.stringify([]));
}

export async function GET() {
  try {
    const data = fs.readFileSync(INTERVIEWS_FILE, "utf-8");
    const interviews = JSON.parse(data);
    return NextResponse.json(interviews);
  } catch {
    return NextResponse.json(
      { error: "Failed to read interviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const interview: Interview = await request.json();

    // Read existing interviews
    const data = fs.readFileSync(INTERVIEWS_FILE, "utf-8");
    const interviews = JSON.parse(data);

    // Add new interview
    interviews.push(interview);

    // Save back to file
    fs.writeFileSync(INTERVIEWS_FILE, JSON.stringify(interviews, null, 2));

    return NextResponse.json(interview);
  } catch {
    return NextResponse.json(
      { error: "Failed to save interview" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Read existing interviews
    const data = fs.readFileSync(INTERVIEWS_FILE, "utf-8");
    const interviews = JSON.parse(data);

    // Filter out the interview to delete
    const updatedInterviews = interviews.filter(
      (interview: Interview) => interview.id !== id
    );

    // Save back to file
    fs.writeFileSync(
      INTERVIEWS_FILE,
      JSON.stringify(updatedInterviews, null, 2)
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete interview" },
      { status: 500 }
    );
  }
}
