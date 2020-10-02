import React from "react"
import { gql, useQuery } from "@apollo/client"
import getBlockDefinitions from "../utils/BlockQueries"
import mapBlocksToComponents from "../utils/BlockMapper"
import Header from "../components/header"

const Post = params => {
  const GET_POST = gql`
    query GET_POSTS($slug: String) {
      postBy(uri: $slug) {
        id
        title
        slug
        date
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

  if (loading) {
    return (
      <div className="fixed top-0 z-10 flex items-center justify-center w-screen h-screen bg-white">
        <h1>Loading...</h1>
      </div>
    )
  }
  if (error) return `${error}`

  const { id, slug, title } = data.postBy

  return (
    <div id={id} className={`${title}-post relative w-full py-16`}>
      <Header />
      <h1>{title}</h1>
      {mapBlocksToComponents(data.postBy)}
    </div>
  )
}

export default Post
