import React, {useEffect, useState} from 'react'
import { useStaticQuery, graphql } from "gatsby"
import classnames from 'classnames'
import Img from "gatsby-image"



const GetToKnow = params => {
    const { getToKnow } = params;
    const [imageArray, setImageArray] = useState([]);

    const imageData = useStaticQuery(graphql`
        query FeatImage($parentId: IDQueryOperatorInput = {}) {
            allWpPage(filter: {parentId: $parentId, blocks: {elemMatch: {name: {eq: "acf/get-to-know"}}}}) {
            edges {
                node {
                id
                blocks {
                    ... on WpAcfGetToKnowBlock {
                    getToKnow {
                        gtkFeature {
                        gtkImage {
                            localFile {
                            childImageSharp {
                                fluid(maxWidth: 250, quality: 100) {
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
    `);
    
    useEffect(() => {
        imageData.allWpPage.edges.map(item => {
          item.node.blocks.map(block => {
            if (block.__typename === "WpAcfGetToKnowBlock") {
                setImageArray(block.getToKnow.gtkFeature);
            }
          })
        })
      })

 
return (
    <div className="container mx-auto">
       {imageArray.length !== 0 && <div className="w-10/12 mx-auto">
          {getToKnow.gtkFeature.map((feat, i) => {
              console.log(imageArray);
              return(
                  <div key={i} className={classnames("flex my-16 items-center w-full align-middle", {"flex-row" : i%2 === 0, "flex-row-reverse" : i%2 !== 0})}>
                        <div className="w-5/12 bg-white ">
                            <div className={`p-12 bg-${feat.gtkBackgroundColour}`}>
                                <h3 className="pb-5">{feat.gtkHeading}</h3>
                                <div className="text-base" dangerouslySetInnerHTML={{__html: feat.gtkCopy}}/>
                            </div>
                        </div>
                        
                        <div className="w-7/12">
                            <Img
                                objectFit="cover"
                                objectPosition="50% 50%"
                                style={{ height: "100%" }}
                                fluid={imageArray[i].gtkImage.localFile.childImageSharp.fluid}
                            /> 
                        </div>
                       
                  </div>
              )
          })}  
        </div>}
        </div>
    )

}

export default GetToKnow;