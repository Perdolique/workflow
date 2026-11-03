export function handleExport(records) {
  return {
    contentType: 'application/json',
    body: JSON.stringify({ record_count: records.length })
  }
}
