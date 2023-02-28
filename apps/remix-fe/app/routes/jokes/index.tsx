export default function JokesIndex() {
  return (
    <div>
      <p>He&apos;s a random joke</p>
      <p>I was wondiring why the frisbee was getting bigger, then it hit me.</p>
    </div>
  );
}

export function ErrorBoundary() {
  return <div className="error-container">I did a whoopsies.</div>;
}
