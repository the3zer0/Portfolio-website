export default function Ticker() {
  const items = [
    'High Retention YouTube',
    'Viral Reels & Shorts',
    'Alex Hormozi Style',
    'Ali Abdaal Style',
    'Viral Typography',
    'Devin Jatho Style'
  ]

  const tickerItems = [...items, ...items]

  return (
    <div className="ticker-section">
      <div className="ticker-track" id="ticker">
        {tickerItems.map((item, i) => (
          <span key={i} className={item === '✦' ? 'ticker-item ticker-dot' : 'ticker-item'}>
            {item === '✦' ? '✦' : item}
          </span>
        ))}
      </div>
    </div>
  )
}
