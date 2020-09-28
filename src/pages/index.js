import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import Layout from "../components/layout"
import Image from "../components/image"
import { GatsbySeo } from "gatsby-plugin-next-seo"

import getBlockDefinitions from "../utils/BlockQueries"
import mapBlocksToComponents from "../utils/BlockMapper"

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  {
    allWpPage(filter: { slug: { eq: "home" } }) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  {
    pageBy(uri: "home") {
      id
      slug
      ${getBlockDefinitions()}
    }
  }
`

const IndexPage = () => {
  const { loading, error, data } = useQuery(APOLLO_QUERY)
  if (loading) {
    return (
      <div className="fixed top-0 z-10 flex items-center justify-center w-screen h-screen bg-white">
        <h1>Loading...</h1>
      </div>
    )
  }
  if (error) return `${error}`

  return (
    <Layout>
      <GatsbySeo
        title="Simple Usage Example"
        description="A short description goes here."
      />
      <div className="relative w-full">
        {mapBlocksToComponents(data.pageBy)}
      </div>
    </Layout>
  )
}

export default IndexPage
