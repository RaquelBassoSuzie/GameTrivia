export default async function fetchTriviaQuestions() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const result = await fetch(url);
  const data = await result.json();
  return data;
}
