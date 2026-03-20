import * as React from 'react'

type MapModalProps = {
  open: boolean
  onClose: () => void
  lat?: number
  lng?: number
  label?: string
  zoom?: number
}

export default function MapModal({
  open,
  onClose,
  lat = 57.70887,
  lng = 11.97456,
  label = 'Location',
  zoom = 14,
}: MapModalProps) {
  if (!open) return null

  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded bg-background shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-semibold">{label}</h3>
          <button
            aria-label="Close map"
            onClick={onClose}
            className="ml-2 rounded p-1 hover:bg-muted"
          >
            ×
          </button>
        </div>
        <div className="h-80">
          <iframe
            title={`map-${lat}-${lng}`}
            src={src}
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
        <div className="flex justify-end px-4 py-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}
