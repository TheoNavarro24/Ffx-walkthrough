export default function SphereGridTip({ tip }) {
  if (!tip) return null

  return (
    <div className="rounded-md border border-blue-800 bg-blue-950/40 px-4 py-3 text-sm">
      <span className="font-bold text-[var(--color-border)]">⬡ Sphere Grid — </span>
      <span className="text-gray-300">{tip}</span>
    </div>
  )
}
