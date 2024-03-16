"use client";


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export type TX = {
  datatransaksi : any
  tx : any
};



export function renderInternalTx(tx: TX) {
  let tx_details = null;
  console.log(tx.datatransaksi)
  // todo better types
  if (tx !== null) {
    switch (tx.datatransaksi) {
      case "Transfer":
        tx_details = (
          <p className="mt-3">
            <b>From:</b> {tx.datatransaksi.Transfer.source} <br />
            <b>To:</b> {tx.datatransaksi.Transfer.target} <br />
            <b>Token:</b> {tx.datatransaksi.Transfer.token} <br />
            <b>Amount:</b> {tx.datatransaksi.Transfer.amount.toLocaleString()} <br />
          </p>
        );
        break;
      case "tx_unbond":
        tx_details = (
          <p className="mt-3">
            <b>Validator:</b> {tx.datatransaksi.Unbond.validator} <br />
            <b>Amount:</b> {tx.datatransaksi.Unbond.amount.toLocaleString()} <br />
          </p>
        );
        break;
      case "tx_reveal_pk":
        tx_details = (
          <p className="mt-3">
            <b>PKey:</b> {tx.datatransaksi.RevealPK} <br />
          </p>
        );
        break;
      case "tx_bond":
        tx_details = (
          <p className="mt-3">
            <b>Validator:</b> {tx.datatransaksi.Bond.validator} <br />
            <b>Amount:</b> {tx.datatransaksi.Bond.amount.toLocaleString()} <br />
            <b>Source:</b> {tx.datatransaksi.Bond.source} <br />
          </p>
        );
        break;
      case "tx_ibc":
        tx_details = (
          <p className="mt-3">
            <b>Message:</b> {Object.keys(tx.datatransaksi.Ibc)[0]} <br />
          </p>
        );
        break;
      case "VoteProposal":
        tx_details = (
          <p className="mt-3">
            <b>ID:</b> {tx.datatransaksi.VoteProposal.id} <br />
            <b>Option:</b> {tx.datatransaksi.VoteProposal.vote} <br />
            <b>Voter:</b> {tx.datatransaksi.VoteProposal.voter} <br />
          </p>
        );
        break;
      default:
        tx_details = (
          <p className="mt-3 font-mono w-full">{JSON.stringify(tx.datatransaksi)}</p>
        );
    }
  }

  if (tx.datatransaksi === null) {
    tx_details = (
      <p className="mt-3 font-mono w-full">Failed to read tx details</p>
    );
  }

  return (
    <>  
      {tx_details}
    </>
  );
}

export function isShielded(tx: TX): boolean {
  if (tx.tx !== null) {
    if (
      JSON.stringify(tx.datatransaksi).includes(
        "tnam1pcqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzmefah"
      )
    ) {
      return true;
    }
  } else {
    if (tx.datatransaksi === "tx_ibc") {
      return true;
    }
  }
  return false;
}

export function formatTxHash(hash: string): string {
  if (hash === undefined) {
    return "";
  }
  return hash.toUpperCase();
}

export function formatReturnCode(return_code: number) {
  return <p>{return_code == 0 ? "✅" : "❌"}</p>;
}

export function formatTxType(tx_type: string) {
  return tx_type
    .replace("tx_", "")
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
}

export default function Transaksi(datatransaksi:any) {
  return (
    <>
      {renderInternalTx(datatransaksi)}
      {console.log(datatransaksi)}
    </>
  );
}
