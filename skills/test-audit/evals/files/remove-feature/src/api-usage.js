export function apiUsageTotal(rows, { environment, repository = null, feature = null }) {
  return rows
    .filter((row) => row.environment === environment)
    .filter((row) => repository === null || row.repository === repository)
    .filter((row) => feature === null || row.feature === feature)
    .reduce((total, row) => total + row.calls, 0)
}
