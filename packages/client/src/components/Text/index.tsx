interface TextProp {
  content: string,
  color?: string,
  size?: string
}

export default function Text({ content, color, size}:TextProp) {
  return (
    <p className={`${size} || "text-base"} ${ color || "text-black" } font-montserrat font-semibold`}>
      {content}
    </p>
  )
}