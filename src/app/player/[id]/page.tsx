import ProfileCharts from "@components/Profile/ProfileCharts";
import ProfileLayout from "@components/Profile/ProfileLayout/";
import ProfileStats from "@components/Profile/ProfileStats";
import { ProfileHeader } from "@components/ui/Header/Profile";

const PlayerPage = async ({ params }: { params: { id: number } }) => {
  const id = Number(params.id);

  return (
    <ProfileLayout>
      <ProfileHeader playerId={id} />
      <ProfileStats playerId={id} />
      <ProfileCharts playerId={id} />
    </ProfileLayout>
  );
};

export default PlayerPage;

export const dynamic = "force-dynamic";
