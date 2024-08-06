export function exportToCSV(url: string, header: string, fileName: string) {
  const encodedUri = encodeURI(url);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', fileName + '.csv');
  document.body.appendChild(link);
  link.click();
}
