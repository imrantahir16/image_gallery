// import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { v2 as cloudinary } from "cloudinary";
import Navbar from "../components/Navbar";

const Home = ({ resources }) => {
  console.log(resources);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Image Gallery</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="p-4 space-x-4 carousel carousel-center bg-primary rounded-box mt-4">
          {resources.map((resource, index) => (
            <div key={`carousel-${index}`} className="carousel-item">
              <Image
                src={resource.url}
                alt={resource.public_id}
                width={800}
                height={480}
                className="rounded-box"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const { resources } = await cloudinary.api.resources({
    type: "upload",
    prefix: "cloud image",
    max_results: 100,
  });
  return {
    props: {
      resources,
    },
    revalidate: 2,
  };
};
export default Home;
