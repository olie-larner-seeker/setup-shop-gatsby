import React, {useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import moment from "moment"
import Img from "gatsby-image"
import { gql, useQuery } from "@apollo/client"
import getBlockDefinitions from "../utils/BlockQueries"
import mapBlocksToComponents from "../utils/BlockMapper"
import Header from "../components/header"
import Layout from "../components/layout"

const Post = params => {

 

  const GET_POST = gql`
    query GET_POSTS($slug: String) {
      postBy(uri: $slug) {
        id
        title
        slug
        date
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
        categories {
          edges {
            node {
              id
              name
            }
          }
        }
        ${getBlockDefinitions()}

      }
    }
  `



  const { loading, error, data } = useQuery(GET_POST, {
    variables: { slug: params.pathContext.slug },
  })

  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(!loading){
    data.postBy.blocks.map(block => {
        if(block.__typename === 'AcfRelatedPostsBlock'){
            setRelatedPosts(block.relatedPosts.relatedPosts);
        }
      })
    }
  })

  if (loading) {
    return (
      <div className="fixed top-0 z-10 flex items-center justify-center w-screen h-screen bg-white">
        <h1>Loading...</h1>
      </div>
    )
  }
  if (error) return `${error}`

  const { id, date, title } = data.postBy



  return (
    <Layout>
    <div id={id} className={`${title}-post relative w-full py-48`}>
      <Header />
      <div className="container flex flex-row mx-auto">
        <div className="w-7/12">
        <div className="relative overflow-hidden" style={{maxHeight: "465px"}}>
        <img
            className="object-cover object-center"
            style={{ height: "100%" }}
            src={data.postBy.featuredImage.node.sourceUrl}
            alt="post hero"
        /> 
        </div>
        <h1 className="pt-12">{title}</h1>
          <p className="pb-16 text-sm text-gray-600 "><strong>{moment(date).format("MMM Do, YYYY")}</strong></p>
        {mapBlocksToComponents(data.postBy)}
        </div>
        <div className="w-5/12 pl-4 related-posts">
           {relatedPosts.map((post, i) => {
             console.log(post.slug)
             return (
               <div key={i} className="relative flex flex-row w-10/12 h-auto my-4" style={{minHeight: "100px", boxShadow: "0 6px 9px 0 rgba(201, 201, 201, 0.5)"}}>
                
                <Link className="flex flex-row " to={`/${post.slug}`}>
                <div className="bg-cover" style={{backgroundImage:`url(${post.featuredImage.node.sourceUrl})`, width: '98px'}} />
                <p className="self-center p-3">{post.title}</p>
                </Link>
              </div>
             )
           })}
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Post
