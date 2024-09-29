import { FC } from "react";
import Events from "../components/Events";
import Registration from "../components/Registration";
import EventInfo from "../components/EventInfo";


interface Route {
  path: string;
  component: FC;
}

export const publicRoutes: Route[] = [
  { path: "/events", component: Events },
  { path: "/events/:id", component: EventInfo },
  { path: "/events/:id/registration", component: Registration },
]
