export interface ITodoDto {
  id: number;
  description: string;
  done: boolean;
}

export interface ITodoCreateDto {
  description?: string;
  done?: boolean;
}
