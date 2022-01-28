export type { controllerType };

type controllerType<paramT> = (
  params: paramT
) => Promise<
  | { kind: "success"; response?: any; statusCode?: number }
  | { kind: "error"; message: string; statusCode: number }
>;
