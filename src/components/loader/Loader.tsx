import { createPortal } from "react-dom";
import { LoaderBackground, LoaderCard, LoaderBubble } from "./Loader.styles";
import { Text } from "./../../components";

export const Loader = () => {
  const generateHSLArray = () => {
    const hslArray = [];
    const randomAmount = Math.round(5 + Math.random() * 10);

    for (let i = 0; i < randomAmount; i++) {
      const h = Math.round(Math.random() * 360);
      const s = Math.round(50 + Math.random() * 50);
      const l = Math.round(50 + Math.random() * (100 - 50));

      hslArray.push(`hsl(${h}, ${s}%, ${l}%)`);
    }

    return hslArray;
  };

  const Duration = Math.round(Math.random() * 30);

  return createPortal(
    <LoaderBackground>
      <LoaderCard>
        <LoaderBubble
          Angle={Math.round(Math.random() * 360)}
          Duration={Duration}
          HSLArray={generateHSLArray()}
        />
        <Text
          FontFamily="Catamaran"
          FontSize={32}
          FontWeight={800}
          Margin="30px 0px 0px 0px"
        >
          LOADING
        </Text>
      </LoaderCard>
    </LoaderBackground>,
    document.body
  );
};
