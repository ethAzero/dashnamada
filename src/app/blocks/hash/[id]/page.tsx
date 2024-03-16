
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Link from "next/link";
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

  tx_hashes : [];
};


async function BlockByHash(id: string) {
  const res = await fetch(
    `${process.env.API}/block/hash/${id}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) {
    throw Error("failed to fetch Block Height");
  }

  let data = await res.json();
  return data;
}

export default async function Blocks({
  params,
}: {
  params: { id: string };
}) {
  const dataBlockByHash = await BlockByHash(params.id);
  
  if(!dataBlockByHash){
        return notFound()
  }
  
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
                  <TableCell className=" w-[83%] text-left text-wrap">{dataBlockByHash.header.chain_id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Height</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">
                  <Link
                      className="justify-between hover:text-primary dark:hover:text-darkmode-primary"
                      href={`/blocks/height/${dataBlockByHash.header.height}`}
                    >
                      <Link2Icon className="inline-flex mr-1"></Link2Icon>{dataBlockByHash.header.height}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Block Time</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">{dataBlockByHash.header.time}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Block Hash</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">
                  <Link
                      className="justify-between hover:text-primary dark:hover:text-darkmode-primary"
                      href={`/blocks/hash/${dataBlockByHash.block_id}`}
                    >
                      <Link2Icon className="inline-flex mr-1"></Link2Icon>{dataBlockByHash.block_id}
                    </Link>  
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Proposer</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell className="break-words">{dataBlockByHash.header.proposer_address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="align-top">Transaction</TableCell>
                  <TableCell className="align-top">:</TableCell>
                  <TableCell className="break-words">
                    Tx Count : {dataBlockByHash.tx_hashes.length} 
                    <div className="grid xl:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
                      <div>
                        {
                          dataBlockByHash.tx_hashes.map(data  => {
                            return (
                              <div className="gap-4 border ml-0 m-2 p-2  ">
                              {data.tx_type}
                              <Link
                                className="flex hover:text-primary dark:hover:text-darkmode-primary"
                                href={`/transactions/${data.hash_id}`}
                                key={data.hash_id}
                                ><Link2Icon className="inline-flex mr-1"></Link2Icon>{data.hash_id}
                              </Link>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
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