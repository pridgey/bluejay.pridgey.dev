import { Text } from "./../../components";
import { unescapeQuotes } from "./../../utilities";

type SessionResult = {
  Name: string;
  Score: number;
};

type SessionResultsProps = {
  Results: SessionResult[];
};

export const SessionResults = ({ Results }: SessionResultsProps) => {
  return (
    <ol>
      {Results.map((result, index) => (
        <li
          key={`result-key-${index}`}
          style={{ fontSize: "34px", fontFamily: "'Montserrat', sans-serif" }}
        >
          <Text FontFamily="Montserrat" FontSize={34}>
            {unescapeQuotes(result.Name)} ({result.Score} pt
            {result.Score === 1 ? "" : "s"})
          </Text>
        </li>
      ))}
    </ol>
  );
};
