import { EditFaqScreen } from "@/screens/faq/EditFaqScreen";
import { WithAuthOnly } from "@/service/context/AuthContext";

export default function FAQ({ params }: { params: { id: string } }) {
  return (
    <WithAuthOnly>
      <EditFaqScreen id={params.id} />
    </WithAuthOnly>
  );
}
