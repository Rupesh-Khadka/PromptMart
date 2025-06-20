import { Button } from "@heroui/button";
import Image from "next/image";
import React from "react";

type Props = {};

const Future = (props: Props) => {
  return (
    <div className="w-full relative p-4 md:p-[unset] grid md:grid-cols-2 py-8">
      <div className="col-span-1">
        <Image
          src="https://pixner.net/aikeu/assets/images/tools-thumb.png"
          alt="Features Images"
          width={800}
          height={500}
          className="md:w-[90%] md:ml-[-50px] 2xl:ml-[-90px]"
        />
      </div>
      <div className="col-span-1 w-full flex justify-center items-center">
        <div className="2xl:w-[60%]">
          <Button className="text-[18px] p-5 font-[600] font-Inter rounded-[8px] text-white mb-[30px] h-[37px] bg-[#12211f]">
            Future
          </Button>
          <h5 className="text-4xl font-[700] font-Inter text-white mb-5 !leading-[50px]">
            Unleashing The Glorious Future Of AI generated Images
          </h5>
          <p className="text-[18px] font-[400] text-[#b1b0b6] font-Inter pb-5">
            One of the most prominent techniques in AI image generation is the
            use of Generative Adversarial Networks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Future;
