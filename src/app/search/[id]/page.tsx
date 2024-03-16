

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { notFound, redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Transaksi from "@/app/components/transaksi-list";


export type headerInfo ={
  chain_id : string;
  height : number;
}


export type ResultResponse = {
  block_id : string;
  header : headerInfo[]
  tx_type : string;
  wrapper_id: string;
  fee_amount_per_gas_unit: number;
  fee_token: string;
  gas_limit_multiplier: number;
  code: string;
  data: string;
  hash : string;
  tx : any;
};

async function getResultTx(id: string){
  const res = await fetch(
    `${process.env.API}/tx/${id}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) {
    // throw Error("failed to fetch proposal");
    let data = null;
  }else{
    let data = await res.json();
    return data;
  }

}
async function getResultBlock(id: string) {
  const res = await fetch(
    `${process.env.API}/block/height/${id}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) {
    let data = null;
  }else{
    let data = await res.json();
    return data;
  }

}
async function getResultBlockHash(id: string) {
  const res = await fetch(
    `${process.env.API}/block/hash/${id}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) {
    let data = null;
  }else{
    let data = await res.json();
    return data;
  }

}

export default async function SearchResult({
  params,
}: {
  params: { id: string };
}) {
  const dataTx = await getResultTx(params.id);
  const dataBlockByHeight = await getResultBlock(params.id);
  const dataBlockByHash = await getResultBlockHash(params.id);
  
  if(!dataTx){
    if(!dataBlockByHeight){
      if(!dataBlockByHash){
        return notFound()
      }
    }
  }
  
  if(dataTx){
    return (
      redirect(`/transactions/${params.id}`)
      )
    }else if (dataBlockByHash){
      return (
        redirect(`/blocks/hash/${params.id}`)
        )
      }else if (dataBlockByHeight){
        return (
      redirect(`/blocks/height/${params.id}`)
    )
  }
}