export interface getJsonPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
