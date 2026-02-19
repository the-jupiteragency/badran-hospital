"use client";

// Free OpenStreetMap embed — no API key required
export function LocationMap() {
  return (
    <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        style={{ border: 0 }}
        src="https://www.openstreetmap.org/export/embed.html?bbox=31.19,30.04,31.21,30.06&layer=mapnik&marker=30.0494,31.2001"
        title="Badran Hospital Location"
        allowFullScreen
      />
    </div>
  );
}
