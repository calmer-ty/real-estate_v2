import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase/firebaseApp";

export interface IUseStorageProps {
  uploadFiles: (files: File[]) => Promise<string[]>;
  uploading: boolean;
}

export const useStorage = (): IUseStorageProps => {
  const [uploading, setUploading] = useState(false);

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    setUploading(true);

    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, "uploads/" + file.name);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      return downloadURLs;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Upload failed: ", error.message);
      }
      return [];
    } finally {
      setUploading(false);
    }
  };

  return { uploadFiles, uploading };
};
