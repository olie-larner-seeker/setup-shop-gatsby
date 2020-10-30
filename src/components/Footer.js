import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "gatsby"

const Footer = () => {
  const GET_FOOTER = gql`
    query FooterQuery {
      menuItems {
        edges {
          node {
            connectedNode {
              node {
                ... on Page {
                  id
                  slug
                  title(format: RENDERED)
                }
                ... on Post {
                  title(format: RENDERED)
                  slug
                }
              }
            }
            label
          }
        }
      }
      siteSettings {
        siteSettings {
          copy
          logo {
            altText
            sourceUrl(size: LARGE)
          }
          socialMediaLink {
            smIcon {
              sourceUrl(size: LARGE)
            }
            smLink
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
    <div className="container max-w-screen-xl mx-auto text-mainGray basic-sans">
      <div className="flex flex-row w-10/12 pt-12 pb-24 mx-auto bg-white border-t-2 border-gray-300 justify-evenly ">
      <div className="flex flex-col items-start w-1/2">
      <ul className="flex flex-col items-start w-11/12 max-w-screen-xl text-mainGray">
      {data.menuItems.edges.map((item, key) => {
            let url
            if (item.node.connectedNode.node.__typename === "Post") {
              url = `/${item.node.connectedNode.node.slug}`
            }
            if (item.node.connectedNode.node.__typename === "Page") {
              url = `/${item.node.connectedNode.node.slug}`
            }
            if (item.node.connectedNode.node.slug === "home") {
              return null
            }
            return (
              <li className="pb-2 text-base uppercase" key={key}>
                <Link className="text-sm whitespace-no-wrap" to={url}>{item.node.label}</Link>
              </li>
            )
      })}
      </ul>
      </div>
      <div className="flex flex-col items-end w-1/2">
        <div className="flex flex-row">
          {siteSettings.socialMediaLink.map((item, i) => {
            return(
              <img key={i} className="mx-1" src={item.smIcon.sourceUrl} alt="social media" />
            )
          })}
        </div>
      <p
        className="pt-10 text-right uppercase"
        dangerouslySetInnerHTML={{ __html: siteSettings.copy }}
      />
      </div>
    </div>
    </div>
  );
};

export default Footer;
