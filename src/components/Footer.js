import React from "react";
import { useQuery, gql } from "@apollo/client";

const Footer = () => {
  const GET_FOOTER = gql`
    query MyQuery {
      siteSettings {
        siteSettings {
          copy
          logo {
            altText
            sourceUrl(size: LARGE)
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_FOOTER);

  if (loading) {
    return (
      <div className="fixed top-0 z-10 flex items-center justify-center w-screen h-screen bg-white">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <>Ooops...</>;
  }

  const { siteSettings } = data.siteSettings;

  return (
    <div className="flex flex-col items-center justify-center w-full py-24 text-white bg-black basic-sans">
      <img src={siteSettings.logo.sourceUrl} alt={siteSettings.logo.altText} />

      <p
        className="pt-10 text-center"
        dangerouslySetInnerHTML={{ __html: siteSettings.copy }}
      />
    </div>
  );
};

export default Footer;
