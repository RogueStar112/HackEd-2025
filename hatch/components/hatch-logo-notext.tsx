import Link from "next/link";
import Image from "next/image";

export function HatchLogoNoText() {

  return (
    <Link href={"/"}>
      <Image className="w-[64px] h-[64px] "src={'/img/hatch_transparent_notext.png'} alt="Logo" width={256} height={256} />
    </Link>
  )


}