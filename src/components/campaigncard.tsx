import Link from 'next/link';
import Image from 'next/image';

export default function CampaignCard() {

  return (
    <Link href="/campaigns">
    <div className="relative bg-card border border-card-line shadow-2xs rounded-xl">
        <Image className="w-full h-auto rounded-xl" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Card Image" width={560} height={560} />
      <div className="absolute top-0 inset-s-0 inset-e-0">
        <div className="p-4">
          <h3 className="font-semibold text-foreground">
            THE CAMPAIGN
          </h3>
          <p className="mt-1 text-muted-foreground-1">
            Last time — A new bard named Clover joined the party, played a chord that made everyone glow, and the night ended in an ambush on the way home.
          </p>
          <p className="mt-5 text-xs text-muted-foreground-1">
            Last Played
            25 Jul 2026
          </p>
        </div>
          </div>
      </div>
    </Link>
  )
}
