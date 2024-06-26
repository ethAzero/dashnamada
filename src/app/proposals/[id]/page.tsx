// import ProposalTally from "../../components/proposal-tally";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "../../components/ui/skeleton";

export type ProposalContent = {
  abstract: string;
  authors: string;
  created: string;
  details: string;
  discussionTo: string;
  license: string;
  motivation: string;
  requires: string;
  title: string;
};

export type ProposalResponse = {
  id: string;
  content: ProposalContent;
  type: string;
  author: string;
  voting_start_epoch: number;
  voting_end_epoch: number;
  grace_epoch: number;
  votes: Array<string>;
};

// Fetch proposal info
async function getProposal(id: number): Promise<ProposalResponse> {
  const res = await fetch(
    `${process.env.API1}/proposal/${id}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) {
    throw Error("failed to fetch proposal");
  }

  let data = await res.json();
  return data;
}

export default async function Proposals({
  params,
}: {
  params: { id: string };
}) {
  const prop = await getProposal(parseInt(params.id));

  if (!prop) {
    return notFound();
  }

  return (
    <div className="container relative">
      <div className="pt-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary max-w-3xl break-words">
          {params.id}. {prop.content.title}
        </h1>
        <p className="w-full break-words pt-2 font-mono"></p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prop.type}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Epoch Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prop.voting_start_epoch}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Epoch End</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prop.voting_end_epoch}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Voting Period</div>
          </CardContent>
        </Card>
      </div>
      <div className="pt-8 grid gap-4 md:grid-cols-2 ">
        <Card>
          <CardHeader>Proposal Details</CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold tracking-tight">Abstract</h3>
            <p className="">{prop.content.abstract}</p>

            <h3 className="text-xl font-bold tracking-tight mt-5">Details</h3>
            <p className="">{prop.content.details}</p>

            <h3 className="text-xl font-bold tracking-tight mt-5">Authors</h3>
            <p className="">{prop.content.authors}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Voting Status</CardHeader>
          <CardContent>
            <Suspense fallback={<SkeletonCard />}>
              {/* <ProposalTally id={parseInt(params.id)} /> */}
            </Suspense>
          </CardContent>
        </Card>
      </div>
      <div className="pt-8">
        <p className="text-muted-foreground text-center">
          Transactions are present in this list only if a valid pubkey is
          provided in the memo
        </p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
