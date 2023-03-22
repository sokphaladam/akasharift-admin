import { CreateNewScreen } from "@/screens/faq/CreateNewScreen";
import { WithAuthOnly } from "@/service/context/AuthContext";

export default function FAQ() {
  return (
    <WithAuthOnly>
      <CreateNewScreen />
    </WithAuthOnly>
  );
}
