import { lazy } from "react";
import { parse } from "query-string";
import { getUserToken } from "./utilities";

export const App = () => {
  const params = parse(window.location.search);
  const userToken = getUserToken();

  const HomeDirectory = lazy(() => import("./views/homeDirectory"));
  const VoteSession = lazy(() => import("./views/voteSession"));
  const EditSession = lazy(() => import("./views/editSession"));
  const NewSession = lazy(() => import("./views/newSession"));

  if (!!params.e) {
    return <EditSession />;
  } else if (!!params.s) {
    if (params.s === "-1") {
      return <NewSession UserID={userToken} />;
    } else {
      return <VoteSession SessionID={params.s.toString()} />;
    }
  } else {
    return <HomeDirectory UserID={userToken} />;
  }
};
