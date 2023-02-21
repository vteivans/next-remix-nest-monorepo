import { Button } from "ui";

export default function Web() {
  const a = new Promise((res) => {
    setTimeout(res, 1000);
  });

  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  );
}
