import IEvent from "../models/IEvent";

export const sortEvents = (events: IEvent[], sortType: string): IEvent[] => {
  return [...events].sort((a, b) => {
    switch (sortType) {
      case "title":
        return a.title.localeCompare(b.title);
      case "date":
        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      case "organizer":
        return a.organizer.localeCompare(b.organizer);
      default:
        return 0;
    }
  });

};
