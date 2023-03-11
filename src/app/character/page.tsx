import { CharacterScreen } from "@/screens/CharacterScreen";
import { WithAuthOnly } from "@/service/context/AuthContext";

export default function Character() {
  return (
    <WithAuthOnly>
      <CharacterScreen />
    </WithAuthOnly>
  );
}
