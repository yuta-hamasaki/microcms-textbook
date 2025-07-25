import { Suspense } from "react"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import Ranking from "@/components/ranking/Ranking"
import Loading from "@/app/loading"

export const revalidate = 0

// ランキングページ
const RankingPage = async () => {
  const rankingBlogs = await microcms.getList<BlogType>({
    endpoint: "blog",
    queries: {
      filters: "ranking[exists]",
      orders: "ranking",
    },
  })

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <Ranking blogs={rankingBlogs.contents} />
      </LayoutWithSidebar>
    </Suspense>
  )
}

export default RankingPage
