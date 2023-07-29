export default function getFormattedDate(): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    new Date()
  );
}
