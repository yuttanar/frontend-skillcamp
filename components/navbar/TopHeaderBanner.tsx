import React from "react";

type Props = {};

export default function TopHeaderBanner({}: Props) {
  const bannerTexts = [
    "Get 10% Off - Use Coupon Code HAPPY123",
    "Free Shipping Over $50",
  ];
  const [textId, setTextId] = React.useState(0);
  React.useEffect(() => {
    const timerID = setInterval(() => {
      setTextId((oldId) => oldId + 1);
    }, 3000);

    return () => {
      clearInterval(timerID);
    };
  }, []);
  return (
    <div className="w-screen bg-black text-center text-white py-4" data-testid="navbar-top-header">
      {bannerTexts[textId % bannerTexts.length]}
    </div>
  );
}
