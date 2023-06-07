
interface Props {
  content?: string
  pending?: boolean
}

export default function BadgeComponent ({ content, pending = false }: Props) {
  return (
    <div className="flex justify-end">
        <span className={`text-center w-6 h-6 ${pending ? 'bg-red-500' : 'bg-green-400'}  
                        text-white text-xs px-2 py-1 rounded-full`}>
            { content }
        </span>
    </div>
  )
}
