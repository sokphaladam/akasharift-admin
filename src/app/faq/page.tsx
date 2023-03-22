import { FaqScreen } from "@/screens/FaqScreen";
import { WithAuthOnly } from "@/service/context/AuthContext";

export default function FAQ() {
  return (
    <WithAuthOnly>
      <FaqScreen />
    </WithAuthOnly>
  );
}
