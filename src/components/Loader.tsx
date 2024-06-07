interface LoaderProps {
  text: string;
}

export function Loader({ text }: LoaderProps): JSX.Element {
  return (
    <div
      id="loader"
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-between items-center gap-y-4"
    >
      <span className="loader"></span>
      <p>{text}</p>
    </div>
  );
}
