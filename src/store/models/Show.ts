import Status from "store/models/ShowStatus";

export interface Show {
  id: string;
  title: string;
  status: Status;
  season: number;
  episode: number;
  note: string;
  tags: string[];
}