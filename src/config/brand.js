export const brandAssets = {
  lockup: "/images/01_Masterbrand_Logo_Namelock.png",
  symbol: "/images/02_MagicLens_Logo_Final_Transparent_V2.png"
};

const experienceThemes = {
  santa: {
    key: "santa",
    icon: "/images/Santa.png",
    alt: "Santa Visit symbol"
  },
  "easter-bunny": {
    key: "bunny",
    icon: "/images/Bunny.png",
    alt: "Easter Bunny symbol"
  },
  "tooth-fairy": {
    key: "fairy",
    icon: "/images/Fairy.png",
    alt: "Tooth Fairy symbol"
  },
  "toy-animator": {
    key: "toy",
    icon: "/images/Toy.png",
    alt: "Toys Alive symbol"
  }
};

export function getExperienceTheme(slug) {
  return (
    experienceThemes[slug] ?? {
      key: "master",
      icon: brandAssets.symbol,
      alt: "MagicLens symbol"
    }
  );
}
