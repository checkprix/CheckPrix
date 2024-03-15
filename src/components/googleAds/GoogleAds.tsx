import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const GoogleAds = () => {

  const useSearch = useSearchParams();
  useEffect(() => {
    const scriptElement = window.document.querySelector(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3961225425063983"]'
    );
    
    const handlescriptLoad = () => {
      try {
        if ((window as any).adsbygoogle) {
           (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
        } else {
          scriptElement!.addEventListener("load", handlescriptLoad);
          console.log("waiting unitl adsense lib is loaded");
        }
      } catch (err) {
        console.log("err in adsence", err);
      }
    };

    handlescriptLoad();
  }, [useSearch]);

  return (
    <>
      <div className="overflow-hidden m-5">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="pub-3961225425063983"
          data-ad-slot="f08c47fec0942fa0"
          data-ad-format="auto"
          data-full-widdth-responsive="true"
        />
      </div>
    </>
  );
};

export default GoogleAds;
