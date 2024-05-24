import { lazy } from "react";
import { getUserToken } from "./utilities";

export const App = () => {
  const params = new URLSearchParams(window.location.search);
  const editMode = params.has("e");
  const SessionID = params.get("s");

  const userToken = getUserToken();

  const HomeDirectory = lazy(() => import("./views/homeDirectory"));
  const VoteSession = lazy(() => import("./views/voteSession"));
  const EditSession = lazy(() => import("./views/editSession"));
  const NewSession = lazy(() => import("./views/newSession"));

  if (editMode) {
    return <EditSession />;
  } else if (!!SessionID) {
    if (SessionID === "-1") {
      return <NewSession UserID={userToken} />;
    } else {
      return <VoteSession SessionID={SessionID.toString()} />;
    }
  } else {
    return <HomeDirectory UserID={userToken} />;
  }
};
