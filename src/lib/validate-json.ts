export function validateJSON(jsonData: string) {
  try {
    const res = JSON.parse(jsonData);
    return res;
  } catch (err) {
    console.log('Error while parsing the JSON', err);
    return null;
  }
}