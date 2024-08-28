export default function DivBgColor({
  bgColor = "neutral-magnolia",
}: {
  bgColor?: string;
}) {
  return (
    <div
      className={`fixed bg-${bgColor} top-0 bottom-0 left-0 right-0 z-[-999]`}
    ></div>
  );
}
