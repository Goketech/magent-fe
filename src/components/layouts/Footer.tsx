import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col gap-[20px] md:gap-0 px-[20px] md:flex-row md:px-[80px] justify-between md:items-center mb-5 text-white">
      <p className="font-bold">&copy; Magent {new Date().getFullYear()}</p>
      <div className="flex gap-[28px] items-center">
        <Link className="hover:text-primary" href="/">
          <p>Terms of Service</p>
        </Link>
        <Link className="hover:text-primary" href="/">
          <p>Privacy Policy</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
