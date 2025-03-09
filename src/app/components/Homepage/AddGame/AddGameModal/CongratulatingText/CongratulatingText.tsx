// import { ModalBlur } from "@ui/ModalBlur";
// import { CloseButton } from "@components/Homepage/AddGame/AddGameModal/CloseButton";
// import { CongratulatingTextContent } from ".";
// type PlayerProps = {
//   onClose: () => void;
//   textContent: string;
// };
// export const CongratulatingTextModal = ({ onClose }: PlayerProps) => {
//   return (
//     <ModalBlur>
//       <div className="relative h-4/5 min-h-0 w-4/5 rounded-2xl bg-neutral-800">
//         <CloseButton onClose={onClose} />
//         {/* lisää tähän ehtoja:
//         - eka peli
//         - 100 peliä
//         - 500 peliä
//         - 10 voiton streak
//         - päivässä 10 peliä
//         - 10 päivää putkeen pelejä
//         - 50 päivää putkeen pelejä
//         - voittoprosentti > 50% (10+ peliä)
//         - voittoprosentti > 75% (10+ peliä)
//         - custom badget bilisvoittajiille, bilisvastaava
//         -
//         */}
//         <CongratulatingTextContent textContent={} onClose={onClose} />
//       </div>
//     </ModalBlur>
//   );
// };
import { ModalBlur } from "@ui/ModalBlur";

import { CloseButton } from "@components/Homepage/AddGame/AddGameModal/CloseButton";

import { CongratulatingTextContent } from ".";

type PlayerProps = {
  onClose: () => void;
  achievements: {
    firstGame?: boolean;
    hundredGames?: boolean;
    fiveHundredGames?: boolean;
    winStreak10?: boolean;
    tenGamesInADay?: boolean;
    tenDaysInARow?: boolean;
    fiftyDaysInARow?: boolean;
    winRateAbove50?: boolean;
    winRateAbove75?: boolean;
    // customBadge?: string;
  };
};

export const CongratulatingTextModal = ({
  onClose,
  achievements,
}: PlayerProps) => {
  // Function to determine the correct congratulatory message
  const getCongratulationMessage = () => {
    switch (true) {
      case achievements.firstGame:
        return "Onneksi olkoon ensimmäisestä pelistäsi! 🎉";
      case achievements.hundredGames:
        return "Mahtavaa! Olet pelannut jo 100 peliä! 💯";
      case achievements.fiveHundredGames:
        return "Upeaa! 500 peliä takana – todellinen konkari! 🏆";
      case achievements.winStreak10:
        return "Kympin voittoputki kasassa – huikeaa! 🔥";
      case achievements.tenGamesInADay:
        return "Kymmenen peliä päivässä – wau mikä tahti! 🚀";
      case achievements.tenDaysInARow:
        return "10 päivää putkeen – omistautuminen huipussaan! 📅";
      case achievements.fiftyDaysInARow:
        return "50 päivää putkeen – legendaarista sitkeyttä! 🌟";
      case achievements.winRateAbove50:
        return "Voittoprosenttisi on yli 50 % – taitava peluri! 🎯";
      case achievements.winRateAbove75:
        return "Voittoprosenttisi on yli 75 % – mikä mestari! 🥇";
      // case achievements.customBadge:
      //   return `Erityismaininta: ${achievements.customBadge} 🏅`;
      // default:
      //   return "Jatka samaan malliin – olet matkalla mestariksi! 🚀";
    }
  };

  return (
    <ModalBlur>
      <div className="relative h-4/5 min-h-0 w-4/5 rounded-2xl bg-neutral-800">
        <CloseButton onClose={onClose} />
        <CongratulatingTextContent
          onClose={onClose}
          textContent={getCongratulationMessage()}
        />
      </div>
    </ModalBlur>
  );
};
