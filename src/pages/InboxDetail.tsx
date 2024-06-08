import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function InboxDetail(): JSX.Element {
  const [inboxDetail, setInboxDetail] = useState<object | undefined>();
  console.log(inboxDetail, setInboxDetail);
  const { inboxID } = useParams();

  useEffect(() => {}, [inboxID]);

  return <></>;
}
