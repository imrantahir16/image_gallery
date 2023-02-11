import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";

const upload = () => {
  const [image, setImage] = useState(null);
  const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;

  const fileChangeHandler = (e) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setImage(onLoadEvent.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageUploadHandler = async () => {
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "cloud_image");

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    console.log(JSON.stringify(data));

    if (!data.secure_url) {
      alert("Image could not uploaded");
      return;
    }
    alert("Image Uploaded");
    setImage(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-2 flex-col">
      <Head>
        <title>Image Gallery</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {image && (
          <Image src={image} alt="Uploaded image" width={500} height={250} />
        )}
        {!image && (
          <label className="w-64 flex flex-col items-center px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border border-primary cursor-pointer hover:bg-primary hover:text-primary-content">
            <AiOutlineCloudUpload className="w-6 h-6" />
            <span>Select a file</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={fileChangeHandler}
            />
          </label>
        )}
        {image && (
          <div className="flex w-full items-center justify-center mt-4 gap-4">
            <button
              className="btn btn-wide btn-md btn-primary"
              onClick={imageUploadHandler}
            >
              Upload
            </button>
            <button
              className="btn btn-wide btn-md btn-outline"
              onClick={() => setImage(null)}
            >
              Cancel
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
export default upload;
