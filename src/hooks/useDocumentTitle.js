import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const APP_NAME = "My App";

const titles = {
  "/": `Home - ${APP_NAME}`,
  "/about": `About Us - ${APP_NAME}`,
  "/contact": `Contact Us - ${APP_NAME}`,
};

// Function to generate title for location routes
const getLocationTitle = (path) => {
  const parts = path
    .replace(/^\/location/, "")
    .split("/")
    .filter(Boolean);

  if (parts.length === 0) return `Locations - ${APP_NAME}`;

  const [region, province, city] = parts;
  let title = "Locations";

  if (region) {
    const capitalizedRegion = region.charAt(0).toUpperCase() + region.slice(1);
    title = `${capitalizedRegion} Region`;

    if (province) {
      const capitalizedProvince =
        province.charAt(0).toUpperCase() + province.slice(1);
      title = `${capitalizedProvince}, ${title}`;

      if (city) {
        const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
        title = `${capitalizedCity}, ${title}`;
      }
    }
  }

  return `${title} - ${APP_NAME}`;
};

export const useDocumentTitle = () => {
  const location = useLocation();
  const defaultTitle = `${APP_NAME}`;

  useEffect(() => {
    const isLocationRoute = location.pathname.startsWith("/location");
    const title = isLocationRoute
      ? getLocationTitle(location.pathname)
      : titles[location.pathname] || defaultTitle;

    // Set the document title
    document.title = title;

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = defaultTitle;
    };
  }, [location]);
};
