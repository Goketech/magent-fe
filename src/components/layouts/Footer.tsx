import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex px-5 md:px-0 md:items-center gap-10 flex-col">
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <Link className="hover:text-primary" href="/">
          {" "}
          <p>Security</p>
        </Link>
        <Link className="hover:text-primary" href="/">
          <p>Terms of Service</p>
        </Link>
        <Link className="hover:text-primary" href="/">
          <p>Privacy Policy</p>
        </Link>
        <Link className="hover:text-primary" href="/">
          <p>Cookie Policy</p>
        </Link>
        <Link className="hover:text-primary" href="/">
          <p>Cookie Settings</p>
        </Link>
      </div>
      <div className="flex gap-5 md:gap-10">
        <Link href="">
          <Image
            className="hover:scale-110 transition-transform duration-300"
            src="/facebook.svg"
            alt="Facebook"
            width={24}
            height={24}
          />
        </Link>
        <Link href="https://x.com/hellomagent">
          <Image
            className="hover:scale-110 transition-transform duration-300"
            src="/x.svg"
            alt="X"
            width={24}
            height={24}
          />
        </Link>
        <Link href="">
          <Image
            className="hover:scale-110 transition-transform duration-300"
            src="/instagram.svg"
            alt="Instagram"
            width={24}
            height={24}
          />
        </Link>
        <Link href="">
          <Image
            className="hover:scale-110 transition-transform duration-300"
            src="/linkedin.svg"
            alt="LinkedIn"
            width={24}
            height={24}
          />
        </Link>
        <Link href="">
          <Image
            className="hover:scale-110 transition-transform duration-300"
            src="/youtube.svg"
            alt="YouTube"
            width={24}
            height={24}
          />
        </Link>
        <Link href="">
          <Image
            className="hover:scale-110 transition-transform duration-300"
            src="/discord.svg"
            alt="Discord"
            width={24}
            height={24}
          />
        </Link>
      </div>
      <p className="font-bold">&copy; Magent {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
