import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { WithAuthOnly } from "@/service/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <WithAuthOnly>
      <main>
        <div></div>
      </main>
    </WithAuthOnly>
  );
}
