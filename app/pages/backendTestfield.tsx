import { now } from "lodash";
import type { NextPage } from "next";
import { ChangeEventHandler, useEffect, useState } from "react";
import { PlayerMeta } from "../common/types";

type ApiState = { loading: boolean; ts: number; data: PlayerMeta[] };

const Testfield: NextPage = () => {
  const [value, setValue] = useState("");
  const [apiState, setApiState] = useState<ApiState>({
    loading: false,
    ts: Date.now(),
    data: [],
  });

  const checkApiState = (newApiState: ApiState) => {
    console.log(newApiState, apiState);
    if (newApiState.ts >= apiState.ts) setApiState(newApiState);
  };

  const fetchPlayerMetas = async (keywords: string): Promise<ApiState> => {
    const ts = Date.now();
    setApiState({ loading: true, ts, data: [] });
    return {
      loading: false,
      ts,
      data: await fetch(
        "/api/players/search?" + new URLSearchParams({ keywords }),
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res, keywords);
          return res;
        }),
    };
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const newVal = e.target.value;
    setValue(newVal);
    if (newVal.length > 0) {
      await fetchPlayerMetas(newVal).then(checkApiState);
    } else {
      setApiState({ loading: false, ts: Date.now(), data: [] });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Tailwind pelittää!</h1>
      <input
        className="border-4 m-8"
        type="text"
        value={value}
        onChange={onChange}
      />
      {value.length === 0 ? (
        <p>Type to get suggestions</p>
      ) : apiState.loading ? (
        <p>Loading...</p>
      ) : apiState.data.length ? (
        apiState.data.map((d) => (
          <p key={d.id}>{`${d.firstName} ${d.lastName} (${d.id})`}</p>
        ))
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default Testfield;
