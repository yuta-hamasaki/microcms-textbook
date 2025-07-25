"use client"

import { BlogType } from "@/types"
import { blogPerPage } from "@/lib/utils"
import BlogItem from "@/components/blog/BlogItem"
import PaginationButton from "@/components/pagers/PaginationButton"

interface BlogProps {
  blogs: BlogType[]
  pageCount: number
}

// ブログ
const Blog = ({ blogs, pageCount }: BlogProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>

      {blogs.length !== 0 && (
        <PaginationButton pageCount={pageCount} displayPerPage={blogPerPage} />
      )}
    </div>
  )
}

export default Blog
