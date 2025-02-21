export const formatCurrency = (
  amount: number,
  locale = "en-NG",
  currency = "NGN"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    // maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    // notation: "compact",
  }).format(amount);
};

export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}