function trimLabel(value) {
  return value.trim()
}

export default function formatLabel(value) {
  const label = trimLabel(value)

  return label || 'Untitled'
}
