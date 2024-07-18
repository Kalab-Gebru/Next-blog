import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState, Dispatch, SetStateAction } from "react";
import { storage } from "../firebase.config";
import { type } from "os";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type props = {
  setURL: Dispatch<SetStateAction<string>>;
};
const UploadImageToStorage = ({ setURL }: props) => {
  const [imageFile, setImageFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      console.error("File size to large");
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      setIsUploading(true);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error.message);
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setURL(url);
          });
          setIsUploading(false);
          setImageFile(undefined);
        }
      );
    } else {
      console.error("File not found");
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);

  return (
    <div className="">
      <div className="col-lg-8 offset-lg-2">
        <Input
          type="file"
          name="file-input"
          accept="image/*"
          id="file-input"
          onChange={(files) => handleSelectedFile(files.target.files)}
          className="w-full"
        />

        <div className="mt-5">
          {imageFile && (
            <div className="p-4 bg-white rounded-md shadow dark:bg-zinc-500">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4 md:flex-row">
                  <span>{imageFile.name}</span>
                  <span>{`Size: ${imageFile.size}`}</span>
                </div>

                <Button
                  variant={"ghost"}
                  key="btnRemoveFile"
                  onClick={handleRemoveFile}
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>

              <div className="flex flex-col items-end gap-4 mt-3">
                <Button
                  onClick={handleUploadFile}
                  disabled={isUploading ? true : false}
                  variant={"outline"}
                >
                  {isUploading ? `Uploading` : `Upload`}
                </Button>

                <progress
                  className="w-full rounded progress progress-success"
                  value={progressUpload}
                  max="100"
                ></progress>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImageToStorage;
