import { getSeasons } from "@server/db/seasons";

import { CreateSeasonForm } from "./CreateSeasonForm";
import EditSeason from "./EditSeason";

const SeasonsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (searchParams?.password !== process.env.ADMIN_PASSWORD) return null;
  const seasons = await getSeasons();

  return (
    <div className="flex h-full w-full flex-col gap-8 p-16">
      <h1 className="text-5xl font-semibold text-neutral-100">Seasons List</h1>
      <ul className="flex h-full list-none flex-col gap-4 overflow-y-scroll">
        {seasons.map((season) => (
          <li
            key={season.id}
            className="flex items-center gap-3 text-3xl font-medium text-neutral-200"
          >
            {season.name ? `${season.name}: ` : ""}
            {season.start.toLocaleDateString("fi-FI")}
            {" - "}
            {season.end.toLocaleDateString("fi-FI")}
            <EditSeason id={season.id} />
          </li>
        ))}
      </ul>
      <CreateSeasonForm />
    </div>
  );
};

export default SeasonsPage;

export const dynamic = "force-dynamic";
