import { Badge } from "@weza/ui";

export function StockBadge({
  stock,
  threshold,
}: {
  stock: number;
  threshold?: number;
}) {
  if (stock <= 0) return <Badge tone="danger">Rupture</Badge>;
  if (threshold !== undefined && stock <= threshold) {
    return <Badge tone="warning">Stock bas · {stock}</Badge>;
  }
  return <Badge tone="success">{stock} en stock</Badge>;
}
