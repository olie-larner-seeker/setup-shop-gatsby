import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const CaseStudy = data => {
  const { title, slug } = data.caseStudyBanner.caseStudy

  const imageData = useStaticQuery(graphql`
    query caseStudyQuery($parentId: IDQueryOperatorInput = {}) {
      allWpPage(
        filter: {
          parentId: $parentId
          blocks: { elemMatch: { name: { eq: "acf/case-study-banner" } } }
        }
      ) {
        nodes {
          slug
          id
          blocks {
            ... on WpAcfCaseStudyBannerBlock {
              caseStudyBanner {
                caseStudy {
                  ... on WpPost {
                    id
                    featuredImage {
                      node {
                        localFile {
                          publicURL
                          childImageSharp {
                            fluid(maxWidth: 2000) {
                              ...GatsbyImageSharpFluid
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  let caseStudyImgSrc

  const caseStudyImage = () => {
    imageData.allWpPage.nodes.map(list => {
      list.blocks.map(item => {
        if (item.__typename === "WpAcfCaseStudyBannerBlock") {
          caseStudyImgSrc =
            item.caseStudyBanner.caseStudy.featuredImage.node.localFile
              .childImageSharp.fluid
          return ""
        }
        return null
      })
    })
  }

  caseStudyImage()

  return (
    <div className="relative w-full bg-center bg-cover h-halfscreen">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25">
        <Img
          objectFit="cover"
          objectPosition="50% 50%"
          style={{ height: "100%" }}
          fluid={caseStudyImgSrc}
        />
      </div>

      <div className="relative z-10 w-11/12 max-w-screen-xl mx-auto">
        <div className="w-10/12 pt-16 mx-auto text-white">
          <h3 className="pb-1 font-normal">Case Study</h3>
          <a className="text-xl font-bold" href={`/${slug}`}>
            {title}
          </a>
        </div>
      </div>
    </div>
  )
}

export default CaseStudy
