import { BackButton } from "@components/Player/BackButton";
import { PlayerForm } from "@components/Player/PlayerForm";
import { PlayerLayoutInner } from "@components/Player/PlayerLayout/Inner";

const NewPlayerPage = async () => {
  return (
    <PlayerLayoutInner>
      <BackButton route={"/player"} />
      <PlayerForm />
    </PlayerLayoutInner>
  );
};

export default NewPlayerPage;

export const dynamic = "force-dynamic";
