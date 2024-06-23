"use client";

import EmojiPicker from "emoji-picker-react";
import { useRouter } from "next/navigation";
import { type MouseEvent, useState } from "react";
import { HiUserAdd } from "react-icons/hi";

import { TextButton } from "@ui/Buttons/TextButton";

import {
  type NewPlayer,
  type Player,
  player as playerParser,
} from "@common/types";
import { Field } from "@components/Player/PlayerForm/Field";

type Props = {
  player?: Player;
};

export const PlayerForm = ({ player }: Props) => {
  const isUpdate = player !== undefined;

  const [playerData, setPlayerData] = useState<NewPlayer>({
    firstName: player ? player.firstName : "",
    lastName: player ? player.lastName : "",
    nickname: player ? player.nickname : "",
    motto: player ? player.motto : "",
    emoji: player ? player.emoji : "",
  });
  const [emojiSelectorOpen, setEmojiSelectorOpen] = useState<boolean>(false);

  const router = useRouter();

  const setPlayerKey = (key: keyof NewPlayer) => (val: unknown) => {
    setPlayerData((p) => ({ ...p, [key]: val }));
  };

  const updatePlayer = (id: number) => async (oldPlayer: NewPlayer) => {
    const res = await fetch(`/api/player/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(oldPlayer),
    });
    const data = await res.json();
    const updatedPlayer = playerParser.parse(data);
    router.push(`/player/${updatedPlayer.id}`);
  };

  const submitNewPlayer = async (newPlayer: NewPlayer) => {
    const res = await fetch("/api/player/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });
    const data = await res.json();
    const parsedPlayer = playerParser.parse(data);
    router.push(`/player/${parsedPlayer.id}`);
  };

  const submit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const updateFunc = isUpdate ? updatePlayer(player.id) : submitNewPlayer;
    updateFunc(playerData);
  };

  const allFieldsValid = Object.values(playerData).every((v) => v !== "");
  const isValid = allFieldsValid && emojiSelectorOpen === false;

  return (
    <div className="flex w-[80%] flex-col gap-8 px-8">
      <h1 className="text-5xl font-bold">
        {isUpdate ? "Update Profile" : "New Profile"}
      </h1>
      <form className="flex flex-col items-start gap-8">
        <div className="flex w-full items-center gap-8">
          <div className="flex grow flex-col gap-4">
            <Field
              placeholder="Teemu"
              value={playerData.firstName}
              setValue={setPlayerKey("firstName")}
              label="First Name"
            />
            <Field
              placeholder="Teekkari"
              value={playerData.lastName}
              setValue={setPlayerKey("lastName")}
              label="Last Name"
            />
            <Field
              placeholder="Teksa"
              value={playerData.nickname}
              setValue={setPlayerKey("nickname")}
              label="Nickname"
            />
            <Field
              placeholder="Ei tänään, eikä huomenna."
              value={playerData.motto}
              setValue={setPlayerKey("motto")}
              label="Motto"
            />
          </div>
          {emojiSelectorOpen ? (
            <EmojiPicker
              onEmojiClick={(e) => {
                setPlayerKey("emoji")(e.emoji);
                setEmojiSelectorOpen(false);
              }}
              height={280}
              width={280}
              previewConfig={{ showPreview: false }}
            />
          ) : (
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => setEmojiSelectorOpen(true)}
              onClick={() => setEmojiSelectorOpen(true)}
              className="flex h-64 w-64 cursor-pointer items-center justify-center rounded-[50%] bg-white text-7xl text-neutral-600 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:ease-out"
            >
              {playerData.emoji === "" ? "?" : playerData.emoji}
            </div>
          )}
        </div>
        <TextButton
          buttonType="button"
          disabled={!isValid}
          onClick={submit}
          RightIcon={HiUserAdd}
          text={isUpdate ? "Save changes" : "Create player"}
          intent="primary"
        />
      </form>
    </div>
  );
};
