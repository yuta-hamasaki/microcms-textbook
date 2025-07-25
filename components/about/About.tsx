"use client"

interface AboutProps {
  content: string
}

// アバウト
const About = ({ content }: AboutProps) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default About
