export type StepTodo = {
  title: string;
  description: string;
  id: string | null | undefined;
};


export interface TodoForDb {
  title: string;
  body: string;
  cmsId: string;

  owner: string;
  completed: boolean;
}