export interface Data {
  key: string;
  value: string;
  date_created?: Date;
  date_modified?: Date;
}

export interface DataResponse{
  rows:Data[],
  count:number
}
