import React from "react"
import { gql, useQuery } from "@apollo/client"
import getBlockDefinitions from "../utils/BlockQueries"
import mapBlocksToComponents from "../utils/BlockMapper"
import Header from "../components/header"

const Page = params => {
  const GET_PAGE = gql`
   query GET_PAGES($slug: String) {
      pageBy(uri: $slug) {
        id
        title
        slug
        date
        ${getBlockDefinitions()}
      }
    }
   `

  const { loading, error, data } = useQuery(GET_PAGE, {
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

  const { id, slug, title } = data.pageBy

  return (
    <div id={id} className={`${title}-page relative w-full py-16`}>
      {console.log(params.pathContext)}
      <Header slug={slug} />
      <div className="w-10/12 pb-6 mx-auto text-center">
        <h1>{title}</h1>
      </div>
      {mapBlocksToComponents(data.pageBy)}
    </div>
  )
}

export default Page
