import { GridFSBucket, MongoClient, ObjectId } from "mongodb";
import { Readable } from "stream";

let client: MongoClient;
let bucket: GridFSBucket;

export async function initGridFS() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db();
    bucket = new GridFSBucket(db, { bucketName: "audio" });
  }
}

export async function uploadAudio(
  buffer: Buffer,
  filename: string
): Promise<string> {
  await initGridFS();

  const stream = Readable.from(buffer);
  const uploadStream = bucket.openUploadStream(filename);

  return new Promise((resolve, reject) => {
    stream
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => {
        resolve(uploadStream.id.toString());
      });
  });
}

export async function getAudioStream(fileId: string): Promise<Readable> {
  await initGridFS();
  try {
    const stream = bucket.openDownloadStream(new ObjectId(fileId));
    return stream;
  } catch (error) {
    console.error("Error getting audio stream:", error);
    throw error;
  }
}

export async function deleteAudio(fileId: string): Promise<void> {
  await initGridFS();
  await bucket.delete(new ObjectId(fileId));
}
