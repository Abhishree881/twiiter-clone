import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
  mode: number;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label, mode }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    document.title = `${label} / Twitter`;
  }, []);

  console.log(mode);

  return (
    <div className="home">
      <div className={`home-header ${mode ? 'home-header-light' : 'home-header-dark'}`}>
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            style={{ marginLeft: "2vw" }}
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
              arrow-back
          "/>
        )}
        <div className="home-head">
          {label}
        </div>
        <div className="home-icon">
          {mode ? <img className='home-logo' src="https://clipart.info/images/ccovers/1534043161Twitter-Bird-Png.png" /> : <img className='home-logo' src="https://i.ytimg.com/vi/bZqPmiikY-s/maxresdefault.jpg" />}
        </div>
      </div>
    </div>
  );
}

export default Header;
