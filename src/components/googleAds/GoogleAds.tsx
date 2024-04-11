import { useEffect } from "react";
const GoogleAds = () => {
  useEffect(() => {
    handleScriptLoad();
  }, []);

  const handleScriptLoad = () => {
    try {
      if ((window as any).adsbygoogle) {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
        console.log((window as any).adsbygoogle);
      } else {
        console.log("waiting until Adsense lib is loaded");
      }
    } catch (err) {
      console.log("Error in Adsense", err);
    }
  };

  return (
    <>
      <div className="overflow-hidden m-5">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3961225425063983"
          data-ad-slot="4608091824"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
};

export default GoogleAds;
