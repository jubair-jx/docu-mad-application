import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
const Logo = () => {
  return (
    <div class="hidden lg:flex">
      <Link aria-label="Home" href="/">
        <Image src={logo} alt="Protocol" class="h-6 w-auto" />
      </Link>
    </div>
  );
};

export default Logo;
