import { User as UserIcon } from "lucide-react";
import Image from "next/image";

export const User = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lowlight text-primary dark:bg-primary dark:text-white">
      <UserIcon size={24} />
    </div>
  );
};

export const Robot = () => {
  return (
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-lowlight text-primary dark:bg-primary dark:text-white">
      <Image
        src="/ayurvedalogo.png"
        alt="Ayurvedagpt"
        width={351}
        height={351}
        className="w-full h-auto aspect-square"
      />
    </div>
  );
};
