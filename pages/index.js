import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import SignatureCanvas from 'react-signature-canvas'
import { useEffect, useRef, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const sigCanvas = useRef(null);
  const [url, setUrl] = useState(null);

  const onClear = () => {
    if (sigCanvas.current == null) {
      console.log('sigCanvas is null');
    }
    sigCanvas.current.clear();
  };
  const onSave = () => {
    setUrl(sigCanvas.current.toDataURL('image/png'));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SignatureCanvas ref={sigCanvas} penColor='black'
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas border-1 bg-white' }} />
      <div className="flex flex-row justify-center items-center">
        {/* reset button */}
        <button className="m-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClear}>
          Clear
        </button>
        {/* save button */}
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onSave}>
          Save
        </button>
      </div>
      <div className="h-8" />
      <div style={{ width: '500px', height: '200px', position: 'relative' }} className="border-1 bg-white">
        <Image
          src={url}       // your image path
          alt="Example"
          fill                     // this makes the image fill the container
          style={{ objectFit: 'contain' }} // or 'contain' if you want to keep aspect ratio
          sizes="(max-width: 500px) 100vw, 200px"
        />
      </div>
      {/* download button */}
      <div className="h-8" />
      <a href={url} download="signature.png" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Download
      </a>

      {/* <Image src={url} alt="signature" width={500} height={200} className="border-1 bg-white" /> */}
    </div>
  );
}

