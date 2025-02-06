import AOS from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css';

function AosInit({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
      once: true,
    });
  }, []);
  return <div>{children}</div>;
}

export default AosInit;
