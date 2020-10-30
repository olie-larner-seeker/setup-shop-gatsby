import React from 'react'
import moment from "moment"
import { gql, useQuery } from '@apollo/client'

import Layout from "../components/layout"

import getBlockDefinitions from "../utils/BlockQueries"
import mapBlocksToComponents from "../utils/BlockMapper"

const GET_POSTS = gql`
query getPosts {
  posts {
    edges {
      node {
        id
        title(format: RENDERED)
        slug
        date
        featuredImage {
          node {
            altText
            sourceUrl(size: LARGE)
          }
        }
        excerpt(format: RENDERED)
        categories {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
  pageBy(uri: "blog") {
      ${getBlockDefinitions()}
  }
}
`;


export default () => {

    const { loading, error, data } = useQuery(GET_POSTS);
    if (loading) {
        return (
          <div className="fixed top-0 z-10 flex items-center justify-center w-screen h-screen bg-white">
            <h1>Loading...</h1>
          </div>
        );
      }
      if (error) return `Error! ${data}`;

    return (
      <Layout>
        <div>{mapBlocksToComponents(data.pageBy)}
        <div className="container max-w-screen-xl py-24 mx-auto">
          <div className="grid w-10/12 grid-cols-3 gap-6 mx-auto">
              {data.posts.edges.map((post, i) => {
                  let catagory;
                  if(post !== undefined){
                  {post.node.categories.edges.map((cat) => { 
                      catagory = cat.node.name; 
                      return null
                  })}
                  }
                  return (
                      <div key={i}>
                          <div style={{backgroundImage: `url(${post.node.featuredImage.node.sourceUrl})`, height: "319px", boxShadow: "0 6px 9px 0 rgba(201, 201, 201, 0.5)"}} className="w-full" />
                          <div className="py-8">
                          <p className="text-sm font-bold text-brandOrange">{catagory}</p>
                          <h2 className="py-3 text-2xl font-black leading-tight text-mainGray">{post.node.title}</h2>
                          <p className="text-sm text-gray-600">{moment(post.node.date).format("MMM Do, YYYY")}</p>
                          </div>
                      </div>
                  )
              })}
          </div>
          </div>
        </div>
      </Layout>
    )

}