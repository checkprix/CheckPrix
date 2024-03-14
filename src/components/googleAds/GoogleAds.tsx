import { useEffect } from "react";

const GoogleAds = () => {
  useEffect(() => {
    if ((window as any).adsbygoogle) {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="pub-3961225425063983"
        data-ad-slot="f08c47fec0942fa0"
        data-ad-format="auto"
      />
    </>
  );
};

export default GoogleAds;
