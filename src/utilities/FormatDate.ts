export type FormatDateDefaultTypes = "dd-mm-yyyy";

export default function FormatDate(dateString: Date, format: string): string {
  const date = new Date(dateString);
  const map: { [key: string]: string | number } = {
    dd: ("0" + date.getDate()).slice(-2),
    mm: ("0" + (date.getMonth() + 1)).slice(-2),
    yyyy: date.getFullYear(),
    yy: ("" + date.getFullYear()).slice(-2),
  };

  return format.replace(/dd|mm|yyyy|yy/gi, (matched) => map[matched] as string);
}
