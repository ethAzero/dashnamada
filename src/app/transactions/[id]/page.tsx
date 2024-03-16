
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Link from "next/link";
import Transaksi from "@/app/components/transaksi-list";
import { InputSearch } from "@/app/components/InputSearch";
import { Link2Icon } from "@radix-ui/react-icons";


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

async function getResultTx(id: string): Promise<ResultResponse> {
  const res = await fetch(
    `${process.env.API}/tx/${id}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) {
    throw Error("failed to fetch proposal");
  }

  let data = await res.json();
  return data;
}
async function getResultBlock(id: string): Promise<ResultResponse> {
  const res = await fetch(
    `${process.env.API}/block/hash/${id}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) {
    throw Error("failed to fetch proposal");
  }

  let data = await res.json();
  return data;
}

export default async function SearchResult({
  params,
}: {
  params: { id: string };
}) {
  const dataTx = await getResultTx(params.id);
  
  if (!dataTx) {
    return notFound();
  }
  
  const blockId = dataTx.block_id
  const dataBlockByTxId = await getResultBlock(blockId);
  return (
    <>
    <InputSearch />
    <div className="container relative mt-5 mb-5">
      <div className="grid gap-2 ">
        <Card className="rounded pt-7">
          <CardContent>
            <Table className="border table-fixed">
              <TableBody>
                <TableRow>
                  <TableCell className=" w-[15%] text-left">Chain ID</TableCell>
                  <TableCell className=" w-[2%]">:</TableCell>
                  <TableCell className=" w-[83%] text-left text-wrap">{dataBlockByTxId.header.chain_id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tx Hash</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">
                  <Link
                      className="justify-between hover:text-primary dark:hover:text-darkmode-primary"
                      href={`/transactions/${dataTx.hash}`}
                    >
                      <Link2Icon className="inline-flex mr-1"></Link2Icon>{dataTx.hash}
                    </Link>
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Block Hash</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">
                  <Link
                      className="justify-between hover:text-primary dark:hover:text-darkmode-primary"
                      href={`/blocks/hash/${dataBlockByTxId.block_id}`}
                    >
                      <Link2Icon className="inline-flex mr-1"></Link2Icon>{dataBlockByTxId.block_id}
                    </Link>   
                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Height</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">
                  <Link
                      className="justify-between hover:text-primary dark:hover:text-darkmode-primary"
                      href={`/blocks/height/${dataBlockByTxId.header.height}`}
                    >
                      <Link2Icon className="inline-flex mr-1"></Link2Icon>{dataBlockByTxId.header.height}
                    </Link>
                    
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tx Type</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">{dataTx.tx_type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Wraper ID</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">{dataTx.wrapper_id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fee Amount / Gas Unit</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">{dataTx.fee_amount_per_gas_unit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fee Token</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">{dataTx.fee_token}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gas Limit Multiplier</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">{dataTx.gas_limit_multiplier}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tx Code</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">{dataTx.code}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">{dataTx.data}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transaction</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">
                    <Transaksi datatransaksi={dataTx.tx}/>
                    </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>  
    </div>
    </>
  );
}