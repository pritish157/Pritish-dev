import { useRef } from 'react'

export default function SpotlightPanel({ className = '', children, ...props }) {
  const frameRef = useRef(0)
  const panelRef = useRef(null)

  const updatePointer = (clientX, clientY) => {
    const node = panelRef.current
    if (!node) {
      return
    }

    const bounds = node.getBoundingClientRect()
    const x = ((clientX - bounds.left) / bounds.width) * 100
    const y = ((clientY - bounds.top) / bounds.height) * 100

    node.style.setProperty('--spotlight-x', `${x}%`)
    node.style.setProperty('--spotlight-y', `${y}%`)
  }

  const handlePointerMove = (event) => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
    }

    const { clientX, clientY } = event
    frameRef.current = window.requestAnimationFrame(() => updatePointer(clientX, clientY))
  }

  const handlePointerLeave = () => {
    const node = panelRef.current
    if (!node) {
      return
    }

    node.style.setProperty('--spotlight-x', '50%')
    node.style.setProperty('--spotlight-y', '50%')
  }

  return (
    <div
      ref={panelRef}
      className={`spotlight-shell ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </div>
  )
}
