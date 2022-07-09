import Status from "store/models/ShowStatus";
import { Tag } from "./Tag";

export interface Show {
  id: string;
  title: string;
  status: Status;
  season: number;
  episode: number;
  note: string;
  tags: string[];
}