import { useState } from 'react'
import { assetUrl } from '../utils/assetUrl'

export default function GuideImages({ images = [] }) {
  const [lightbox, setLightbox] = useState(null)

  if (images.length === 0) return null

  return (
    <>
      <div className="flex flex-col gap-2 flex-shrink-0">
        {images.map((filename) => (
          <button
            key={filename}
            onClick={() => setLightbox(filename)}
            className="flex-shrink-0 rounded border border-[var(--color-border)] overflow-hidden opacity-80 hover:opacity-100 transition-opacity"
            aria-label={`View guide screenshot ${filename}`}
          >
            <img
              src={assetUrl(`img/guide/${filename}`)}
              alt=""
              loading="lazy"
              className="h-24 w-auto object-cover"
              onError={(e) => { e.target.parentElement.style.display = 'none' }}
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={assetUrl(`img/guide/${lightbox}`)}
            alt=""
            className="max-w-full max-h-full rounded shadow-lg"
          />
        </div>
      )}
    </>
  )
}
