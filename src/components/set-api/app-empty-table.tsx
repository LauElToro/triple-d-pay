import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AppEmptyTable({
  columns,
  emptyMessage,
}: {
  columns: string[];
  emptyMessage: string;
}) {
  return (
    <div className="border border-line rounded-md bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col} className="font-mono text-[10px] uppercase text-slate">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length} className="h-32 text-center text-sm text-slate">
              {emptyMessage}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
