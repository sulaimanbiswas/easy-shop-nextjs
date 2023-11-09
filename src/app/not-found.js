import notFoundImage from "@/assets/404.png";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="my-10text-center flex flex-col justify-center items-center">
      <Image
        src={notFoundImage}
        alt="not found"
        width={600}
        placeholder="blur"
        className="max-w-[600px] h-auto p-2 rounded-sm"
        sizes="100vw"
      />
      <Link href="/" className="mt-5 mb-2 inline-block">
        <button className="btn btn-primary bg-blue-500">Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
