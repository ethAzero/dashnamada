import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Link1Icon } from "@radix-ui/react-icons";

export type Proposal = {
  id: string;
  type: string;
  author: string;
  content: any;
  voting_start_epoch: number;
  voting_end_epoch: number;
  grace_epoch: number;
};

interface ProposalsTableProps {
  elements: Proposal[];
}

function formatAbstract(content: any): string {
  if (content.title !== undefined) {
    return content.title;
  }

  return "";
}

export function ProposalsTable({ elements }: ProposalsTableProps) {
  return (
    <Table>
      <TableHeader className="text-primary">
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Author</TableHead>
          <TableHead className="w-96">Title</TableHead>
          <TableHead>Voting Start</TableHead>
          <TableHead>Voting End</TableHead>
          <TableHead>Grace Epoch</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {elements.map((e: Proposal) => (
          <TableRow key={e.id}>
            <TableCell className="font-medium">
            <Link href={`/proposals/${e.id}`}>
              <Link1Icon className="inline-flex mr-1"></Link1Icon>{e.id}
            </Link>
            </TableCell>
            <TableCell>{e.type}</TableCell>
            <TableCell className="font-mono">{e.author}</TableCell>
            <TableCell className="max-w-96 truncate">
              {formatAbstract(e.content)}
            </TableCell>
            <TableCell className="text-right">{e.voting_start_epoch}</TableCell>
            <TableCell className="text-right">{e.voting_end_epoch}</TableCell>
            <TableCell className="text-right">{e.grace_epoch}</TableCell>
            <TableCell className="text-right">
              <Button variant="link" size="icon" asChild>
                
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
