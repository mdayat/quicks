import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getInboxDetail } from "../utils/inbox";

export function InboxDetail(): JSX.Element {
  const [inboxDetail, setInboxDetail] = useState<object | undefined>();
  console.log(inboxDetail, setInboxDetail);
  const { inboxID } = useParams();

  useEffect(() => {
    getInboxDetail(inboxID as string).then(() => {});
  }, [inboxID]);

  return <></>;
}
