export default function CloisterSection({ cloister }) {
  if (!cloister) return null

  return (
    <div className="ffx-panel p-4 flex flex-col gap-3">
      <h3 className="ffx-header text-sm">{cloister.name}</h3>

      {cloister.mapImage && (
        <img
          src={cloister.mapImage}
          alt={`${cloister.name} map`}
          className="rounded border border-[#1e3a5f] max-w-xs"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}

      {cloister.missable && cloister.destructionSphere && (
        <p className="text-xs text-red-300 border border-red-800 bg-red-900/20 rounded px-3 py-2">
          ⚠ Destruction Sphere reward: <strong>{cloister.destructionSphere}</strong> — get it before leaving.
        </p>
      )}

      <ol className="flex flex-col gap-1.5 list-decimal list-inside">
        {cloister.steps.map((step, i) => (
          <li key={i} className="text-sm text-gray-300">{step}</li>
        ))}
      </ol>
    </div>
  )
}
