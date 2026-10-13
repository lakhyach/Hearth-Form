// Original Hearth & Form mark: an arched "form" over a "hearth" line with a flame.
export default function Logo({ className = 'size-8', title = 'Hearth & Form' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 27V14a9 9 0 0 1 18 0v13" />
      <path d="M4 27h24" />
      <path d="M16 11l2.6 3.4L16 18l-2.6-3.6z" fill="currentColor" stroke="none" />
    </svg>
  )
}
