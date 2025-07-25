import { Suspense } from "react"
import { microcms } from "@/lib/microcms"
import { AboutType } from "@/types"
import About from "@/components/about/About"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import hljs from "highlight.js"
import Loading from "@/app/loading"
import * as cheerio from "cheerio"
import "highlight.js/styles/github-dark.css"

export const revalidate = 0

// アバウトページ
const AboutPage = async () => {
  const about = await microcms.getList<AboutType>({
    endpoint: "about",
    queries: {
      orders: "publishedAt",
      limit: 1,
    },
  })

  let aboutContent = ""

  // 取得したアバウトのコンテンツをパース
  if (about.contents.length == 1) {
    const $ = cheerio.load(about.contents[0].content)

    $("pre").each((_, element) => {
      const parent = $(element).parent()
      const filename = parent.attr("data-filename")
      parent.addClass("my-5")

      $(element)
        .find("code")
        .each((_, codeElement) => {
          const codeText = $(codeElement).text()

          const className = $(codeElement).attr("class") || ""
          const languageMatch = className.match(/language-(\w+)/)
          const language = languageMatch ? languageMatch[1] : "plaintext"

          try {
            const result = hljs.highlight(codeText, { language })
            $(codeElement).html(result.value)
            $(codeElement).addClass("hljs")
          } catch (highlightError) {
            console.error("Highlight.js error:", highlightError)
            $(codeElement).text(codeText)
          }
        })

      if (filename) {
        $(element).before(
          `<div class="bg-[#0D1117] text-white py-1 px-3 text-sm inline-block">${filename}</div>`
        )
      }
    })
    $("code").each((_, element) => {
      $(element).addClass("bg-gray-100 py-1 px-2 text-sm")
    })
    $("p").each((_, element) => {
      $(element).addClass("my-5")
    })
    $("h1").each((_, element) => {
      $(element).addClass("text-3xl font-bold my-7 border-b pb-2")
    })
    $("h2").each((_, element) => {
      $(element).addClass("text-2xl font-bold my-7")
    })
    $("h3").each((_, element) => {
      $(element).addClass("text-xl font-bold my-6")
    })
    $("h4").each((_, element) => {
      $(element).addClass("text-lg font-bold my-5")
    })
    $("h5").each((_, element) => {
      $(element).addClass("text-md font-bold my-5")
    })
    $("ul").each((_, element) => {
      $(element).addClass("list-disc ml-5 my-5")
    })
    $("ol").each((_, element) => {
      $(element).addClass("list-decimal ml-5 my-5")
    })
    $("blockquote").each((_, element) => {
      $(element).addClass("border-l-4 pl-4 italic my-5")
    })
    $("table").each((_, element) => {
      $(element).addClass("table-auto border-collapse border my-5")
    })
    $("th").each((_, element) => {
      $(element).addClass("border px-4 py-1 bg-gray-50")
    })
    $("th p").each((_, element) => {
      $(element).removeClass("my-5")
      $(element).addClass("my-0")
    })
    $("td").each((_, element) => {
      $(element).addClass("border px-4 py-1")
    })
    $("td p").each((_, element) => {
      $(element).removeClass("my-5")
      $(element).addClass("my-0")
    })
    $("a").each((_, element) => {
      $(element).addClass("text-blue-500 underline")
    })
    $("img").each((_, element) => {
      $(element).addClass("my-5")
    })
    $("hr").each((_, element) => {
      $(element).addClass("my-5")
    })

    // パース後のHTMLを更新
    aboutContent = $.html()
  }

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <About content={aboutContent} />
      </LayoutWithSidebar>
    </Suspense>
  )
}

export default AboutPage
