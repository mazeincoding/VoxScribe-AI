import { toast } from "react-hot-toast";
import { storage, db } from "@/firebase/config";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { ref as dbRef, serverTimestamp, set } from "firebase/database";
import { Transcription } from "@/types/transcription";
import { v4 as uuidv4 } from "uuid";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB in bytes

export const validateFile = (file: File): boolean => {
  const validTypes = [
    "audio/mpeg",
    "video/mp4",
    "video/quicktime",
    "video/webm",
    "audio/mp4",
    "audio/x-m4a",
  ];
  if (!validTypes.includes(file.type)) {
    toast.error("Please upload an MP3 audio or MP4/MOV/WebM video file.");
    return false;
  }
  if (file.size > MAX_FILE_SIZE) {
    toast.error("File size should not exceed 100 MB.");
    return false;
  }
  return true;
};

export const convertToMp3 = async (file: File): Promise<File> => {
  const ffmpeg = new FFmpeg();
  try {
    await ffmpeg.load();

    const inputName = "input" + file.name.substring(file.name.lastIndexOf("."));
    await ffmpeg.writeFile(inputName, await fetchFile(file));

    await ffmpeg.exec([
      "-i",
      inputName,
      "-vn",
      "-acodec",
      "libmp3lame",
      "-b:a",
      "128k",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");
    const mp3File = new File([data], "converted.mp3", { type: "audio/mpeg" });

    return mp3File;
  } catch (error) {
    console.error("Error in convertToMp3:", error);
    throw new Error("Failed to convert video to MP3");
  } finally {
    ffmpeg.terminate();
  }
};

export const uploadFile = async (
  file: File,
  userId: string,
  setUploadProgress: (progress: number) => void
): Promise<string> => {
  let processedFile = file;
  let conversionToastId: string | undefined;

  if (file.type.startsWith("video/")) {
    conversionToastId = toast.loading("Converting video to audio...");
    try {
      processedFile = await convertToMp3(file);
      toast.success("Video converted successfully!", { id: conversionToastId });
    } catch (error) {
      toast.error("Error converting video. Please try again.", {
        id: conversionToastId,
      });
      throw error;
    }
  }

  const fileExtension = "mp3";
  const fileName = `${uuidv4()}.${fileExtension}`;
  const storagePath = `users/${userId}/${fileName}`;

  const fileStorageRef = storageRef(storage, storagePath);
  const uploadTask = uploadBytesResumable(fileStorageRef, processedFile);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        if (conversionToastId) {
          toast.error("Error uploading file. Please try again.", {
            id: conversionToastId,
          });
        }
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

export const saveTranscription = async (
  userId: string,
  audioURL: string
): Promise<string> => {
  const id = uuidv4();
  const transcriptionRef = dbRef(db, `users/${userId}/transcriptions/${id}`);
  const transcription: Omit<Transcription, "createdAt"> = {
    id,
    title: "Untitled",
    transcript: "",
    audioURL,
    userId,
  };

  await set(transcriptionRef, {
    ...transcription,
    createdAt: serverTimestamp(),
  });

  return id;
};
