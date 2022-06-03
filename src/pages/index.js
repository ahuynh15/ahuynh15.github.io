import { Sidebar } from "@/Common";
import Head from "next/head";
import { HomePageWrapper } from "@/components/HomePageWrapper";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Alvin Huynh</title>
        <meta name="description" content="Alvin Huynh's Personal Site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-between h-full">
        {/* Content */}
        <div className="ml-16">
          <HomePageWrapper />
        </div>

        {/* Fixed Sidebar */}
        <Sidebar
          anchors={[
            { name: "About", target: "about" },
            { name: "Skills", target: "skills" },
            { name: "Experience", target: "experience" },
            { name: "Education", target: "education" },
            { name: "Contact", target: "contact" },
          ]}
        />
      </main>
    </div>
  );
}
