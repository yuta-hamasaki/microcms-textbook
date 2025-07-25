import { Suspense } from "react"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import { blogPerPage } from "@/lib/utils"
import Category from "@/components/category/Category"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import Loading from "@/app/loading"

export const revalidate = 0

interface CategoryPageProps {
  params: {
    categoryId: string
  }
  searchParams: {
    [key: string]: string | undefined
  }
}

// カテゴリページ
const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { categoryId } = params
  const { page, perPage } = searchParams

  const limit = typeof perPage === "string" ? parseInt(perPage) : blogPerPage
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const categoryBlogs = await microcms.getList<BlogType>({
    endpoint: "blog",
    queries: {
      limit: limit,
      offset: offset,
      filters: `category[equals]${categoryId}`,
      orders: "-publishedAt",
    },
  })

  const pageCount = Math.ceil(categoryBlogs.totalCount / limit)

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <Category blogs={categoryBlogs.contents} pageCount={pageCount} />
      </LayoutWithSidebar>
    </Suspense>
  )
}

export default CategoryPage
